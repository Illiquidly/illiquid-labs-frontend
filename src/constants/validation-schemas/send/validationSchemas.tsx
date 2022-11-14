import { isValidTerraAddress } from 'utils/blockchain/isValidAddress'
import * as yup from 'yup'

export const SendSelectNFTStepSchema = yup.object().shape({
	selectedNFTs: yup
		.array()
		.of(yup.object())
		.test(
			'isSelectedNFTValid',
			'selected-nfts-invalid',
			value => (value ?? [])?.length > 0
		),
})

export const SendMultiSendRecipientSchema = yup.object().shape({
	recipient: yup
		.string()
		.test(
			'valid-wallet-address',
			'send-form-steps-wallet-address-not-valid',
			value => (value ? isValidTerraAddress(value) : false)
		),
})

export const SendAirdropDetailsSchema = yup.object().shape({
	selectedNFTs: yup
		.array()
		.of(yup.object())
		.test('hasRecipientDefined', 'selected-nfts-invalid', value =>
			(value ?? []).every(x => isValidTerraAddress(x.recipient))
		),
})
