import { axios } from 'services/axios'

// eslint-disable-next-line no-shadow
export enum WalletNFTState {
	Full = 0, // All old txs were loaded
	Partial = 1, // There is still some old info to query to have a complete nft_interacted array
	isUpdating = 2, // THe API is currently updating info for the address
}

export class WalletNFTsService {
	static async requestUpdateNFTs(network: string, address: string) {
		return axios.get(`nfts/query/${network}/${address}?action=update`)
	}

	static async requestNFTs(network: string, address: string) {
		return axios.get(`nfts/query/${network}/${address}?action=plain_db`)
	}
}
