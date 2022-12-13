import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { NFT } from 'services/api/walletNFTsService'
import { NetworkName } from 'types/common'

export enum LOOKING_FOR_TYPE {
	SPECIFIC = 'SPECIFIC',
	ANY = 'ANY',
}
export enum VISIBILITY_TYPE {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}
export interface TradeFormStepsProps {
	tradeDetailsUrl: string
	terraFinderUrl: string
	// SELECT_NFTS STEP
	coverNFT: NFT
	selectedNFTs: NFT[]
	isSuccessScreen: boolean
	// TRADE_DETAILS STEP
	lookingForType: LOOKING_FOR_TYPE
	collection: string
	collections: MultiSelectAccordionInputOption[]
	tokenAmount: number
	tokenName: string
	comment: string
	// CHOOSE VISIBILITY STEP
	visibilityType: VISIBILITY_TYPE
	walletAddress: string
}

export type LookingFor = {
	id?: number
	network: NetworkName
	collectionAddress?: string
	collectionName?: string
	symbol?: string
	currency?: string
	amount?: string
	denom?: string
}
