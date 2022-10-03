import { LOOKING_FOR_TYPE } from 'components/ui/forms/trade-form-steps'
import { getDenomForCurrency } from 'services/blockchain'
import { amountConverter } from 'utils/blockchain/terraUtils'

export function fromUpdateTradeToBlockchain({
	tokenAmount,
	tokenName,
	comment,
	nftsWanted,
	lookingForType,
}) {
	const newTokensWanted =
		lookingForType === LOOKING_FOR_TYPE.ANY || !tokenAmount
			? []
			: [
					{
						amount: amountConverter.luna.userFacingToBlockchainValue(
							Number(tokenAmount)
						),
						denom: getDenomForCurrency(tokenName),
					},
			  ]

	const newNFTsWanted = lookingForType === LOOKING_FOR_TYPE.ANY ? [] : nftsWanted

	return {
		newTokensWanted,
		newNFTsWanted,
		comment,
		tokenAmount,
		tokenName,
	}
}
