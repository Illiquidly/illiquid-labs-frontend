import { NFT } from 'services/api/walletNFTsService'

export enum COLLECTION_TYPE {
	SPECIFIC = 'SPECIFIC',
	ANY = 'ANY',
}

interface collections {
	value: string
}

export interface TradeFormStepsProps {
	selectedNFTs: NFT[]
	collectionType: COLLECTION_TYPE
	collection: string
	collections: collections[]
	tokenAmount: number
	tokenName: string
	comment: string
}
