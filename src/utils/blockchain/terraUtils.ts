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
import {
	CHAIN_CURRENCIES,
	CHAIN_DENOMS,
	FCD_URLS,
	LCD_URLS,
} from 'constants/core'
import { txExplorerFactory } from 'constants/transactions'
import { pick } from 'lodash'

import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { ContractName, NetworkId } from 'types'
import { asyncAction } from 'utils/js/asyncAction'

export const DEFAULT_DECIMALS = 6

interface CoinsDetails {
	luna?: string
}

export type NativeCurrency = typeof CHAIN_DENOMS[NetworkId]

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
	default: createAmountConverter(DEFAULT_DECIMALS),
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

	return 'pisco-1' // TODO: return whatever is default for new chain (IBC)
}

function getDefaultChainDenom(): string {
	const networkId = getNetworkId()
	return CHAIN_DENOMS[networkId]
}

function getContractAddress(contractName: ContractName): string {
	const networkId = getNetworkId()
	return contractAddresses[networkId][contractName]
}

export function getLCDClient(gasPrices?: any): LCDClient {
	const networkId = getNetworkId()

	const url = LCD_URLS[networkId]

	return new LCDClient({
		URL: url,
		chainID: networkId,
		gasPrices,
	})
}

// TODO: we can't use fcd for IBC. This is Terra thing.
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
	const lcdClient = getLCDClient()

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
	})

	return lcdClient.wasm.contractQuery(contractAddress, query)
}

async function estimateTxFee(messages: Msg[]) {
	const address = await getWalletAddress()

	const gasPrices = await fetchGasPrices()

	const lcdClient = getLCDClient(gasPrices)
	const memo = 'estimate fee'

	const accountInfo = await lcdClient.auth.accountInfo(address)

	const txOptions: ExtensionOptions = {
		msgs: messages,
		gasPrices,
		gasAdjustment: 1.4,
		feeDenoms: [getDefaultChainDenom()],
		memo,
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
	const client = getLCDClient()

	const [, response] = await asyncAction(client.tx.txInfo(txHash))

	return response
}

function getDenomForCurrency(currency: NativeCurrency) {
	if (!Object.values(CHAIN_CURRENCIES).includes(currency.toLowerCase())) {
		throw new Error(`Unsupported currency: ${currency.toUpperCase()}`)
	}

	return `u${currency.toLowerCase()}`
}

function getCurrencyForDenom(denom: string): NativeCurrency {
	if (!Object.values(CHAIN_DENOMS).includes(denom.toLowerCase())) {
		throw new Error(`Unsupported denom: ${denom.toUpperCase()}`)
	}

	return `${denom.substring(1).toUpperCase()}`
}

function getCoinsConfig(coins?: CoinsDetails): Coins.Input | undefined {
	if (coins) {
		const coinObjects: Coin[] = Object.entries(coins).map(([currency, amount]) =>
			Coin.fromData({ denom: getDenomForCurrency(currency), amount })
		)

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
		memo,
	})
	const txId = tx.result.txhash

	const txTerraFinderUrl = getTransactionExplorer(txId)

	return {
		txId,
		txFee: `< 0.2 ${getCurrencyForDenom(getDefaultChainDenom())}`,
		txTerraFinderUrl,
	}
}

async function postTransaction(
	tx: TransactionDetails,
	memo?: string
): Promise<TxReceipt> {
	return postManyTransactions([tx], memo)
}

async function getLatestBlockHeight() {
	const client = getLCDClient()
	const blockInfo = await client.tendermint.blockInfo()

	return blockInfo.block.header.height
}
export default {
	getLatestBlockHeight,
	sendQuery,
	sendIndependentQuery,
	postTransaction,
	postManyTransactions,
	getNetworkId,
	getWalletAddress,
	setWallet,
	getDefaultChainDenom,
	getCurrencyForDenom,
	getDenomForCurrency,
	amountConverter,
	getTxResult,
	getTransactionExplorer,
	getContractAddress,
}

export type { TransactionDetails }
