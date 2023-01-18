import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { APIGetAllResponse, APIPagination } from 'types'
import { keysToCamel } from 'utils/js/keysToCamel'
import { LoanOffer } from './loansOffersService'
import { NFT } from './walletNFTsService'

// TODO: move this to as const type, convert name to camelCase...
export enum LOAN_STATE {
	Published = 'published',
	Started = 'started',
	Defaulted = 'defaulted',
	Ended = 'ended',
	Withdrawn = 'assets_withdrawn',
}

type Principle = {
	denom: string
	amount: string
}

type Terms = {
	principle: Principle
	interest: string
	durationInBlocks: number
}

type LoanFavorites = {
	id: number
	network: string
	user: string
	loans: string[]
}

export type Loan = {
	id: number
	network: string
	borrower: string
	loanId: number
	loanFavorites: LoanFavorites[]
	offers: LoanOffer[]
	loanInfo: {
		associatedAssets: [
			{
				cw721Coin: NFT
			}
		]
		listDate: string
		state: LOAN_STATE
		offerAmount: number
		activeOffer?: number
		startBlock?: number
		comment: string
		loanPreview: {
			cw721Coin: NFT
		}
		terms: Terms
	}
}

export type LoanFilters = {
	loanIds?: string[]
	states?: string[]
	collections?: string[]
	borrowers?: string[]
	hasLiquidAsset?: boolean
	search?: string
	excludeMyLoans?: boolean
	excludeLoans?: (string | number)[]
	myAddress: string
	favoritesOf?: string
}

export type LoansResponse = APIGetAllResponse<Loan>

export class LoansService {
	public static async getAllLoans(
		network: string,
		filters?: LoanFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<LoansResponse> {
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

				...(filters?.excludeMyLoans
					? [
							{
								borrower: {
									$notin: [filters.myAddress],
								},
							},
					  ]
					: []),

				...(filters?.excludeLoans
					? [
							{
								loanId: {
									$notin: filters?.excludeLoans,
								},
							},
					  ]
					: []),
				...(filters?.favoritesOf
					? [
							{
								'loanFavorites.user': {
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

		const response = await axios.get(`loans?${queryBuilder.query()}`)

		return response.data
	}

	public static async getLoan(
		network: string,
		loanId: string,
		borrower: string
	): Promise<Loan> {
		const response = await axios.patch(
			`loans?network=${network}&loanId=${loanId}&borrower=${borrower}`
		)

		return keysToCamel(response.data)
	}
}
