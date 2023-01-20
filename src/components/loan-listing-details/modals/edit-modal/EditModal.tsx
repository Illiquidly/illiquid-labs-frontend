import React from 'react'
import { Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextAreaField, TextInputField, TokenInputField } from 'components/form'
import { ModalLayoutContainer } from 'components/layout'

import { LoanDetailsStepSchema } from 'constants/validation-schemas/loan'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	ModalActions,
} from './EditModal.styled'

export interface EditModalProps {
	initialTokenAmount: string
	initialTokenName: string
	initialInterestRate: number
	initialLoanPeriod: number
	initialComment?: string
}

export interface EditModalResult {
	tokenAmount: string
	tokenName: string
	interestRate: number
	loanPeriod: number
	comment?: string
}

export interface EditModalPropsState {
	tokenAmount: string
	tokenName: string
	interestRate: number
	loanPeriod: number
	comment?: string
}

const EditModal = NiceModal.create(
	({
		initialTokenAmount,
		initialTokenName,
		initialInterestRate,
		initialLoanPeriod,
		initialComment,
	}: EditModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'loan-listings'])

		const theme = useTheme()

		const formMethods = useForm<EditModalPropsState>({
			mode: 'all',
			resolver: yupResolver(LoanDetailsStepSchema),
			defaultValues: {
				tokenAmount: initialTokenAmount,
				tokenName: initialTokenName,
				interestRate: initialInterestRate,
				loanPeriod: initialLoanPeriod,
				comment: initialComment,
			},
		})

		const {
			register,
			getValues,
			formState: { errors },
		} = formMethods

		const onSubmit = ({
			tokenAmount,
			tokenName,
			interestRate,
			loanPeriod,
			comment,
		}: EditModalPropsState) => {
			modal.resolve({
				tokenAmount,
				tokenName,
				interestRate,
				loanPeriod,
				comment,
			} as EditModalResult)
			modal.remove()
		}

		return (
			<Modal
				disableDismissOnOutsideClick
				isOverHeader
				isOpen={modal.visible}
				onCloseModal={modal.remove}
			>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('loan-listings:edit-modal.title')}
								<IconButton
									sx={{
										borderRadius: '32px',
										backgroundColor: theme.colors.dark500,
									}}
									onClick={modal.remove}
								>
									<ModalCloseIcon />
								</IconButton>
							</ModalHeader>
							<FormProvider {...formMethods}>
								<form onSubmit={formMethods.handleSubmit(onSubmit)}>
									<ModalBody>
										<TokenInputField
											label={t('loan-listings:edit-modal.token-label')}
											id='tokenAmount'
											{...register('tokenAmount')}
											fieldError={
												errors.tokenAmount &&
												t(`common:errors.${errors.tokenAmount.message}`)
											}
											type='number'
											error={!!errors.tokenAmount}
											placeholder={t('loan-listings:edit-modal.tokens-placeholder', {
												token: getValues('tokenName'),
											})}
											tokenName={getValues('tokenName')}
										/>

										<Flex sx={{ flexDirection: ['column', 'row'], gap: [0, '16px'] }}>
											<TextInputField
												label={t('loan-listings:edit-modal.interest-rate-label')}
												id='interestRate'
												{...register('interestRate')}
												fieldError={
													errors.interestRate &&
													t(`common:errors.${errors?.interestRate?.message}`)
												}
												type='number'
												iconRight={<div>%</div>}
												error={!!errors.interestRate}
												placeholder={t(
													'loan-listings:edit-modal.interest-rate-placeholder'
												)}
											/>

											<TextInputField
												label={t('loan-listings:edit-modal.loan-period-label')}
												id='loanPeriod'
												{...register('loanPeriod')}
												type='number'
												fieldError={
													errors.loanPeriod &&
													t(`common:errors.${errors?.loanPeriod?.message}`)
												}
												error={!!errors.loanPeriod}
												placeholder={t('loan-listings:edit-modal.loan-period-placeholder')}
											/>
										</Flex>

										<TextAreaField
											label={t('loan-listings:edit-modal:write-comment')}
											id='comment'
											style={{ height: '128px' }}
											{...register('comment')}
											placeholder={t('loan-listings:edit-modal:write-comment')}
										/>
										<ModalActions>
											<Button variant='secondary' fullWidth onClick={modal.remove}>
												{t('loan-listings:edit-modal.discard-changes')}
											</Button>
											<Button variant='gradient' fullWidth type='submit'>
												{t('loan-listings:edit-modal.update-listing')}
											</Button>
										</ModalActions>
									</ModalBody>
								</form>
							</FormProvider>
						</ModalContent>
					</ModalLayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default EditModal
