import { TradeFormStepsProps } from 'components/ui/forms/trade-form-steps'
import {
	LOOKING_FOR_TYPE,
	VISIBILITY_TYPE,
} from 'components/ui/forms/trade-form-steps/formProps'
import { getDenomForCurrency, P2PTradeOffer } from 'services/blockchain'
import { amountConverter } from 'utils/blockchain/terraUtils'

export function fromCreateTradeFormToBlockchain({
	coverNFT: previewNFT,
	selectedNFTs: nfts,
	lookingForType,
	collections,
	tokenAmount,
	tokenName,
	comment,
	visibilityType,
	walletAddress,
}: TradeFormStepsProps): [P2PTradeOffer] {
	const tokensWanted =
		lookingForType === LOOKING_FOR_TYPE.SPECIFIC && +tokenAmount
			? [
					{
						amount: amountConverter.luna.userFacingToBlockchainValue(
							Number(tokenAmount)
						),
						denom: getDenomForCurrency(tokenName),
					},
			  ]
			: []

	const nftsWanted =
		lookingForType === LOOKING_FOR_TYPE.SPECIFIC
			? (collections ?? []).map(
					({ value: collectionAddress }) => collectionAddress
			  )
			: []

	const whitelistedUsers =
		visibilityType === VISIBILITY_TYPE.PRIVATE ? [walletAddress] : []
	return [
		{
			whitelistedUsers,
			comment,
			nfts,
			nftsWanted,
			tokensWanted,
			previewNFT,
		},
	]
}
