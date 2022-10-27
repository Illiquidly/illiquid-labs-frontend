import { NFT } from 'services/api/walletNFTsService'
import addresses from 'services/blockchain/addresses'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { HumanCoin, HumanCw20Coin } from 'types'
import terraUtils, {
	amountConverter as converter,
} from 'utils/blockchain/terraUtils'
import { keysToSnake } from 'utils/js/keysToSnake'
import { Contract, getDenomForCurrency } from '../shared'

const amountConverter = converter.ust

export interface RaffleOptions {
	comment?: string
	maxParticipantNumber?: number
	maxTicketPerAddress?: number
	raffleDuration?: number
	rafflePreview?: number
	raffleStartTimestamp?: number
	raffleTimeout?: number
}

const RAFFLE = 'raffle'

class RafflesContract extends Contract {
	static async createRaffleListing(
		nfts: NFT[],
		ticketPriceLuna: string | number,
		raffleOptions: RaffleOptions
	): Promise<TxReceipt> {
		const raffleContractAddress = addresses.getContractAddress(RAFFLE)

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
		const raffleContractAddress = addresses.getContractAddress(RAFFLE)

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
		raffleOptions: RaffleOptions
	) {
		const raffleContractAddress = addresses.getContractAddress(RAFFLE)

		return terraUtils.postTransaction({
			contractAddress: raffleContractAddress,
			message: {
				modify_raffle: {
					raffle_id: raffleId,
					raffle_options: keysToSnake(raffleOptions),
				},
			},
		})
	}

	static async drawRaffle(raffleId: number) {
		const raffleContractAddress = addresses.getContractAddress(RAFFLE)

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
		const raffleContractAddress = addresses.getContractAddress(RAFFLE)

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
											amount: amountConverter.userFacingToBlockchainValue(cw20Coin.amount),
											address: cw20Coin.address,
										},
								  }
								: {}),
							...(coin
								? {
										coin: {
											amount: amountConverter.userFacingToBlockchainValue(coin.amount),
											denom: getDenomForCurrency(coin.currency),
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
