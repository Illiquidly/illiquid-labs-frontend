import { NFT } from 'services/api/walletNFTsService'

export interface SendFormStepsProps {
	terraFinderUrl: string

	// SELECT_NFTS STEP
	selectedNFTs: (NFT & { recipient: string })[]

	// SEND DETAILS STEP
	memo: string
	recipient?: string

	// CONFIRM
	isSuccessScreen: boolean
}
