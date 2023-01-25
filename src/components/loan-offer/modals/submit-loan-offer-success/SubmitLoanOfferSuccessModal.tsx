import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon, ModalSuccessCircleIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import getShortText from 'utils/js/getShortText'
import { ModalLayoutContainer } from 'components/layout'
import { Loan } from 'services/api/loansService'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Subtitle,
} from './SubmitLoanOfferSuccessModal.styled'

export interface SubmitLoanOfferSuccessModalProps {
	loan: Loan
}

const SubmitLoanOfferSuccessModal = NiceModal.create(
	({ loan }: SubmitLoanOfferSuccessModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'loan-listings'])

		const theme = useTheme()

		const router = useRouter()

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('loan-listings:submit-loan-offer-success-modal.title')}
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
							<ModalBody>
								<Flex sx={{ gap: '8px' }}>
									<Box sx={{ minWidth: '32px', minHeight: '32px' }}>
										<ModalSuccessCircleIcon />
									</Box>
									<Box>
										<Title>
											{t('loan-listings:submit-loan-offer-success-modal.question', {
												username: getShortText(loan?.borrower ?? '', 8),
											})}
										</Title>
										<Subtitle>
											{t('loan-listings:submit-loan-offer-success-modal.note')}
										</Subtitle>
									</Box>
								</Flex>
								<Box />
								<Flex
									sx={{
										justifyContent: 'space-between',
										gap: '12px',
										marginTop: '24px',
									}}
								>
									<Button
										variant='secondary'
										fullWidth
										onClick={() => {
											router.push(ROUTES.LOAN_LISTINGS)
											modal.remove()
										}}
									>
										{t('loan-listings:submit-loan-offer-success-modal.view-all-listings')}
									</Button>
									<Button
										variant='gradient'
										fullWidth
										onClick={() => {
											router.push(
												`${ROUTES.LOAN_LISTING_DETAILS}?loanId=${loan.loanId}&borrower=${loan.borrower}`
											)
											modal.remove()
										}}
									>
										{t('loan-listings:submit-loan-offer-success-modal.go-to-listing')}
									</Button>
								</Flex>
							</ModalBody>
						</ModalContent>
					</ModalLayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default SubmitLoanOfferSuccessModal
