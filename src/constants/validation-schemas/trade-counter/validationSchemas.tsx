import * as yup from 'yup'

export const TradeCounterValidationSchema = yup.object().shape({
	selectedNFTs: yup
		.array()
		.of(yup.object())
		.test('isSelectedNFTValid', function (value) {
			const { tokenAmount } = this.parent

			if (tokenAmount) {
				return true
			}

			return (value ?? [])?.length > 0
		}),
	tokenAmount: yup
		.number()
		.nullable()
		.transform((value: string, originalValue: string) =>
			originalValue.trim() === '' ? null : value
		)
		.typeError('trade-form-steps-token-must-be-number')
		.positive('trade-forms-steps-token-must-be-positive')
		.test(
			'isTokenAmountSpecified',
			'trade-form-steps-token-must-be-number',
			function (value) {
				const { selectedNFTs } = this.parent

				return !(!(selectedNFTs ?? []).length && !value)
			}
		),

	tokenName: yup.string(),
})
