import * as yup from 'yup'

export const RafflesSelectNFTStepSchema = yup.object().shape({
	selectedNFTs: yup
		.array()
		.of(yup.object())
		.test('isSelectedNFTValid', value => (value ?? [])?.length > 0),
})

export const RaffleDetailsStepSchema = yup.object().shape({
	endDate: yup.string().required(),
	endTime: yup.string().required(),
	ticketPriceCurrency: yup.string(),
	ticketPrice: yup
		.number()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.typeError('trade-form-steps-token-must-be-number')
		.positive('trade-forms-steps-token-must-be-positive'),
	ticketSupply: yup
		.number()
		.integer()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.typeError('trade-form-steps-token-must-be-number')
		.positive('trade-forms-steps-token-must-be-positive'),
})
