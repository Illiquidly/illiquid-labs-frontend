/* eslint-disable import/prefer-default-export */
import { isNumber } from 'lodash'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import terraUtils, {
	amountConverter as converter,
} from 'utils/blockchain/terraUtils'
import { keysToCamel } from 'utils/js/keysToCamel'
import addresses, { ContractName } from 'services/blockchain/addresses'
import { NFT } from 'services/api/walletNFTsService'
import { Coin } from 'services/api/tradesService'

const amountConverter = converter.ust

type TerraCurrency = string

export type Asset = {
	[asset: string]: {
		address: string
		amount?: number
		tokenId?: string
		denom?: string
	}
}

export function getDenomForCurrency(currency: TerraCurrency) {
	if (currency === 'LUNA') {
		return 'uluna'
	}
	if (currency === 'UST') {
		return 'uusd'
	}
	throw new Error(`Unsupported currency: ${currency}`)
}

// function getCurrencyForDenom(denom: 'uusd' | 'uluna'): TerraCurrency {
// 	if (denom === 'uusd') {
// 		return 'UST'
// 	}
// 	if (denom === 'uluna') {
// 		return 'LUNA'
// 	}
// 	throw new Error(`Unsupported denom: ${denom}`)
// }

const P2P_TRADE = 'p2p-trade'

export interface P2PTradeOffer {
	amountUST?: string
	amountLuna?: string
	comment: string
	nfts: NFT[]
	whitelistedUsers: string[]
	tokensWanted?: { amount: string; denom: string }[]
	nftsWanted?: string[]
	previewNFT: NFT
}

async function listTradeOffers(offers: P2PTradeOffer[]) {
	const txs = offers.map(
		({
			whitelistedUsers,
			amountUST,
			amountLuna,
			comment,
			nfts,
			nftsWanted,
			tokensWanted,
			previewNFT,
		}) => {
			const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

			return [
				// Create empty trade with comment
				{
					contractAddress: p2pContractAddress,
					message: {
						create_trade: {
							whitelisted_users: whitelistedUsers,
							comment,
						},
					},
				},
				// Funds to new trade
				...(amountUST
					? [
							{
								contractAddress: p2pContractAddress,
								message: {
									add_asset: {
										asset: {
											coin: {
												amount: amountConverter.userFacingToBlockchainValue(amountUST),
												denom: 'uusd',
											},
										},
										to_last_trade: true,
									},
								},
								coins: {
									ust: amountConverter.userFacingToBlockchainValue(amountUST),
								},
							},
					  ]
					: []),
				...(amountLuna
					? [
							{
								contractAddress: p2pContractAddress,
								message: {
									add_asset: {
										to_last_trade: true,
										asset: {
											coin: {
												amount: amountConverter.userFacingToBlockchainValue(amountLuna),
												denom: 'uluna',
											},
										},
									},
								},
								coins: {
									luna: amountConverter.userFacingToBlockchainValue(amountLuna),
								},
							},
					  ]
					: []),

				// Add cw721 tokens to trade
				...nfts.flatMap(({ collectionAddress, tokenId }) => [
					{
						contractAddress: collectionAddress,
						message: {
							approve: {
								spender: p2pContractAddress,
								token_id: tokenId,
							},
						},
					},
					{
						contractAddress: p2pContractAddress,
						message: {
							add_asset: {
								action: {
									to_last_trade: {},
								},
								asset: {
									cw721_coin: {
										address: collectionAddress,
										token_id: tokenId,
									},
								},
							},
						},
					},
				]),
				// Add trade preview
				{
					contractAddress: p2pContractAddress,
					message: {
						set_trade_preview: {
							action: {
								to_last_trade: {},
							},
							asset: {
								cw721_coin: {
									address: previewNFT.collectionAddress,
									token_id: previewNFT.tokenId,
								},
							},
						},
					},
				},
				// Add NFTs wanted, array of contract addresses
				...((nftsWanted ?? []).length
					? [
							{
								contractAddress: p2pContractAddress,
								message: {
									add_n_f_ts_wanted: {
										nfts_wanted: nftsWanted,
									},
								},
							},
					  ]
					: []),
				// Add tokens wanted array of amount and denom
				...((tokensWanted ?? []).length
					? [
							{
								contractAddress: p2pContractAddress,
								message: {
									add_tokens_wanted: {
										tokens_wanted: (tokensWanted ?? []).map(({ amount, denom }) => ({
											coin: {
												amount,
												denom,
											},
										})),
									},
								},
							},
					  ]
					: []),
				// Confirm trade -> trade is published after
				{
					contractAddress: p2pContractAddress,
					message: {
						confirm_trade: {},
					},
				},
			]
		}
	)
	return terraUtils.postManyTransactions(txs.flat())
}

async function setTradeComment(
	tradeId: number,
	comment: string
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	// Post transactions for setting comment
	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			set_comment: {
				trade_id: tradeId,
				comment,
			},
		},
	})
}

async function updateTrade(
	tradeId: number,
	comment: string,
	tokensWanted: Coin[],
	nftsWanted: string[]
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postManyTransactions([
		{
			contractAddress: p2pContractAddress,
			message: {
				set_comment: {
					trade_id: tradeId,
					comment,
				},
			},
		},
		{
			contractAddress: p2pContractAddress,
			message: {
				set_n_f_ts_wanted: {
					nfts_wanted: nftsWanted,
				},
			},
		},
		{
			contractAddress: p2pContractAddress,
			message: {
				set_tokens_wanted: {
					tokens_wanted: (tokensWanted ?? []).map(({ amount, denom }) => ({
						coin: {
							amount,
							denom,
						},
					})),
				},
			},
		},
	])
}

async function createTrade(whitelistedUsers: string[]): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	// Post transactions for creating trade
	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			create_trade: {
				whitelisted_users: whitelistedUsers,
			},
		},
	})
}

async function addFundsToTrade(
	tradeId: number,
	amount: number,
	currency: TerraCurrency
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const requiredAmount = amountConverter.userFacingToBlockchainValue(amount)

	// TODO add more than 1 in future? Depends on UI
	const txs = [
		{
			contractAddress: p2pContractAddress,
			message: {
				add_asset: {
					asset: {
						coin: {
							amount: requiredAmount,
							denom: getDenomForCurrency(currency.toLowerCase()),
						},
					},
					trade_id: tradeId,
				},
			},
			coins: {
				[currency.toLowerCase()]: requiredAmount,
			},
		},
	]

	return terraUtils.postManyTransactions(txs)
}

async function addCw20(
	tradeId: number,
	amount: number,
	token: ContractName,
	counterId?: number
): Promise<TxReceipt> {
	const cw20ContractAddress = addresses.getContractAddress(token)
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)
	const requiredAmount = amountConverter.userFacingToBlockchainValue(amount)

	const txs = [
		{
			contractAddress: cw20ContractAddress,
			message: {
				increase_allowance: {
					spender: p2pContractAddress,
					amount: requiredAmount,
				},
			},
		},
		{
			contractAddress: p2pContractAddress,
			message: {
				add_asset: {
					asset: {
						cw20_coin: {
							amount: requiredAmount,
							address: cw20ContractAddress,
						},
					},
					...(Number.isInteger(counterId) ? { counter_id: counterId } : {}),
					trade_id: tradeId,
				},
			},
		},
	]

	return terraUtils.postManyTransactions(txs)
}

async function addCw721(
	tradeId: number,
	token: ContractName,
	tokenId: string,
	counterId?: number
): Promise<TxReceipt> {
	const cw721ContractAddress = addresses.getContractAddress(token) // TODO define list of allowed C721 tokens
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const txs = [
		{
			contractAddress: cw721ContractAddress,
			message: {
				approve: {
					spender: p2pContractAddress,
					token_id: tokenId,
				},
			},
		},
		{
			contractAddress: p2pContractAddress,
			message: {
				add_asset: {
					asset: {
						cw_721: {
							address: cw721ContractAddress,
							token_id: tokenId,
						},
					},
					trade_id: tradeId,
					counter_id: counterId,
				},
			},
		},
	]

	return terraUtils.postManyTransactions(txs)
}

async function removeFromTrade(
	tradeId: number,
	assets: [number, Asset][]
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const mappedAssets = assets.map(([position, asset]) => [
		position,
		{
			...(asset.cw721Coin
				? {
						cw721_coin: {
							token_id: asset.cw721Coin.tokenId,
							address: asset.cw721Coin.address,
						},
				  }
				: {}),

			...(asset.cw20Coin
				? {
						cw20_coin: {
							address: asset.cw20Coin.address,
							amount: amountConverter.userFacingToBlockchainValue(
								asset.cw20Coin.amount
							),
						},
				  }
				: {}),
			...(asset.coin
				? {
						coin: {
							amount: amountConverter.userFacingToBlockchainValue(asset.coin.amount),
							denom: (asset.coin.denom || '')
								.toLowerCase()
								.replace('ust', 'uusd')
								.replace('luna', 'uluna'),
						},
				  }
				: {}),
		},
	])

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			remove_assets: {
				trade_id: tradeId,
				assets: mappedAssets,
			},
		},
	})
}

async function addWhitelistedUsers(
	tradeId: number,
	whitelistedUsers: string[]
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			add_whitelisted_users: {
				trade_id: tradeId,
				whitelisted_users: whitelistedUsers,
			},
		},
	})
}

async function removeWhitelistedUsers(
	tradeId: number,
	whitelistedUsers: string[]
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			remove_whitelisted_users: {
				trade_id: tradeId,
				whitelisted_users: whitelistedUsers,
			},
		},
	})
}

async function confirmTrade(tradeId: number): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			confirm_trade: {
				trade_id: tradeId,
			},
		},
	})
}

async function listCounterTradeOffer({
	tradeId,
	amountUST,
	amountLuna,
	comment,
	cw721Tokens,
}: {
	tradeId: number
	amountUST: string
	amountLuna: string
	comment: string
	cw721Tokens: any[]
}) {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const txs = [
		{
			contractAddress: p2pContractAddress,
			message: {
				suggest_counter_trade: { trade_id: tradeId, comment },
			},
		},

		...(amountUST
			? [
					{
						contractAddress: p2pContractAddress,
						message: {
							add_asset: {
								trade_id: tradeId,
								to_last_counter: true,
								asset: {
									coin: {
										amount: amountConverter.userFacingToBlockchainValue(amountUST),
										denom: 'uusd',
									},
								},
							},
						},
						coins: {
							ust: amountConverter.userFacingToBlockchainValue(amountUST),
						},
					},
			  ]
			: []),
		...(amountLuna
			? [
					{
						contractAddress: p2pContractAddress,
						message: {
							add_asset: {
								trade_id: tradeId,
								to_last_counter: true,
								asset: {
									coin: {
										amount: amountConverter.userFacingToBlockchainValue(amountLuna),
										denom: 'uluna',
									},
								},
							},
						},
						coins: {
							luna: amountConverter.userFacingToBlockchainValue(amountLuna),
						},
					},
			  ]
			: []),
		...cw721Tokens.flatMap(cw721 => [
			{
				contractAddress: cw721.contractAddress,
				message: {
					approve: {
						spender: p2pContractAddress,
						token_id: cw721.tokenId,
					},
				},
			},
			{
				contractAddress: p2pContractAddress,
				message: {
					add_asset: {
						asset: {
							cw721_coin: {
								address: cw721.contractAddress,
								token_id: cw721.tokenId,
							},
						},
						to_last_counter: true,
						trade_id: tradeId,
					},
				},
			},
		]),

		{
			contractAddress: p2pContractAddress,
			message: {
				confirm_counter_trade: {
					trade_id: tradeId,
				},
			},
		},
	]

	return terraUtils.postManyTransactions(txs)
}

async function suggestCounterTrade(tradeId: number): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			suggest_counter_trade: {
				trade_id: tradeId,
			},
		},
	})
}

async function addFundsToCounterTrade(
	counterTradeId: number,
	tradeId: number,
	amount: number,
	currency: TerraCurrency
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const requiredAmount = amountConverter.userFacingToBlockchainValue(amount)

	const txs = [
		{
			contractAddress: p2pContractAddress,
			message: {
				add_asset: {
					trade_id: tradeId,
					counter_id: counterTradeId,
					asset: {
						coin: {
							amount: requiredAmount,
							denom: getDenomForCurrency(currency.toLowerCase()),
						},
					},
				},
			},
			coins: {
				[currency.toLowerCase()]: requiredAmount,
			},
		},
	]

	// Post transactions for adding funds
	return terraUtils.postManyTransactions(txs)
}

// This is a bit "hacky" way to withdraw funds.
async function removeAllFromCreatedCounterTrade(
	counterId: number,
	tradeId: number
) {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const txs = [
		{
			contractAddress: p2pContractAddress,
			message: {
				withdraw_all_from_counter: {
					trade_id: tradeId,
					counter_id: counterId,
				},
			},
		},
	]

	return terraUtils.postManyTransactions(txs)
}

async function removeFromCounterTrade(
	counterId: number,
	tradeId: number,
	assets: [number, Asset][]
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	// eslint-disable-next-line sonarjs/no-identical-functions
	const mappedAssets = assets.map(([position, asset]) => [
		position,
		{
			...(asset.cw721Coin
				? {
						cw721_coin: {
							token_id: asset.cw721Coin.tokenId,
							address: asset.cw721Coin.address,
						},
				  }
				: {}),

			...(asset.cw20Coin
				? {
						cw20_coin: {
							address: asset.cw20Coin.address,
							amount: amountConverter.userFacingToBlockchainValue(
								asset.cw20Coin.amount
							),
						},
				  }
				: {}),
			...(asset.coin
				? {
						coin: {
							amount: amountConverter.userFacingToBlockchainValue(asset.coin.amount),
							denom: (asset.coin.denom || '')
								.toLowerCase()
								.replace('ust', 'uusd')
								.replace('luna', 'uluna'),
						},
				  }
				: {}),
		},
	])

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			remove_from_counter_trade: {
				counter_id: counterId,
				trade_id: tradeId,
				assets: mappedAssets,
			},
		},
	})
}

async function confirmCounterTrade(
	counterId: number,
	tradeId: number
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			confirm_counter_trade: {
				counter_id: counterId,
				trade_id: tradeId,
			},
		},
	})
}

async function withdrawAcceptedTrade(tradeId: number) {
	const feeContractAddress = addresses.getContractAddress('fee-collector')

	const feeResponse = await terraUtils.sendQuery(feeContractAddress, {
		fee: { trade_id: tradeId },
	})

	return terraUtils.postTransaction({
		contractAddress: feeContractAddress,
		message: {
			pay_fee_and_withdraw: {
				trade_id: tradeId,
			},
		},
		coins: {
			...(Number.parseInt(feeResponse.amount, 10)
				? {
						[{ uluna: 'luna', uusd: 'ust' }[feeResponse.denom ?? 'uluna'] as string]:
							feeResponse.amount,
				  }
				: {}),
		},
	})
}

async function acceptTrade(
	counterId: number,
	tradeId: number,
	comment?: string,
	withdraw?: boolean
) {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const feeContractAddress = addresses.getContractAddress('fee-collector')

	const feeResponse: { amount: string; denom: string } =
		await terraUtils.sendQuery(feeContractAddress, {
			fee: { trade_id: tradeId, counter_id: counterId },
		})

	const txs = [
		{
			contractAddress: p2pContractAddress,
			message: {
				accept_trade: {
					counter_id: counterId,
					trade_id: tradeId,
					...(comment ? { comment } : {}),
				},
			},
		},
		...(withdraw
			? [
					{
						contractAddress: feeContractAddress,
						message: {
							pay_fee_and_withdraw: {
								trade_id: tradeId,
							},
						},
						coins: {
							...(Number.parseInt(feeResponse.amount, 10)
								? {
										[{ uluna: 'luna', uusd: 'ust' }[
											feeResponse.denom ?? 'uluna'
										] as string]: feeResponse.amount,
								  }
								: {}),
						},
					},
			  ]
			: []),
	]

	return terraUtils.postManyTransactions(txs)
}

async function cancelTrade(tradeId: number): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			cancel_trade: {
				trade_id: tradeId,
			},
		},
	})
}

async function withdrawAllFromCounter(
	tradeId: number,
	counterId: number
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			withdraw_all_from_counter: {
				trade_id: tradeId,
				counter_id: counterId,
			},
		},
	})
}

async function cancelCounterTrade(
	tradeId: number,
	counterId: number
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			cancel_counter_trade: {
				trade_id: tradeId,
				counter_id: counterId,
			},
		},
	})
}

async function cancelCounterTradeAndWithdraw(
	counterId: number,
	tradeId: number
) {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const txs = [
		{
			contractAddress: p2pContractAddress,
			message: {
				cancel_counter_trade: {
					trade_id: tradeId,
					counter_id: counterId,
				},
			},
		},
		{
			contractAddress: p2pContractAddress,
			message: {
				withdraw_all_from_counter: {
					trade_id: tradeId,
					counter_id: counterId,
				},
			},
		},
	]

	return terraUtils.postManyTransactions(txs)
}

async function refuseCounterTrade(
	tradeId: number,
	counterId: number,
	comment?: string
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const txs = [
		...(comment
			? [
					{
						contractAddress: p2pContractAddress,
						message: {
							review_counter_trade: {
								trade_id: tradeId,
								counter_id: counterId,
								...(comment ? { comment } : {}),
							},
						},
					},
			  ]
			: []),
		{
			contractAddress: p2pContractAddress,
			message: {
				refuse_counter_trade: {
					trade_id: tradeId,
					counter_id: counterId,
				},
			},
		},
	]

	return terraUtils.postManyTransactions(txs)
}

async function reviewCounterTrade(
	tradeId: number,
	counterId: number,
	comment?: string
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			review_counter_trade: {
				trade_id: tradeId,
				counter_id: counterId,
				...(comment ? { comment } : {}),
			},
		},
	})
}

async function withdrawPendingAssets(tradeId: number): Promise<TxReceipt> {
	const feeContractAddress = addresses.getContractAddress('fee-collector')

	const feeResponse = await terraUtils.sendQuery(feeContractAddress, {
		fee: { trade_id: tradeId },
	})

	return terraUtils.postTransaction({
		contractAddress: feeContractAddress,

		message: {
			pay_fee_and_withdraw: {
				trade_id: tradeId,
			},
		},
		coins: {
			...(Number.parseInt(feeResponse.amount, 10)
				? {
						[{ uluna: 'luna', uusd: 'ust' }[feeResponse.denom ?? 'uluna'] as string]:
							feeResponse.amount,
				  }
				: {}),
		},
	})
}

async function withdrawCancelledTradeAssets(
	tradeId: number
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postTransaction({
		contractAddress: p2pContractAddress,
		message: {
			withdraw_all_from_trade: {
				trade_id: tradeId,
			},
		},
	})
}

async function cancelAndWithdrawTrade(tradeId: number): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	return terraUtils.postManyTransactions([
		{
			contractAddress: p2pContractAddress,
			message: {
				cancel_trade: {
					trade_id: tradeId,
				},
			},
		},
		{
			contractAddress: p2pContractAddress,
			message: {
				withdraw_all_from_trade: {
					trade_id: tradeId,
				},
			},
		},
	])
}

// Queries

export type ContractInfo = {
	name: string
	owner: string
	lastTradeId?: string
}
async function contractInfo(): Promise<ContractInfo> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const {
		name,
		owner,
		last_trade_id: lastTradeId,
	} = await terraUtils.sendQuery(p2pContractAddress, {
		contract_info: {},
	})

	return {
		name,
		owner,
		lastTradeId,
	}
}

export type AssetInfo = {}

export type TradeInfo = {
	acceptedInfo?: any // TODO correct this type
	assetsWithdrawn: boolean
	associatedAssets: Asset[]
	lastCounterId?: number
	additionnalInfo: {
		ownerComment: {
			comment: string
			time: string
		}
		time: string
		nftsWanted: string[]
		traderComment?: {
			comment: string
			time: string
		}
	}
	owner: string
	state: string
	whitelistedUsers: string[]
}

async function getTradeInfo(tradeId: number): Promise<TradeInfo> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const tradeInfoResponse = await terraUtils.sendQuery(p2pContractAddress, {
		trade_info: {
			trade_id: tradeId,
		},
	})

	return keysToCamel(tradeInfoResponse)
}

export type CounterTradeInfo = {
	tradeId: number
	counterId: number
}

async function counterTradeInfo(
	tradeId: number,
	counterId: number
): Promise<CounterTradeInfo> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const { trade_id: responseTradeId, counter_id: responseCounterId } =
		await terraUtils.sendQuery(p2pContractAddress, {
			trade_info: {
				trade_id: tradeId,
				counter_id: counterId,
			},
		})

	return {
		tradeId: responseTradeId,
		counterId: responseCounterId,
	}
}

export enum TRADE_STATE {
	Created = 'created',
	Published = 'published',
	Countered = 'countered',
	Refused = 'refused',
	Accepted = 'accepted',
	Cancelled = 'cancelled',
}

export interface Trade {
	tradeId: number
	counterId?: number
	tradeInfo: TradeInfo
}

async function getAllTrades(
	states?: TRADE_STATE[],
	filterOwner?: string,
	startAfter?: number,
	limit?: number,
	whitelistedUser?: string,
	wantedNFT?: string,
	containsToken?: string,
	counterer?: string,
	hasWhitelist?: boolean
): Promise<Trade[]> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const tradeInfoResponse = await terraUtils.sendQuery(p2pContractAddress, {
		get_all_trades: {
			...(isNumber(startAfter) ? { start_after: startAfter } : {}),
			...(limit ? { limit } : {}),
			filters: {
				...(states ? { states } : {}),
				...(filterOwner ? { owner: filterOwner } : {}),
				...(whitelistedUser ? { whitelisted_user: whitelistedUser } : {}),
				...(wantedNFT ? { wanted_nft: wantedNFT } : {}),
				...(containsToken ? { contains_token: containsToken } : {}),
				...(counterer ? { counterer } : {}),
				...(typeof hasWhitelist === 'boolean'
					? { has_whitelist: hasWhitelist }
					: {}),
			},
		},
	})

	return tradeInfoResponse?.trades.map((trade: any): Trade => keysToCamel(trade))
}

async function getCounterTrades(tradeId: number): Promise<Trade[]> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const tradeInfoResponse = await terraUtils.sendQuery(p2pContractAddress, {
		get_counter_trades: {
			trade_id: tradeId,
		},
	})

	return tradeInfoResponse?.counter_trades.map(
		(counterTrade: any): Trade => keysToCamel(counterTrade)
	)
}

async function getAllCounterTrades(
	states?: TRADE_STATE[],
	filterOwner?: string,
	startAfter?: number,
	limit?: number,
	whitelistedUser?: string,
	wantedNFT?: string,
	containsToken?: string,
	hasWhitelist?: boolean
): Promise<Trade[]> {
	const p2pContractAddress = addresses.getContractAddress(P2P_TRADE)

	const counterTradeInfoResponse = await terraUtils.sendQuery(
		p2pContractAddress,
		{
			get_all_counter_trades: {
				...(isNumber(startAfter) ? { start_after: startAfter } : {}),
				...(limit ? { limit } : {}),
				filters: {
					...(states ? { states } : {}),
					...(filterOwner ? { owner: filterOwner } : {}),
					...(whitelistedUser ? { whitelisted_user: whitelistedUser } : {}),
					...(wantedNFT ? { wanted_nft: wantedNFT } : {}),
					...(containsToken ? { contains_token: containsToken } : {}),
					...(typeof hasWhitelist === 'boolean'
						? { has_whitelist: hasWhitelist }
						: {}),
				},
			},
		}
	)

	return counterTradeInfoResponse?.counter_trades.map(
		(counterTrade: any): Trade => keysToCamel(counterTrade)
	)
}

export {
	withdrawAcceptedTrade,
	listTradeOffers,
	createTrade,
	addFundsToTrade,
	addCw20,
	addCw721,
	removeFromTrade,
	addWhitelistedUsers,
	removeWhitelistedUsers,
	confirmTrade,
	updateTrade,
	suggestCounterTrade,
	addFundsToCounterTrade,
	removeFromCounterTrade,
	confirmCounterTrade,
	listCounterTradeOffer,
	acceptTrade,
	cancelTrade,
	cancelCounterTrade,
	refuseCounterTrade,
	reviewCounterTrade,
	withdrawPendingAssets,
	withdrawCancelledTradeAssets,
	cancelAndWithdrawTrade,
	contractInfo,
	getTradeInfo,
	counterTradeInfo,
	getAllTrades,
	getCounterTrades,
	getAllCounterTrades,
	cancelCounterTradeAndWithdraw,
	removeAllFromCreatedCounterTrade,
	withdrawAllFromCounter,
	setTradeComment,
}
