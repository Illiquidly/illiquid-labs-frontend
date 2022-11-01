import { NFT } from 'services/api/walletNFTsService'

export interface RaffleFormStepsProps {
	raffleDetailsUrl: string
	terraFinderUrl: string
	// SELECT_NFTS STEP
	coverNFT: NFT
	selectedNFTs: NFT[]

	// RAFFLE DETAILS STEP
	endDate: Date
	endTime: Date
	ticketSupply: number
	ticketPrice: number
	ticketPriceCurrency: string
	comment: string

	// CONFIRM
	isSuccessScreen: boolean
}
