import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { TRADE_STATE } from 'services/blockchain'
import { LookingFor, NetworkType } from 'types'
import { APIGetAllResponse, APIPagination } from 'types/common'
import { keysToCamel } from 'utils/js/keysToCamel'
import {
	Coin,
	Cw1155Coin,
	Cw721Coin,
	HumanCoin,
	NFTWanted,
} from './tradesService'
import { NFT } from './walletNFTsService'

export interface CounterTrade {
	id: number
	network: NetworkType
	tradeId: number
	counterId: number
	trade: { id: number; network: NetworkType; tradeId: number }
	tradeInfo: {
		acceptedInfo: {
			counterId?: number
		}
		assetsWithdrawn: boolean
		lastCounterId?: number
		associatedAssets: { cw721Coin?: NFT; cw1155Coin?: any; coin?: HumanCoin }[]
		additionalInfo: {
			ownerComment: {
				comment: string
				time: string
			}
			time: string
			tokensWanted: {
				coin?: Coin
				cw721Coin?: Cw721Coin
				cw1155Coin?: Cw1155Coin
			}[]
			tradePreview: {
				coin?: Coin
				cw1155?: any
				cw721Coin?: NFT
			}
			traderComment: {
				comment?: string
				time?: string
			}
			nftsWanted: NFTWanted[]
			lookingFor: LookingFor[]
		}
		owner: string
		state: TRADE_STATE
		whitelistedUsers: []
	}
}

export type CounterTradesResponse = APIGetAllResponse<CounterTrade>

type CounterTradeFilters = {
	tradeIds?: string[]
	states?: string[]
	collections?: string[]
	owners?: string[]
	search?: string
}

export class CounterTradesService {
	public static async getAllCounterTrades(
		network: string,
		filters?: CounterTradeFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<CounterTradesResponse> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.search({
			$and: [
				{
					network,
				},
				...(filters?.tradeIds?.length
					? [
							{
								'trade.tradeId': {
									$in: filters?.tradeIds,
								},
							},
					  ]
					: []),

				...(filters?.states?.length
					? [
							{
								'tradeInfo.state': {
									$in: filters?.states,
								},
							},
					  ]
					: []),

				...(filters?.collections?.length
					? [
							{
								'tradeInfo_cw721Assets_collection_join.collectionAddress': {
									$in: filters?.collections,
								},
							},
					  ]
					: []),

				...(filters?.owners?.length
					? [
							{
								'tradeInfo.owner': {
									$in: filters?.owners,
								},
							},
					  ]
					: []),

				...(filters?.search?.length
					? [
							{
								'tradeInfo_cw721Assets_join.allNftInfo': {
									$cont: filters?.search,
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

		const response = await axios.get(`counter-trades?${queryBuilder.query()}`)

		return response.data
	}

	public static async getCounterTrade(
		network: string,
		tradeId: string | number,
		counterId: string | number
	): Promise<CounterTrade> {
		const response = await axios.patch(
			`counter-trades?network=${network}&tradeId=${tradeId}&counterId=${counterId}`
		)

		return keysToCamel(response.data)
	}
}
