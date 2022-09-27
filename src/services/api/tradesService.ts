import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { TRADE_STATE } from 'services/blockchain'
import { keysToCamel } from 'utils/js/keysToCamel'
import { NFT } from './walletNFTsService'

export type Coin = {
	amount: string
	denom: string
}

export type Cw721Coin = {
	address: string
	tokenId: string
}

export type Cw1155Coin = {
	address: string
	tokenId: string
}

export type NetworkType = 'testnet' | 'classic' | 'mainnet'

export type NFTWanted = {
	id: number
	network: NetworkType
	collectionAddress: string
	collectionName: string
	symbol: string
}

export type LookingFor = {
	id?: number
	network: NetworkType
	collectionAddress?: string
	collectionName?: string
	symbol?: string
	currency?: string
	amount?: string
}
export interface Trade {
	id: number
	network: NetworkType
	tradeId: number
	tradeInfo: {
		acceptedInfo: {
			counterId?: number
		}
		assetsWithdrawn: boolean
		lastCounterId?: number
		associatedAssets: []
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

export interface TradesResponse {
	data: Trade[]
	count: number
	total: number
	page: number
	pageCount: number
}

type TradeFilters = {
	tradeIds?: string[]
	states?: string[]
	collections?: string[]
	lookingFor?: string[]
	counteredBy?: string[]
	whitelistedUsers?: string[]
	owners?: string[]
	hasLiquidAsset?: boolean
}

type TradePagination = {
	page?: number
	limit?: number
	direction?: string
}

export class TradesService {
	public static async getAllTrades(
		network: string,
		filters?: TradeFilters,
		pagination?: TradePagination
	): Promise<TradesResponse> {
		const queryBuilder = RequestQueryBuilder.create()
		queryBuilder.setFilter({
			field: 'network',
			operator: '$eq',
			value: network,
		})

		if (filters?.tradeIds?.length) {
			queryBuilder.setFilter({
				field: 'tradeId',
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
				field: 'tradeInfo.associatedAssets.cw721Coin.collectionAddress',
				operator: 'in',
				value: filters?.collections,
			})
		}

		if (filters?.lookingFor?.length) {
			queryBuilder.setFilter({
				field: 'tradeInfo.additionalInfo.lookingFor.collectionAddress',
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
				field: 'tradeInfo.additionalInfo.lookingFor.currency',
				operator: 'notnull',
			})
		}

		if (pagination?.limit) {
			queryBuilder.setLimit(pagination?.limit)
		}

		if (pagination?.page) {
			queryBuilder.setPage(pagination?.page)
		}

		const response = await axios.get(`trades?${queryBuilder.query()}`)

		return response.data
	}

	public static async getTrade(
		network: string,
		tradeId: string
	): Promise<Trade> {
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

		const response = await axios.get(`trades?${queryBuilder.query()}`)

		const [trade] = response.data

		return keysToCamel(trade)
	}
}
