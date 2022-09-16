import { NFT } from 'services/api/walletNFTsService'

export enum COLLECTION_TYPE {
	SPECIFIC = 'SPECIFIC',
	ANY = 'ANY',
}
export enum VISIBILITY_TYPE {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

interface collections {
	value: string
}

export interface TradeFormStepsProps {
	coverNFT: NFT
	selectedNFTs: NFT[]
	collectionType: COLLECTION_TYPE
	collection: string
	collections: collections[]
	tokenAmount: number
	tokenName: string
	comment: string
	visibilityType: VISIBILITY_TYPE
	walletAddress: string
}
