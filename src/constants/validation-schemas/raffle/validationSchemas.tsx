import * as yup from 'yup'

export const RafflesSelectNFTStepSchema = yup.object().shape({
	selectedNFTs: yup
		.array()
		.of(yup.object())
		.test('isSelectedNFTValid', value => (value ?? [])?.length > 0),
})

export const RaffleDetailsStepSchema = yup.object().shape({})
