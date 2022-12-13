/* eslint-disable import/prefer-default-export */
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import terraUtils, {
	amountConverter as converter,
	NativeCurrency,
} from 'utils/blockchain/terraUtils'
import { NFT } from 'services/api/walletNFTsService'
import { keysToSnake } from 'utils/js/keysToSnake'
import { Coin, ContractName } from 'types'
import { CONTRACT_NAME } from 'constants/addresses'
import { Contract } from '../shared'

const amountConverter = converter.default

export type Asset = {
	[asset: string]: {
		address: string
		amount?: number
		tokenId?: string
		denom?: string
	}
}

export interface TradeFee {
	amount: number
	currency: 'luna'
}

export interface P2PTradeOffer {
	amountNative?: string
	comment: string
	nfts: NFT[]
	whitelistedUsers: string[]
	tokensWanted?: { amount: string; denom: string }[]
	nftsWanted?: string[]
	previewNFT: NFT
}

class P2PTradingContract extends Contract {
	static async listTradeOffers(offers: P2PTradeOffer[]) {
		const txs = offers.map(
			({
				whitelistedUsers,
				amountNative,
				comment,
				nfts,
				nftsWanted,
				tokensWanted,
				previewNFT,
			}) => {
				const p2pContractAddress = terraUtils.getContractAddress(
					CONTRACT_NAME.p2pTrade
				)

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

					...(amountNative
						? [
								{
									contractAddress: p2pContractAddress,
									message: {
										add_asset: {
											to_last_trade: true,
											asset: {
												coin: {
													amount: amountConverter.userFacingToBlockchainValue(amountNative),
													denom: terraUtils.getDefaultChainDenom(),
												},
											},
										},
									},
									coins: {
										luna: amountConverter.userFacingToBlockchainValue(amountNative),
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

	static async setTradeComment(
		tradeId: number,
		comment: string
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async updateTrade(
		tradeId: number,
		comment: string,
		tokensWanted: Coin[],
		nftsWanted: string[]
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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
						trade_id: tradeId,
						nfts_wanted: nftsWanted,
					},
				},
			},
			{
				contractAddress: p2pContractAddress,
				message: {
					set_tokens_wanted: {
						trade_id: tradeId,
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

	static async createTrade(whitelistedUsers: string[]): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async addFundsToTrade(
		tradeId: number,
		amount: number,
		currency: NativeCurrency
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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
								denom: terraUtils.getDenomForCurrency(currency.toLowerCase()),
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

	static async addCw20(
		tradeId: number,
		amount: number,
		token: ContractName,
		counterId?: number
	): Promise<TxReceipt> {
		const cw20ContractAddress = terraUtils.getContractAddress(token)
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)
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

	static async addCw721(
		tradeId: number,
		token: ContractName,
		tokenId: string,
		counterId?: number
	): Promise<TxReceipt> {
		const cw721ContractAddress = terraUtils.getContractAddress(token)
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async addWhitelistedUsers(
		tradeId: number,
		whitelistedUsers: string[]
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async removeWhitelistedUsers(
		tradeId: number,
		whitelistedUsers: string[]
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async confirmTrade(tradeId: number): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

		return terraUtils.postTransaction({
			contractAddress: p2pContractAddress,
			message: {
				confirm_trade: {
					trade_id: tradeId,
				},
			},
		})
	}

	static async listCounterTradeOffer({
		tradeId,
		amountNative,
		comment,
		cw721Tokens,
	}: {
		tradeId: number
		amountNative?: string
		comment?: string
		cw721Tokens: NFT[]
	}) {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

		const txs = [
			{
				contractAddress: p2pContractAddress,
				message: {
					suggest_counter_trade: { trade_id: tradeId, comment },
				},
			},

			...(amountNative
				? [
						{
							contractAddress: p2pContractAddress,
							message: {
								add_asset: {
									action: {
										to_last_counter_trade: {
											trade_id: tradeId,
										},
									},
									asset: {
										coin: {
											amount: amountConverter.userFacingToBlockchainValue(amountNative),
											denom: terraUtils.getDefaultChainDenom(),
										},
									},
								},
							},
							coins: {
								luna: amountConverter.userFacingToBlockchainValue(amountNative),
							},
						},
				  ]
				: []),
			...cw721Tokens.flatMap(cw721 => [
				{
					contractAddress: cw721.collectionAddress,
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
									address: cw721.collectionAddress,
									token_id: cw721.tokenId,
								},
							},
							action: {
								to_last_counter_trade: {
									trade_id: tradeId,
								},
							},
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

	static async suggestCounterTrade(tradeId: number): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

		return terraUtils.postTransaction({
			contractAddress: p2pContractAddress,
			message: {
				suggest_counter_trade: {
					trade_id: tradeId,
				},
			},
		})
	}

	static async addFundsToCounterTrade(
		counterTradeId: number,
		tradeId: number,
		amount: number,
		currency: NativeCurrency
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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
								denom: terraUtils.getDenomForCurrency(currency.toLowerCase()),
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
	static async removeAllFromCreatedCounterTrade(
		counterId: number,
		tradeId: number
	) {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async confirmCounterTrade(
		counterId: number,
		tradeId: number
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async withdrawAcceptedTrade(tradeId: number) {
		const feeContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.feeCollector
		)

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
							[{ uluna: 'luna' }[feeResponse.denom ?? 'uluna'] as string]:
								feeResponse.amount,
					  }
					: {}),
			},
		})
	}

	static async getAcceptedTradeFee({
		tradeId,
		counterId,
	}: {
		tradeId: number
		counterId: number
	}): Promise<TradeFee> {
		const feeContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.feeCollector
		)

		const feeResponse: { amount: string; denom: string } =
			await terraUtils.sendQuery(feeContractAddress, {
				fee: {
					trade_id: tradeId,
					counter_id: counterId,
				},
			})

		const currency = { uluna: 'luna' }[feeResponse.denom ?? 'uluna'] as 'luna'

		return {
			amount: amountConverter.blockchainValueToUserFacing(feeResponse.amount),
			currency,
		}
	}

	static async simulateTradeFee({
		tradeId,
		counterAssets,
	}: {
		tradeId: number
		counterAssets: Asset[]
	}) {
		const feeContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.feeCollector
		)

		const feeResponse: { amount: string; denom: string } =
			await terraUtils.sendQuery(feeContractAddress, {
				simulate_fee: {
					trade_id: tradeId,
					counter_assets: counterAssets.map(
						({ cw721Coin, coin, cw20Coin, cw1155Coin }) => ({
							cw721_coin: keysToSnake(cw721Coin),
							coin: keysToSnake(coin),
							cw20_coin: keysToSnake(cw20Coin),
							cw1155_coin: keysToSnake(cw1155Coin),
						})
					),
				},
			})

		const currency = { uluna: 'luna' }[feeResponse.denom ?? 'uluna'] as 'luna'

		return {
			amount: amountConverter.blockchainValueToUserFacing(feeResponse.amount),
			currency,
		}
	}

	static async acceptTrade(
		counterId: number,
		tradeId: number,
		comment?: string,
		withdraw?: boolean
	) {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

		const feeContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.feeCollector
		)

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
											[{ uluna: 'luna' }[feeResponse.denom ?? 'uluna'] as string]:
												feeResponse.amount,
									  }
									: {}),
							},
						},
				  ]
				: []),
		]

		return terraUtils.postManyTransactions(txs)
	}

	static async cancelTrade(tradeId: number): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

		return terraUtils.postTransaction({
			contractAddress: p2pContractAddress,
			message: {
				cancel_trade: {
					trade_id: tradeId,
				},
			},
		})
	}

	static async withdrawAllFromCounter(
		tradeId: number,
		counterId: number
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async cancelCounterTrade(
		tradeId: number,
		counterId: number
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async cancelCounterTradeAndWithdraw(
		counterId: number,
		tradeId: number
	) {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async refuseCounterTrade(
		tradeId: number,
		counterId: number,
		comment?: string
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async reviewCounterTrade(
		tradeId: number,
		counterId: number,
		comment?: string
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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

	static async withdrawPendingAssets(tradeId: number): Promise<TxReceipt> {
		const feeContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.feeCollector
		)

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
							[{ uluna: 'luna' }[feeResponse.denom ?? 'uluna'] as string]:
								feeResponse.amount,
					  }
					: {}),
			},
		})
	}

	static async withdrawCancelledTradeAssets(
		tradeId: number
	): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

		return terraUtils.postTransaction({
			contractAddress: p2pContractAddress,
			message: {
				withdraw_all_from_trade: {
					trade_id: tradeId,
				},
			},
		})
	}

	static async cancelAndWithdrawTrade(tradeId: number): Promise<TxReceipt> {
		const p2pContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.p2pTrade
		)

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
}

export default P2PTradingContract
