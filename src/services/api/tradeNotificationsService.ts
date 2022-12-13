import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { APIGetAllResponse, NetworkName } from 'types'
import { APIPagination } from 'types/common'
import { NFT } from './walletNFTsService'

export enum TRADE_NOTIFICATION_TYPE {
	NewCounterTrade = 'new_counter_trade',
	CounterTradeReview = 'counter_trade_review',
	CounterTradeAccepted = 'counter_trade_accepted',
	OtherCounterTradeAccepted = 'other_counter_trade_accepted',
	TradeCancelled = 'trade_cancelled',
	RefuseCounterTrade = 'counter_trade_refused',
}

export enum READ_STATUS {
	UNREAD = 'unread',
	READ = 'read',
}

export interface TradeNotification {
	id: number
	network: NetworkName
	time: string
	user: string
	tradeId: number
	counterTradeId: number
	notificationType: TRADE_NOTIFICATION_TYPE
	status: READ_STATUS
	notificationPreview?: {
		cw721Coin?: NFT
	}
}

export type TradeNotificationsResponse = APIGetAllResponse<TradeNotification>

type TradeNotificationsFilters = {
	user: string
}

export class TradeNotificationsService {
	static async getTradeNotifications(
		network: string,
		filters: TradeNotificationsFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<TradeNotificationsResponse> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.setFilter({
			field: 'network',
			operator: '$eq',
			value: network,
		})

		queryBuilder.setFilter({
			field: 'user',
			operator: '$eq',
			value: filters.user,
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

		const response = await axios.get(
			`trade-notifications?${queryBuilder.query()}`
		)

		return response.data
	}
}
