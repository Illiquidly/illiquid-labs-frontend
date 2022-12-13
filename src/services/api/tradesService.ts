import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { keysToCamel } from 'utils/js/keysToCamel'
import { APIGetAllResponse, LookingFor, NetworkName } from 'types'
import {
	APIPagination,
	Coin,
	Cw1155Coin,
	Cw721Coin,
	HumanCoin,
} from 'types/common'
import { NFT } from './walletNFTsService'
import { CounterTrade } from './counterTradesService'

export type NFTWanted = {
	id: number
	network: NetworkName
	collectionAddress: string
	collectionName: string
	symbol: string
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
	id: number
	counterTrades: CounterTrade[]
	network: NetworkName
	tradeId: number
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

export type TradesResponse = APIGetAllResponse<Trade>

type TradeFilters = {
	tradeIds?: string[]
	states?: string[]
	collections?: string[]
	lookingFor?: string[]
	counteredBy?: string[]
	whitelistedUsers?: string[]
	owners?: string[]
	hasLiquidAsset?: boolean
	search?: string
	excludeMyTrades?: boolean
	excludeTrades?: (string | number)[]
	myAddress: string
	favoritesOf?: string
}

export class TradesService {
	public static async getAllTrades(
		network: string,
		filters?: TradeFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<TradesResponse> {
		const queryBuilder = RequestQueryBuilder.create()
		queryBuilder.setJoin({ field: 'counterTrades.tradeInfo' })

		queryBuilder.search({
			$and: [
				...(filters?.myAddress
					? [
							{
								$or: [
									{
										'tradeInfo.whitelistedUsers': '[]',
									},
									{
										'tradeInfo.whitelistedUsers': {
											$cont: filters.myAddress,
										},
									},
									{
										'tradeInfo.whitelistedUsers': {
											$ne: '[]',
										},
										'tradeInfo.owner': filters.myAddress,
									},
								],
							},
					  ]
					: []),
				{
					network,
				},
				...(filters?.tradeIds?.length
					? [
							{
								tradeId: {
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

				...(filters?.lookingFor?.length
					? [
							{
								'tradeInfo.nftsWanted.collectionAddress': {
									$in: filters?.lookingFor,
								},
							},
					  ]
					: []),
				...(filters?.counteredBy?.length
					? [
							{
								'counterTrade_tradeInfo_join.owner': {
									$in: filters?.counteredBy,
								},
							},
					  ]
					: []),
				...(filters?.whitelistedUsers?.length
					? [
							{
								'tradeInfo.whitelistedUsers': {
									$in: filters?.whitelistedUsers,
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

				...(filters?.hasLiquidAsset
					? [
							{
								$or: [
									{
										'tradeInfo.tokensWanted': {
											$cont: 'coin',
										},
									},
									{
										'tradeInfo.tokensWanted': {
											$cont: 'cw20Coin',
										},
									},
								],
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

				...(filters?.excludeMyTrades
					? [
							{
								'tradeInfo.owner': {
									$notin: [filters.myAddress],
								},
							},
					  ]
					: []),

				...(filters?.excludeTrades
					? [
							{
								tradeId: {
									$notin: filters?.excludeTrades,
								},
							},
					  ]
					: []),
				...(filters?.favoritesOf
					? [
							{
								'tradeFavorites.user': {
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

		const response = await axios.get(`trades?${queryBuilder.query()}`)

		return response.data
	}

	public static async getTrade(
		network: string,
		tradeId: string
	): Promise<Trade> {
		const response = await axios.patch(
			`trades?network=${network}&tradeId=${tradeId}`
		)

		return keysToCamel(response.data)
	}
}
