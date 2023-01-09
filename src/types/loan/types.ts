import { NFT } from 'services/api/walletNFTsService'

export interface LoanFormStepsProps {
	// SHARED
	loanDetailsUrl: string
	terraFinderUrl: string

	// SELECT_NFTS STEP
	coverNFT: NFT
	selectedNFTs: NFT[]
	isSuccessScreen: boolean

	// LOAN_DETAILS STEP
	tokenAmount: string
	tokenName: string
	interestRate: string
	loanPeriod: string
	comment: string
}
