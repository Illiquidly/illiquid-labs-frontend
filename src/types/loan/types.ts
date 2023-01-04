import { NFT } from 'services/api/walletNFTsService'

export interface LoanFormStepsProps {
	// SHARED
	loanDetailsUrl: string
	terraFinderUrl: string

	// SELECT_NFTS STEP
	coverNFT: NFT
	selectedNFTs: NFT[]
	isSuccessScreen: boolean
}
