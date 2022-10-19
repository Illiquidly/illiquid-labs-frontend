import { NFT } from 'services/api/walletNFTsService'

export interface RaffleFormStepsProps {
	raffleDetailsUrl: string
	terraFinderUrl: string
	// SELECT_NFTS STEP
	coverNFT: NFT
	selectedNFTs: NFT[]

	// RAFFLE DETAILS STEP
	endDate: string
	endTime: string
	ticketSupply: number
	ticketPrice: number
	ticketPriceCurrency: string

	// CONFIRM
	isSuccessScreen: boolean
}
