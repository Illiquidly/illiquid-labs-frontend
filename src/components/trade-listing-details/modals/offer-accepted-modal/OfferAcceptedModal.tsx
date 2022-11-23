import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon, ModalSuccessCircleIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import { CounterTrade } from 'services/api/counterTradesService'
import getShortText from 'utils/js/getShortText'
import { ModalLayoutContainer } from 'components/layout'
import { Trade } from 'services/api/tradesService'

import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
} from './OfferAcceptedModal.styled'

export interface OfferAcceptedModalProps {
	trade: Trade
	counterTrade: CounterTrade
}
const OfferAcceptedModal = NiceModal.create(
	({ counterTrade }: OfferAcceptedModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		const router = useRouter()

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('trade-listings:offer-accepted-modal.title')}
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
											{t('trade-listings:offer-accepted-modal.answer', {
												username: getShortText(counterTrade?.tradeInfo?.owner ?? '', 8),
											})}
										</Title>
									</Box>
								</Flex>

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
											modal.remove()
										}}
									>
										{t('trade-listings:offer-accepted-modal.back-to-listing')}
									</Button>
									<Button
										variant='gradient'
										fullWidth
										onClick={() => {
											router.push(ROUTES.DASHBOARD)
											modal.remove()
										}}
									>
										{t('trade-listings:offer-accepted-modal.go-to-dashboard')}
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
export default OfferAcceptedModal
