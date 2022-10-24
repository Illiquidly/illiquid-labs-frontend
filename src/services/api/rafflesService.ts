import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { APIGetAllResponse, NetworkType } from 'types'
import { APIPagination } from 'types/common'
import { keysToCamel } from 'utils/js/keysToCamel'
import { HumanCoin } from './tradesService'
import { NFT } from './walletNFTsService'

interface Cw20Coin {
	amount: string
	currency: string
}

enum RAFFLE_STATE {
	closed = 'closed',
}

export interface Raffle {
	network: NetworkType
	raffleId: number
	id: number
	raffleInfo: {
		id: number
		owner: string
		allAssociatedAssets: { cw721Coin?: NFT; cw1155Coin?: any }[]
		raffleTicketPrice: {
			cw20Coin: Cw20Coin
			coin: HumanCoin
		}
		numberOfTickets: number
		randomnessOwner?: string
		winner?: string
		state: RAFFLE_STATE
		raffleOptions: {
			raffleStartDate: string // ISO 8261 Date
			raffleDuration: number // seconds
			raffleTimeout: number // seconds
			comment?: string
			maxParticipantNumber: number
			maxTicketPerAddress?: number
			rafflePreview: {
				cw721Coin: NFT
			}
		}
	}
}

type RafflesResponse = APIGetAllResponse<Raffle>

type RaffleFilters = {
	raffleIds?: string[]
	states?: string[]
	collections?: string[]
	participatedBy?: string[]
	owners?: string[]
	excludeRaffles?: (string | number)[]
	favoritesOf?: string
}

export class RafflesService {
	public static async getAllRaffles(
		network: string,
		filters?: RaffleFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<RafflesResponse> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.search({
			$and: [
				{
					network,
				},
				...(filters?.raffleIds?.length
					? [
							{
								raffleId: {
									$in: filters?.raffleIds,
								},
							},
					  ]
					: []),

				...(filters?.states?.length
					? [
							{
								'raffleInfo.state': {
									$in: filters?.states,
								},
							},
					  ]
					: []),

				...(filters?.collections?.length
					? [
							{
								'raffleInfo_cw721Assets_collection_join.collectionAddress': {
									$in: filters?.collections,
								},
							},
					  ]
					: []),

				...(filters?.participatedBy?.length
					? [
							{
								'participants.user': {
									$in: filters?.participatedBy,
								},
							},
					  ]
					: []),

				...(filters?.owners?.length
					? [
							{
								owner: {
									$in: filters?.owners,
								},
							},
					  ]
					: []),

				...(filters?.excludeRaffles
					? [
							{
								raffleId: {
									$notin: filters?.excludeRaffles,
								},
							},
					  ]
					: []),
				...(filters?.favoritesOf
					? [
							{
								'raffleFavorites.user': {
									$eq: filters?.favoritesOf,
								},
							},
					  ]
					: []),
			],
		})

		if (pagination?.limit) {
			queryBuilder.setLimit(pagination?.limit)
		}

		if (pagination?.page) {
			queryBuilder.setPage(pagination?.page)
		}

		if (sort) {
			queryBuilder.sortBy({
				field: 'id',
				order: sort,
			})
		}

		const response = await axios.get(`raffles?${queryBuilder.query()}`)

		return response.data
	}

	public static async getRaffle(
		network: string,
		raffleId: string
	): Promise<Raffle> {
		const response = await axios.patch(
			`raffles?network=${network}&raffleId=${raffleId}`
		)

		return keysToCamel(response.data)
	}
}
