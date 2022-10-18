import { LOOKING_FOR_TYPE, VISIBILITY_TYPE } from 'types'
import { isValidTerraAddress } from 'utils/blockchain/isValidAddress'
import * as yup from 'yup'

export const SelectNFTStepSchema = yup.object().shape({
	selectedNFTs: yup.array().of(yup.object()),
})

export const TradeDetailsStepSchema = yup.object().shape(
	{
		lookingForType: yup
			.mixed<LOOKING_FOR_TYPE>()
			.oneOf(Object.values(LOOKING_FOR_TYPE)),
		collection: yup.string(),
		collections: yup
			.array()
			.of(yup.object().shape({ value: yup.string(), label: yup.string() }))
			.when(['lookingForType', 'tokenAmount'], {
				is: (lookingForType: LOOKING_FOR_TYPE, tokenAmount: number | null) =>
					lookingForType === LOOKING_FOR_TYPE.SPECIFIC && !tokenAmount,
				then: yup
					.array()
					.of(yup.object().shape({ value: yup.string(), label: yup.string() }))
					.min(1, 'trade-form-steps-min-one-collections-selected'),
			}),
		tokenAmount: yup
			.number()
			.nullable()
			.transform((value: string, originalValue: string) =>
				originalValue.trim() === '' ? null : value
			)
			.when(['lookingForType', 'collections'], {
				is: (lookingForType: LOOKING_FOR_TYPE, collections: any[]) =>
					lookingForType === LOOKING_FOR_TYPE.SPECIFIC && collections.length <= 0,
				then: yup
					.number()
					.typeError('trade-form-steps-token-must-be-number')
					.positive('trade-forms-steps-token-must-be-positive'),
			}),
		tokenName: yup.string(),
		comment: yup.string(),
	},
	[['collections', 'tokenAmount']]
)

export const ChooseVisibilityStepSchema = yup.object().shape({
	visibilityType: yup
		.mixed<VISIBILITY_TYPE>()
		.oneOf(Object.values(VISIBILITY_TYPE)),
	walletAddress: yup.string().when('visibilityType', {
		is: VISIBILITY_TYPE.PRIVATE,
		then: yup
			.string()
			.test(
				'valid-wallet-address',
				'trade-form-steps-wallet-address-not-valid',
				value => (value ? isValidTerraAddress(value) : false)
			),
	}),
})
