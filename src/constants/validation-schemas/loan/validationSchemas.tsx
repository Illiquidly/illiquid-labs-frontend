import * as yup from 'yup'

export const SelectNFTStepSchema = yup.object().shape({
	selectedNFTs: yup.array().of(yup.object()),
})

export const LoanDetailsStepSchema = yup.object().shape({})
