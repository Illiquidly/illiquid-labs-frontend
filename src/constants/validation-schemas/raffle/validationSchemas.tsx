import * as yup from 'yup'

export const RafflesSelectNFTStepSchema = yup.object().shape({
	selectedNFTs: yup
		.array()
		.of(yup.object())
		.test('isSelectedNFTValid', value => (value ?? [])?.length > 0),
})

export const RaffleDetailsStepSchema = yup.object().shape({
	endDate: yup.date().required(),
	endTime: yup.date().required(),
	ticketPriceCurrency: yup.string(),
	ticketPrice: yup
		.number()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.typeError('raffle-form-steps-ticket-price-must-be-number')
		.positive('raffle-form-steps-ticket-price-must-be-positive'),
	ticketSupply: yup
		.number()
		.integer('raffle-form-steps-ticket-supply-must-be-integer')
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.typeError('raffle-form-steps-ticket-supply-must-be-number')
		.positive('raffle-form-steps-ticket-supply-must-be-positive'),
})

export const RaffleBuyTicketSchema = yup.object().shape({
	ticketNumber: yup
		.number()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.typeError('raffle-form-steps-ticket-number-must-be-number')
		.positive('raffle-form-steps-ticket-number-must-be-positive'),
})
