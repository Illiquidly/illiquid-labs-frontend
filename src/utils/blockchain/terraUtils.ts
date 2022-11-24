import {
	LCDClient,
	MsgExecuteContract,
	Coins,
	Coin,
	Msg,
	TxInfo,
	ExtensionOptions,
} from '@terra-money/terra.js'
import { Wallet } from '@terra-money/wallet-provider'
import axios from 'axios'
import { contractAddresses } from 'constants/addresses'
import { CHAIN_DENOMS, FCD_URLS, LCD_URLS } from 'constants/core'
import { txExplorerFactory } from 'constants/transactions'
import { pick } from 'lodash'

import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { ContractName, NetworkId } from 'types'
import { asyncAction } from 'utils/js/asyncAction'

export const UST_DECIMALS = 6
export const LP_DECIMALS = 6
export const LUNA_DECIMALS = 6

interface CoinsDetails {
	ust?: string
	luna?: string
}

interface TransactionDetails {
	contractAddress: string
	message: object
	coins?: CoinsDetails
}

function createAmountConverter(decimals: number) {
	return {
		userFacingToBlockchainValue: (amount?: number | string) =>
			String(Math.floor(Number(amount ?? 0) * 10 ** decimals)),
		blockchainValueToUserFacing: (amount: any) => Number(amount) / 10 ** decimals,
	}
}

export const amountConverter = {
	ust: createAmountConverter(UST_DECIMALS),
	lp: createAmountConverter(LP_DECIMALS),
	luna: createAmountConverter(LUNA_DECIMALS),
}

let wallet: Wallet

function setWallet(newWallet: Wallet) {
	// console.log(`Setting a new wallet in blockchain.ts module`, { newWallet });
	wallet = newWallet
}

export function getNetworkId(): NetworkId {
	if (wallet) {
		return wallet?.network?.chainID as NetworkId
	}

	return 'pisco-1' // phoenix-1
}

export function getDefaultChainDenom(): string {
	const networkId = getNetworkId()
	return CHAIN_DENOMS[networkId]
}

function getContractAddress(contractName: ContractName): string {
	const networkId = getNetworkId()
	return contractAddresses[networkId][contractName]
}

async function getLcdURL(): Promise<string> {
	const networkId = getNetworkId()
	return LCD_URLS[networkId]
}

function isClassic(): boolean {
	const networkId = getNetworkId()
	return networkId === 'columbus-5'
}

export async function getLCDClient(gasPrices?: any) {
	const url = await getLcdURL()
	const networkId = getNetworkId()

	return new LCDClient({
		URL: url,
		chainID: networkId,
		gasPrices,
		isClassic: isClassic(),
	})
}

async function fetchGasPrices() {
	const networkId = getNetworkId()

	const response = await axios.get(`${FCD_URLS[networkId]}/v1/txs/gas_prices`)

	return pick(response.data, [getDefaultChainDenom()])
}

const DEFAULT_DELAY = 1000

// Async version of sleep
export async function sleep(ms: number = DEFAULT_DELAY): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function getWalletAddress(
	maxTries = 3,
	retryIntervalMilliseconds = 1000,
	throwErrorIfNoWallet = true
): Promise<string> {
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < maxTries; i++) {
		const address = wallet?.wallets[0]?.terraAddress
		if (address) {
			return address
		}
		console.log(
			`Haven't got wallet address. Retrying in ${retryIntervalMilliseconds} ms`
		)
		// eslint-disable-next-line no-await-in-loop
		await sleep(retryIntervalMilliseconds)
	}

	if (throwErrorIfNoWallet) {
		throw new Error('Unable to get wallet address')
	} else {
		return ''
	}
}

async function sendQuery(contractAddress: string, query: object): Promise<any> {
	const lcdClient = await getLCDClient()
	return lcdClient.wasm.contractQuery(contractAddress, query)
}

async function sendIndependentQuery(
	networkId: NetworkId,
	contractAddress: string,
	query: object
): Promise<any> {
	const url = LCD_URLS[networkId]

	const lcdClient = new LCDClient({
		URL: url,
		chainID: networkId,
		isClassic: networkId === 'columbus-5',
	})

	return lcdClient.wasm.contractQuery(contractAddress, query)
}

async function estimateTxFee(messages: Msg[]) {
	const address = await getWalletAddress()

	const gasPrices = await fetchGasPrices()

	const lcdClient = await getLCDClient(gasPrices)
	const memo = 'estimate fee'

	const accountInfo = await lcdClient.auth.accountInfo(address)

	const txOptions: ExtensionOptions = {
		msgs: messages,
		gasPrices,
		gasAdjustment: 1.4,
		feeDenoms: [getDefaultChainDenom()],
		memo,
		isClassic: isClassic(),
	}

	return lcdClient.tx.estimateFee(
		[
			{
				sequenceNumber: accountInfo.getSequenceNumber(),
				publicKey: accountInfo.getPublicKey(),
			},
		],
		txOptions
	)
}

async function getTxResult(txHash: string): Promise<TxInfo | undefined> {
	const client = await getLCDClient()

	const [, response] = await asyncAction(client.tx.txInfo(txHash))

	return response
}

function getCoinsConfig(coins?: CoinsDetails): Coins.Input | undefined {
	if (coins) {
		const coinObjects: Coin[] = []
		if (coins.luna) {
			const lunaCoin = Coin.fromData({ denom: 'uluna', amount: coins.luna })
			coinObjects.push(lunaCoin)
		}
		if (coins.ust) {
			const utsCoin = Coin.fromData({ denom: 'uusd', amount: coins.ust })
			coinObjects.push(utsCoin)
		}
		return new Coins(coinObjects)
	}
	return undefined
}

function checkWallet(parentFunctionName: string): void {
	if (!wallet) {
		throw new Error(`${parentFunctionName} function requires connected wallet`)
	}
}

export const getTransactionExplorer = (txId: string) =>
	txExplorerFactory[getNetworkId() ?? 'pisco-1'](txId)

async function postManyTransactions(
	txs: TransactionDetails[],
	memo?: string
): Promise<TxReceipt> {
	checkWallet('postManyTransactions')

	const address = await getWalletAddress()

	const msgs = txs.map(tx => {
		const coins = getCoinsConfig(tx.coins)
		return new MsgExecuteContract(address, tx.contractAddress, tx.message, coins)
	})

	const fee = await estimateTxFee(msgs)

	const tx = await wallet.post({
		fee,
		msgs,
		isClassic: isClassic(),
		memo,
	})
	const txId = tx.result.txhash

	const txTerraFinderUrl = getTransactionExplorer(txId)

	return {
		txId,
		txFee: `< 1 LUNA`,
		txTerraFinderUrl,
	}
}

async function postTransaction(
	tx: TransactionDetails,
	memo?: string
): Promise<TxReceipt> {
	return postManyTransactions([tx], memo)
}

export default {
	sendQuery,
	sendIndependentQuery,
	postTransaction,
	postManyTransactions,
	getNetworkId,
	getWalletAddress,
	setWallet,
	amountConverter,
	getTxResult,
	getTransactionExplorer,
	getContractAddress,
}

export type { TransactionDetails }
