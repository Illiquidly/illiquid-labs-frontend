import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { APIGetAllResponse, APIPagination, HumanCoin } from 'types/common'
import { keysToCamel } from 'utils/js/keysToCamel'

// TODO: move this to as const type, convert name to camelCase...
export enum OFFER_STATE {
	Published = 'published',
	Accepted = 'accepted',
	Refused = 'refused',
	Cancelled = 'cancelled',
}

export type LoanOffer = {
	id: number
	network: string
	globalOfferId: string
	borrower: string
	loanId: number
	lender: string
	loan: string
	state: OFFER_STATE
	listDate: string
	depositedFunds: HumanCoin
	comment: string
}

export type CounterTradesResponse = APIGetAllResponse<LoanOffer>

type LoanOffersFilters = {
	loanIds?: string[]
	states?: string[]
	collections?: string[]
	borrowers?: string[]
	search?: string
	globalOfferIds?: string[]
}

export class LoanOffersService {
	public static async getAllLoanOffers(
		network: string,
		filters?: LoanOffersFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<CounterTradesResponse> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.search({
			$and: [
				{
					network,
				},
				...(filters?.loanIds?.length
					? [
							{
								loanId: {
									$in: filters?.loanIds,
								},
							},
					  ]
					: []),

				...(filters?.globalOfferIds?.length
					? [
							{
								globalOfferId: {
									$in: filters?.globalOfferIds,
								},
							},
					  ]
					: []),

				...(filters?.states?.length
					? [
							{
								state: {
									$in: filters?.states,
								},
							},
					  ]
					: []),

				...(filters?.collections?.length
					? [
							{
								'cw721Assets_collection_join.collectionAddress': {
									$in: filters?.collections,
								},
							},
					  ]
					: []),

				...(filters?.borrowers?.length
					? [
							{
								borrower: {
									$in: filters?.borrowers,
								},
							},
					  ]
					: []),

				...(filters?.search?.length
					? [
							{
								'cw721Assets.allNftInfo': {
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

		const response = await axios.get(`loan-offers?${queryBuilder.query()}`)

		return response.data
	}

	public static async getLoanOffer(
		network: string,
		globalOfferId: string
	): Promise<LoanOffer> {
		const response = await axios.patch(
			`loan-offers?network=${network}&globalOfferId=${globalOfferId}`
		)

		return keysToCamel(response.data)
	}
}
