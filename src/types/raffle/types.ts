import { NFT } from 'services/api/walletNFTsService'

export interface RaffleFormStepsProps {
	raffleDetailsUrl: string
	terraFinderUrl: string
	// SELECT_NFTS STEP
	coverNFT: NFT
	selectedNFTs: NFT[]
	isSuccessScreen: boolean
}
