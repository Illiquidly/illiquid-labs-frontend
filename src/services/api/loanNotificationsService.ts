import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { APIGetAllResponse, NetworkName } from 'types'
import { APIPagination } from 'types/common'
import { NFT } from './walletNFTsService'

export enum LOAN_NOTIFICATION_TYPE {
	NewOffer = 'new_offer',
	OfferAccepted = 'offer_accepted',
	LoanAccepted = 'loan_accepted',
	OtherOfferAccepted = 'other_offer_accepted',
	LoanCancelled = 'loan_cancelled',
	RefuseOffer = 'offer_refused',
}

export enum READ_STATUS {
	UNREAD = 'unread',
	READ = 'read',
}

export interface LoanNotification {
	id: number
	network: NetworkName
	time: string
	user: string
	loanId: number
	borrower: string
	counterLoanId: number
	notificationType: LOAN_NOTIFICATION_TYPE
	status: READ_STATUS
	notificationPreview?: {
		cw721Coin?: NFT
	}
}

export type LoanNotificationsResponse = APIGetAllResponse<LoanNotification>

type LoanNotificationsFilters = {
	user: string
}

export class LoanNotificationsService {
	static async getLoanNotifications(
		network: string,
		filters: LoanNotificationsFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<LoanNotificationsResponse> {
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

		const response = await axios.get(`loan-notifications?${queryBuilder.query()}`)

		return response.data
	}
}
