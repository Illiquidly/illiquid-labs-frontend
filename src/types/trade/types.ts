import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { LOOKING_FOR_TYPE, VISIBILITY_TYPE } from 'constants/trade'
import { NFT } from 'services/api/walletNFTsService'
import { NetworkName } from 'types/common'

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
