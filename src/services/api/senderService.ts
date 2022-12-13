import { RequestQueryBuilder } from '@nestjsx/crud-request'
import { axios } from 'services/axios'
import { APIGetAllResponse, APIPagination, NetworkName } from 'types'
import { NFT } from './walletNFTsService'

export type SentAsset = {
	id: number
	sender: string
	recipient: string
	cw721Token: NFT
}

export interface SendTransaction {
	id: number
	network: NetworkName
	blockHeight: number
	date: string
	txHash: string
	memo: string
	sentAssets: SentAsset[]
}

type SenderFilters = {
	memo?: string // Can be any but in constants we have defined those we are interested in. Airdrop and Multi-send.
	senders?: string[]
	recipients?: string[]
}

type SendTransactionResponse = APIGetAllResponse<SendTransaction>

export class SenderService {
	public static async getAllTransactions(
		network: string,
		filters?: SenderFilters,
		pagination?: APIPagination,
		sort: 'ASC' | 'DESC' = 'DESC'
	): Promise<SendTransactionResponse> {
		const queryBuilder = RequestQueryBuilder.create()

		queryBuilder.search({
			$and: [
				{
					network,
				},
				...(filters?.memo
					? [
							{
								memo: {
									$contL: filters?.memo,
								},
							},
					  ]
					: []),

				...(filters?.senders?.length
					? [
							{
								'sentAssets.sender': {
									$in: filters?.senders,
								},
							},
					  ]
					: []),

				...(filters?.recipients?.length
					? [
							{
								'sentAssets.recipient': {
									$in: filters?.recipients,
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

		const response = await axios.get(
			`/nft-transfer-transactions?${queryBuilder.query()}`
		)

		return response.data
	}

	// TODO: rename this to requestUpdate
	public static async getTransaction(network: string): Promise<SendTransaction> {
		const response = await axios.patch(
			`/nft-transfer-transactions/update/${network}`
		)

		return response.data
	}
}
