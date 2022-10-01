import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { TRADE_STATE } from 'services/blockchain'
import { LookingFor, NetworkType } from 'types'
import { keysToCamel } from 'utils/js/keysToCamel'
import { Coin, Cw1155Coin, Cw721Coin, NFTWanted } from './tradesService'
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
		associatedAssets: { cw721Coin?: NFT; cw1155Coin?: any; coin?: Coin }[]
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

export interface CounterTradesResponse {
	data: CounterTrade[]
	count: number
	total: number
	page: number
	pageCount: number
}

type CounterTradeFilters = {
	tradeIds?: string[]
	states?: string[]
	collections?: string[]
	lookingFor?: string[]
	counteredBy?: string[]
	whitelistedUsers?: string[]
	owners?: string[]
	hasLiquidAsset?: boolean
	search?: string
}

type TradePagination = {
	page?: number
	limit?: number
}

export class CounterTradesService {
	public static async getAllCounterTrades(
		network: string,
		filters?: CounterTradeFilters,
		pagination?: TradePagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<CounterTradesResponse> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.setFilter({
			field: 'network',
			operator: '$eq',
			value: network,
		})

		if (filters?.tradeIds?.length) {
			queryBuilder.setFilter({
				field: 'trade.tradeId',
				operator: 'in',
				value: filters?.tradeIds,
			})
		}

		if (filters?.states?.length) {
			queryBuilder.setFilter({
				field: 'tradeInfo.state',
				operator: 'in',
				value: filters?.states.map(x => x.toLowerCase()),
			})
		}

		if (filters?.collections?.length) {
			queryBuilder.setFilter({
				field: 'tradeInfo_cw721Assets_collection_join.collectionAddress',
				operator: 'in',
				value: filters?.collections,
			})
		}

		if (filters?.lookingFor?.length) {
			queryBuilder.setFilter({
				field: 'tradeInfo.nftsWanted.collectionAddress',
				operator: 'in',
				value: filters?.lookingFor,
			})
		}

		if (filters?.counteredBy?.length) {
			queryBuilder.setFilter({
				field: 'tradeInfo.counterTrades.owner',
				operator: 'in',
				value: filters?.counteredBy,
			})
		}

		if (filters?.whitelistedUsers?.length) {
			queryBuilder.setFilter({
				field: 'tradeInfo.whitelistedUsers',
				operator: 'in',
				value: filters?.whitelistedUsers,
			})
		}

		if (filters?.owners?.length) {
			queryBuilder.setFilter({
				field: 'tradeInfo.owner',
				operator: 'in',
				value: filters?.owners,
			})
		}

		if (filters?.hasLiquidAsset) {
			queryBuilder.setFilter({
				field: 'tradeInfo.tokensWanted',
				operator: '$cont',
				value: 'coin',
			})
			queryBuilder.setOr({
				field: 'tradeInfo.tokensWanted',
				operator: '$cont',
				value: 'cw20Coin',
			})
		}

		if (filters?.search) {
			queryBuilder.setFilter({
				field: 'tradeInfo_cw721Assets_join.allNftInfo',
				operator: '$cont',
				value: filters?.search,
			})
		}

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
		tradeId: string,
		counterTradeId: string
	): Promise<CounterTrade> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.setFilter({
			field: 'network',
			operator: '$eq',
			value: network,
		})

		queryBuilder.setFilter({
			field: 'tradeId',
			operator: '$eq',
			value: tradeId,
		})

		queryBuilder.setFilter({
			field: 'counterTradeId',
			operator: '$eq',
			value: counterTradeId,
		})

		const response = await axios.get(`counter-trades?${queryBuilder.query()}`)

		const [trade] = response.data

		return keysToCamel(trade)
	}
}
