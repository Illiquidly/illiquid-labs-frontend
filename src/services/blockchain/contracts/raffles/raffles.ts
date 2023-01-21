import { CONTRACT_NAME } from 'constants/addresses'
import { DrandResponse } from 'services/api/drandService'
import { NFT } from 'services/api/walletNFTsService'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { HumanCoin, HumanCw20Coin } from 'types'
import terraUtils, {
	amountConverter as converter,
} from 'utils/blockchain/terraUtils'
import { keysToSnake } from 'utils/js/keysToSnake'
import { Contract } from '../shared'

const amountConverter = converter.default

export interface RaffleOptions {
	comment?: string
	maxParticipantNumber?: number
	maxTicketPerAddress?: number
	raffleDuration?: number
	rafflePreview?: number
	raffleStartTimestamp?: number
	raffleTimeout?: number
}

class RafflesContract extends Contract {
	static async provideRandomness(raffleId: number, randomness: DrandResponse) {
		const raffleContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.raffle
		)

		return terraUtils.postTransaction({
			contractAddress: raffleContractAddress,
			message: {
				update_randomness: {
					raffle_id: raffleId,
					randomness,
				},
			},
		})
	}

	static async createRaffleListing(
		nfts: NFT[],
		ticketPriceLuna: string | number,
		raffleOptions: RaffleOptions
	): Promise<TxReceipt> {
		const raffleContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.raffle
		)

		return terraUtils.postManyTransactions([
			// Add cw721 tokens to raffle
			...nfts.flatMap(({ collectionAddress, tokenId }) => [
				{
					contractAddress: collectionAddress,
					message: {
						approve: {
							spender: raffleContractAddress,
							token_id: tokenId,
						},
					},
				},
			]),
			{
				contractAddress: raffleContractAddress,
				message: {
					create_raffle: {
						assets: [
							...nfts.flatMap(({ collectionAddress, tokenId }) => [
								{
									cw721_coin: {
										token_id: tokenId,
										address: collectionAddress,
									},
								},
							]),
						],
						raffle_options: keysToSnake(raffleOptions),
						raffle_ticket_price: {
							coin: {
								amount: amountConverter.userFacingToBlockchainValue(ticketPriceLuna),
								denom: 'uluna',
							},
						},
					},
				},
			},
		])
	}

	static async cancelRaffleListing(raffleId: number) {
		const raffleContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.raffle
		)

		return terraUtils.postTransaction({
			contractAddress: raffleContractAddress,
			message: {
				cancel_raffle: {
					raffle_id: raffleId,
				},
			},
		})
	}

	static async modifyRaffleListing(
		raffleId: number,
		raffleOptions: RaffleOptions,
		ticketPriceAmount?: number,
		ticketPriceCurrency?: string
	) {
		const raffleContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.raffle
		)

		return terraUtils.postTransaction({
			contractAddress: raffleContractAddress,
			message: {
				modify_raffle: {
					raffle_id: raffleId,
					raffle_options: keysToSnake(raffleOptions),
					...(ticketPriceAmount
						? {
								raffle_ticket_price: {
									coin: {
										amount:
											amountConverter.userFacingToBlockchainValue(ticketPriceAmount),
										denom: terraUtils.getDenomForCurrency(ticketPriceCurrency ?? ''),
									},
								},
						  }
						: {}),
				},
			},
		})
	}

	static async drawRaffle(raffleId: number) {
		const raffleContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.raffle
		)

		return terraUtils.postTransaction({
			contractAddress: raffleContractAddress,
			message: {
				claim_nft: {
					raffle_id: raffleId,
				},
			},
		})
	}

	static async purchaseRaffleTickets(
		raffleId: number,
		ticketNumber: number,
		coin?: HumanCoin,
		cw20Coin?: HumanCw20Coin
	): Promise<TxReceipt> {
		const raffleContractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.raffle
		)

		return terraUtils.postManyTransactions([
			...(cw20Coin
				? [
						{
							contractAddress: cw20Coin.address,
							message: {
								increase_allowance: {
									spender: raffleContractAddress,
									amount: amountConverter.userFacingToBlockchainValue(
										+cw20Coin.amount * ticketNumber
									),
								},
							},
						},
				  ]
				: []),

			{
				contractAddress: raffleContractAddress,
				message: {
					buy_ticket: {
						raffle_id: raffleId,
						ticket_number: ticketNumber,
						sent_assets: {
							...(cw20Coin
								? {
										cw20_coin: {
											amount: amountConverter.userFacingToBlockchainValue(
												+cw20Coin.amount * ticketNumber
											),
											address: cw20Coin.address,
										},
								  }
								: {}),
							...(coin
								? {
										coin: {
											amount: amountConverter.userFacingToBlockchainValue(
												+coin.amount * ticketNumber
											),
											denom: terraUtils.getDenomForCurrency(coin.currency),
										},
								  }
								: {}),
						},
					},
				},
				...(coin
					? {
							coins: {
								luna: amountConverter.userFacingToBlockchainValue(
									+coin.amount * ticketNumber
								),
							},
					  }
					: {}),
			},
		])
	}
}

export default RafflesContract
