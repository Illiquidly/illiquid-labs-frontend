import { NFT } from 'services/api/walletNFTsService'

export enum LOOKING_FOR_TYPE {
	SPECIFIC = 'SPECIFIC',
	ANY = 'ANY',
}
export enum VISIBILITY_TYPE {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

export interface collections {
	label: string
	value: string
}

export interface TradeFormStepsProps {
	// SELECT_NFTS STEP
	coverNFT: NFT
	selectedNFTs: NFT[]
	// TRADE_DETAILS STEP
	lookingForType: LOOKING_FOR_TYPE
	collection: string
	collections: collections[]
	tokenAmount: number
	tokenName: string
	comment: string
	// CHOOSE VISIBILITY STEP
	visibilityType: VISIBILITY_TYPE
	walletAddress: string
}
