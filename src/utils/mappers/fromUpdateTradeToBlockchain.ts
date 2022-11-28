import { getDenomForCurrency } from 'services/blockchain'
import { LOOKING_FOR_TYPE } from 'types'
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
						amount: amountConverter.default.userFacingToBlockchainValue(
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
