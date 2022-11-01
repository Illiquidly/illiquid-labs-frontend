/* eslint-disable */
import {
	LCDClient,
	MsgExecuteContract,
	Coins,
	Coin,
	Msg,
	CreateTxOptions,
	TxInfo,
	ExtensionOptions,
} from '@terra-money/terra.js'
import { Wallet } from '@terra-money/wallet-provider'
import axios from 'axios'
import { pick } from 'lodash'

import addresses from 'services/blockchain/addresses'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { asyncAction } from 'utils/js/asyncAction'

export const UST_DECIMALS = 6
export const LP_DECIMALS = 6
export const LUNA_DECIMALS = 6

type NetworkId = 'columbus-5' | 'phoenix-1' | 'pisco-1'

type NetworkName = 'mainnet' | 'classic' | 'testnet'

interface CoinsDetails {
	ust?: string
	luna?: string
}

interface TransactionDetails {
	contractAddress: string
	message: object
	coins?: CoinsDetails
}

const LCD_URLS = {
	'pisco-1': 'https://pisco-lcd.terra.dev',
	'columbus-5': 'https://columbus-lcd.terra.dev',
	'phoenix-1': 'https://phoenix-lcd.terra.dev',
}

const FCD_URLS = {
	'pisco-1': 'https://pisco-fcd.terra.dev',
	'columbus-5': 'https://columbus-fcd.terra.dev',
	'phoenix-1': 'https://phoenix-fcd.terra.dev',
}

function createAmountConverter(decimals: number) {
	return {
		userFacingToBlockchainValue: (amount: number) =>
			String(Math.floor(amount * 10 ** decimals)),
		blockchainValueToUserFacing: (amount: any) => Number(amount) / 10 ** decimals,
	}
}

export const amountConverter: any = {
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

export function chainIdToNetworkName(chainId: string): NetworkName {
	const networkIds: { [key: string]: NetworkName } = {
		'pisco-1': 'testnet',
		'columbus-5': 'classic',
		'phoenix-1': 'mainnet',
	}

	return networkIds[chainId]
}

export function getNetworkName(): NetworkName {
	return chainIdToNetworkName(getNetworkId() ?? 'pisco-1')
}

async function getLcdURL(): Promise<string> {
	const networkId = getNetworkId()
	return LCD_URLS[networkId]
}

function isTestnet(): boolean {
	const networkId = getNetworkId()
	return networkId === 'pisco-1'
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

	return pick(response.data, [isClassic() ? 'uusd' : 'uluna'])
}

const DEFAULT_DELAY = 1000

// Async version of sleep
export async function sleep(ms: number = DEFAULT_DELAY): Promise<void> {
	// eslint-disable-next-line no-promise-executor-return
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function getWalletAddress(
	maxTries: number = 3,
	retryIntervalMilliseconds: number = 1000,
	throwErrorIfNoWallet: boolean = true
): Promise<string> {
	for (let i = 0; i < maxTries; i++) {
		const address = wallet?.wallets[0]?.terraAddress
		if (address) {
			return address
		}
		console.log(
			`Haven't got wallet address. Retrying in ${retryIntervalMilliseconds} ms`
		)
		await sleep(retryIntervalMilliseconds)
	}

	if (throwErrorIfNoWallet) {
		throw new Error('Unable to get wallet address')
	} else {
		return ''
	}
}

// Returns UST balance on the user's wallet
export async function getBalanceUST(): Promise<number> {
	const address = await getWalletAddress()
	const lcdClient = await getLCDClient()

	const [coins] = await lcdClient.bank.balance(address)

	for (const coin of coins.toData()) {
		if (coin.denom === 'uusd') {
			return amountConverter.ust.blockchainValueToUserFacing(coin.amount)
		}
	}

	// If uusd not found in the coin list, return 0
	return 0
}

export async function getBalanceLUNA(): Promise<number> {
	const address = await getWalletAddress()

	const lcdClient = await getLCDClient()

	const [coins] = await lcdClient.bank.balance(address)

	for (const coin of coins.toData()) {
		if (coin.denom === 'uluna') {
			return amountConverter.luna.blockchainValueToUserFacing(coin.amount)
		}
	}

	return 0
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

	const gasPrices: any = await fetchGasPrices()

	const lcdClient = await getLCDClient(gasPrices)
	const memo = 'estimate fee'

	const accountInfo = await lcdClient.auth.accountInfo(address)

	const txOptions: ExtensionOptions = {
		msgs: messages,
		gasPrices,
		gasAdjustment: 1.4,
		feeDenoms: [isClassic() ? 'uusd' : 'uluna'],
		memo,
		isClassic: isClassic(),
	}

	const fee = await lcdClient.tx.estimateFee(
		[
			{
				sequenceNumber: accountInfo.getSequenceNumber(),
				publicKey: accountInfo.getPublicKey(),
			},
		],
		txOptions
	)

	return fee
}

async function getTxResult(txHash: string): Promise<TxInfo | undefined> {
	const client = await getLCDClient()

	const [_, response] = await asyncAction(client.tx.txInfo(txHash))

	return response
}

// Checking is terra gateway working properly
async function pingTerraGateway(): Promise<any> {
	const networkId = getNetworkId()
	const response = await axios.get(`${FCD_URLS[networkId]}/syncing`)
	return response
}

async function getTxs(offset: number, limit: number) {
	const networkId = getNetworkId()
	const account = addresses.getContractAddress('p2p-trade')

	const response = await axios.get(`${FCD_URLS[networkId]}/v1/txs`, {
		params: {
			account,
			offset,
			limit,
		},
	})

	return response.data
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

async function getTerraUrlForTxId(txId: string): Promise<string> {
	const networkId = getNetworkId()

	return `https://finder.terra.money/${networkId}/tx/${txId}`
}

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

	const txTerraFinderUrl = await getTerraUrlForTxId(txId)

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
	isTestnet,
	getWalletAddress,
	setWallet,
	getBalanceUST,
	getBalanceLUNA,
	amountConverter,
	getTxResult,
	pingTerraGateway,
	getTxs,
	getTerraUrlForTxId,
}

export type { TransactionDetails }
