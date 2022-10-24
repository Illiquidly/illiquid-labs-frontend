import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { NetworkType } from 'types'

export type FavoriteRaffleRequest = {
	network: NetworkType
	user: string
	raffleId: (string | number)[]
}

export type FavoriteRaffleResponse = {
	id: number
	network: NetworkType
	user: string
	raffles: {
		id: number
		network: NetworkType
		raffleId: number
	}[]
}

export class FavoriteRafflesService {
	static async addFavoriteRaffle({
		network,
		user,
		raffleId,
	}: FavoriteRaffleRequest): Promise<FavoriteRaffleResponse> {
		const response = await axios.patch(
			`/raffle-favorites/add?network=${network}&user=${user}&raffleId=${raffleId}`
		)

		return response.data
	}

	static async removeFavoriteRaffle({
		network,
		user,
		raffleId,
	}: FavoriteRaffleRequest): Promise<FavoriteRaffleResponse> {
		const response = await axios.patch(
			`/raffle-favorites/remove?network=${network}&user=${user}&raffleId=${raffleId}`
		)

		return response.data
	}

	static async getFavoriteRaffles(
		{ network }: { network: NetworkType },
		filters
	): Promise<FavoriteRaffleResponse[]> {
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

		const response = await axios.get(`/raffle-favorites/?${queryBuilder.query()}`)

		return response.data
	}
}
