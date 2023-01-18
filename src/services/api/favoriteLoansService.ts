import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { NetworkName } from 'types'

export type FavoriteLoanRequest = {
	network: NetworkName
	user: string
	loanId: (string | number)[]
	borrower: string | number
}

export type FavoriteLoanResponse = {
	id: number
	network: NetworkName
	user: string
	loans: {
		id: number
		network: NetworkName
		loanId: number
	}[]
}

export class FavoriteLoansService {
	static async addFavoriteLoan({
		network,
		user,
		borrower,
		loanId,
	}: FavoriteLoanRequest): Promise<FavoriteLoanResponse> {
		const response = await axios.patch(
			`/loan-favorites/add?network=${network}&user=${user}&loanId=${loanId}&borrower=${borrower}`
		)

		return response.data
	}

	static async removeFavoriteLoan({
		network,
		user,
		borrower,
		loanId,
	}: FavoriteLoanRequest): Promise<FavoriteLoanResponse> {
		const response = await axios.patch(
			`/loan-favorites/remove?network=${network}&user=${user}&loanId=${loanId}&borrower=${borrower}`
		)

		return response.data
	}

	static async getFavoriteLoans(
		{ network }: { network: NetworkName },
		filters
	): Promise<FavoriteLoanResponse[]> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.search({
			$and: [
				{
					network,
				},
				...(filters?.users?.length
					? [
							{
								user: {
									$in: filters?.users,
								},
							},
					  ]
					: []),
			],
		})

		const response = await axios.get(`/loan-favorites/?${queryBuilder.query()}`)

		return response.data
	}
}
