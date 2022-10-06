import * as yup from 'yup'

export const TradeCounterValidationSchema = yup.object().shape({
	selectedNFTs: yup.array().of(yup.object()),

	tokenAmount: yup
		.number()
		.nullable()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.when(['selectedNFTs'], {
			is: selectedNFTs => !selectedNFTs.length,
			then: yup.number().required(),
		}),
	tokenName: yup.string(),
})
