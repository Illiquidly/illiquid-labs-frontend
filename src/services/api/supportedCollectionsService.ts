import pMemoize from 'p-memoize'
import { axios } from 'services/axios'

const memoizedAxiosGet = pMemoize(axios.get)

export type SupportedCollectionGetResponse = {
	collectionName: string
	collectionAddress: string
}

export class SupportedCollectionsService {
	static async getSupportedCollections(
		networkName: string
	): Promise<SupportedCollectionGetResponse[]> {
		const response = await memoizedAxiosGet(`/nfts/query/${networkName}/`)

		return Object.values(response.data).map(({ contract, name }: any) => ({
			collectionName: name,
			collectionAddress: contract,
		}))
	}
}
