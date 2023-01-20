import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon, ModalSuccessCircleIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import { ModalLayoutContainer } from 'components/layout'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Subtitle,
} from './RemoveSuccessModal.styled'

const RemoveSuccessModal = NiceModal.create(() => {
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
							{t('loan-listings:remove-modal.title')}
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
								<Box sx={{ width: '32px', height: '32px' }}>
									<ModalSuccessCircleIcon />
								</Box>
								<Box>
									<Title>{t('loan-listings:remove-modal.removal-successful')}</Title>
									<Subtitle>
										{t('loan-listings:remove-modal.create-listing-suggestion')}
									</Subtitle>
								</Box>
							</Flex>
							<Flex
								sx={{ justifyContent: 'space-between', gap: '12px', marginTop: '24px' }}
							>
								<Button
									variant='secondary'
									fullWidth
									onClick={() => {
										router.push(ROUTES.LOAN_CREATE_LISTING)
										modal.remove()
									}}
								>
									{t('loan-listings:remove-modal.create-new-listing')}
								</Button>
								<Button
									variant='gradient'
									fullWidth
									onClick={() => {
										router.push(ROUTES.DASHBOARD)
										modal.remove()
									}}
								>
									{t('loan-listings:remove-modal.go-to-dashboard')}
								</Button>
							</Flex>
						</ModalBody>
					</ModalContent>
				</ModalLayoutContainer>
			</ModalContainer>
		</Modal>
	)
})
export default RemoveSuccessModal
