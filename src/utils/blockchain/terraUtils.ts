import {
	MsgExecuteContract,
	Coins,
	Coin,
	TxInfo,
	LCDClient,
	ExtensionOptions,
	Msg,
} from '@terra-money/feather.js'
import { ConnectResponse, WalletResponse } from '@terra-money/wallet-kit'

import { contractAddresses } from 'constants/addresses'
import { CHAIN_CURRENCIES, CHAIN_DENOMS } from 'constants/core'
import { txExplorerFactory } from 'constants/transactions'

import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { ContractName, ChainId, NetworkName } from 'types'
import { asyncAction } from 'utils/js/asyncAction'

export const DEFAULT_DECIMALS = 6

interface CoinsDetails {
	luna?: string
}

export type NativeCurrency = typeof CHAIN_DENOMS[ChainId]

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

let wallet: WalletResponse | undefined
let connectedWallet: ConnectResponse | undefined
let client: LCDClient

function setWallet(newWallet: WalletResponse) {
	// console.log(`Setting a new wallet in blockchain.ts module`, { newWallet });
	wallet = newWallet
}

function setConnectedWallet(newWallet?: ConnectResponse) {
	connectedWallet = newWallet
}

function setLcdClient(lcdClient: LCDClient) {
	client = lcdClient
}

export function getNetworkName(): NetworkName {
	const chainIds = Object.keys(connectedWallet?.addresses ?? {})

	if (chainIds.includes('phoenix-1')) {
		return 'mainnet'
	}

	if (chainIds.includes('pisco-1')) {
		return 'testnet'
	}

	return 'mainnet'
}

export function getChainId(): ChainId {
	if (getNetworkName() === 'testnet') {
		return 'pisco-1'
	}

	if (getNetworkName() === 'mainnet') {
		return 'phoenix-1'
	}

	return 'phoenix-1'
}

function getDefaultChainDenom(): string {
	const chainId = getChainId()

	return CHAIN_DENOMS[chainId]
}

function getContractAddress(contractName: ContractName): string {
	const chainId = getChainId()
	return contractAddresses[chainId][contractName]
}

const DEFAULT_DELAY = 1000

// Async version of sleep
export async function sleep(ms: number = DEFAULT_DELAY): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function getWalletAddress(): Promise<string> {
	const chainId = getChainId()

	return connectedWallet?.addresses[chainId] ?? ''
}

async function sendQuery(contractAddress: string, query: object): Promise<any> {
	return client.wasm.contractQuery(contractAddress, query)
}

async function sendIndependentQuery(
	contractAddress: string,
	query: object
): Promise<any> {
	return client.wasm.contractQuery(contractAddress, query)
}

async function getTxResult(txHash: string): Promise<TxInfo | undefined> {
	const chainId = getChainId()

	const [, response] = await asyncAction(client.tx.txInfo(txHash, chainId))

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

export const getTransactionExplorer = (txId?: string) =>
	txExplorerFactory[getChainId()](txId)

async function estimateTxFee(messages: Msg[]) {
	const address = await getWalletAddress()

	const memo = 'estimate fee'

	const accountInfo = await client.auth.accountInfo(address)

	const txOptions: ExtensionOptions = {
		chainID: getChainId(),
		msgs: messages,
		gasAdjustment: 1.4,
		memo,
	}

	return client.tx.estimateFee(
		[
			{
				sequenceNumber: accountInfo.getSequenceNumber(),
				publicKey: accountInfo.getPublicKey(),
			},
		],
		txOptions
	)
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

	const tx = await wallet?.post({
		chainID: getChainId(),
		msgs,
		memo,
		fee,
	})
	const txId = tx?.txhash ?? ''

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
	const chainId = getChainId()
	const blockInfo = await client.tendermint.blockInfo(chainId)

	return blockInfo.block.header.height
}

const networkBlocksPerDayCache = {}

async function getAverageBlockTime() {
	const BLOCK_RANGE = 10_000

	const chainId = getChainId()

	if (Object.keys(networkBlocksPerDayCache).includes(chainId)) {
		return networkBlocksPerDayCache[chainId]
	}

	const latestBlock = await client.tendermint.blockInfo(chainId)

	const oldBlock = await client.tendermint.blockInfo(
		chainId,
		parseInt(latestBlock.block.header.height, 10) - BLOCK_RANGE
	)

	const blockTime =
		(new Date(latestBlock.block.header.time).getTime() -
			new Date(oldBlock.block.header.time).getTime()) /
		BLOCK_RANGE

	networkBlocksPerDayCache[chainId] = blockTime

	return blockTime
}

export default {
	getLatestBlockHeight,
	sendQuery,
	setConnectedWallet,
	setLcdClient,
	sendIndependentQuery,
	postTransaction,
	postManyTransactions,
	getChainId,
	getWalletAddress,
	setWallet,
	getDefaultChainDenom,
	getCurrencyForDenom,
	getDenomForCurrency,
	amountConverter,
	getTxResult,
	getTransactionExplorer,
	getContractAddress,
	getAverageBlockTime,
}

export type { TransactionDetails }
