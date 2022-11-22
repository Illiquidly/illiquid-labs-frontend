import axios from 'axios'

interface NFTAttribute {
	displayType?: string
	traitType: string
	value: string
}

export interface NFT {
	collectionAddress: string
	tokenId: string
	collectionName: string
	description: string
	imageUrl: string[]
	name?: string
	attributes?: NFTAttribute[]
	traits?: [string, string][]
}

export interface Collection {
	collectionAddress: string
	collectionName: string
}

export interface WalletNFTsResponse {
	ownedCollections: Collection[]
	ownedTokens: NFT[]
}

export class WalletNFTsService {
	static async getNFTs(
		network: string,
		address: string
	): Promise<WalletNFTsResponse> {
		const { data } = await axios.get(
			`https://${network}.nfts.api.evenbytes.work/nft-wallet/${address}`
		)

		return data
	}
}
