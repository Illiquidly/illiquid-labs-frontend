import { AIRDROP_TYPE } from 'constants/sendTypes'
import { NFT } from 'services/api/walletNFTsService'

export interface SendFormStepsProps {
	terraFinderUrl: string

	// SELECT_NFTS STEP
	selectedNFTs: (NFT & { recipient: string })[]

	// SEND DETAILS STEP
	memo: string
	recipient?: string

	// AIRDROP SPECIFIC
	airdropType: AIRDROP_TYPE
	fileName: string

	// CONFIRM
	isSuccessScreen: boolean
}
