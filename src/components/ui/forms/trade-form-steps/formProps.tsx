import { NFT } from 'services/api/walletNFTsService'

export enum COLLECTION_TYPE {
	SPECIFIC = 'SPECIFIC',
	ANY = 'ANY',
}

export interface TradeFormStepsProps {
	selectedNFTs: NFT[]
	collectionType: COLLECTION_TYPE
}
