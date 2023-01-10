import * as yup from 'yup'

export const SelectNFTStepSchema = yup.object().shape({
	selectedNFTs: yup.array().of(yup.object()),
})

export const LoanDetailsStepSchema = yup.object().shape({
	tokenAmount: yup
		.number()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.typeError('loan-form-steps-token-must-be-number')
		.positive('loan-form-steps-token-must-be-positive'),

	tokenName: yup.string(),
	interestRate: yup
		.number()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.max(100, 'loan-form-steps-interest-rate-maximum')
		.typeError('loan-form-steps-interest-rate-must-be-number')
		.positive('loan-form-steps-interest-rate-must-be-positive'),

	loanPeriod: yup
		.number()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.test(
			'minimumReached',
			'loan-form-steps-loan-period-minimum',
			value => +(value ?? 0) >= 2
		)
		.typeError('loan-form-steps-loan-period-must-be-number')
		.positive('loan-form-steps-loan-period-must-be-positive'),
})
