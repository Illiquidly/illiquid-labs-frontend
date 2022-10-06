import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import { CounterTrade } from 'services/api/counterTradesService'
import getShortText from 'utils/js/getShortText'
import { ModalLayoutContainer } from 'components/layout'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Subtitle,
} from './DenySuccessModal.styled'

export interface DenySuccessModalProps {
	counterTrade: CounterTrade
}
const DenySuccessModal = NiceModal.create(
	({ counterTrade }: DenySuccessModalProps) => {
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
								{t('trade-listings:deny-success-modal.title')}
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
								<Box>
									<Title>
										{t('trade-listings:deny-success-modal.answer', {
											username: getShortText(counterTrade?.tradeInfo?.owner ?? '', 8),
										})}
									</Title>
									<Subtitle>{t('trade-listings:deny-success-modal.note')}</Subtitle>
								</Box>
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
											router.push(ROUTES.TRADE_CREATE_LISTING)
											modal.remove()
										}}
									>
										{t('trade-listings:deny-success-modal.view-all-listings')}
									</Button>
									<Button
										variant='gradient'
										fullWidth
										onClick={() => {
											router.push(
												`${ROUTES.TRADE_LISTING_DETAILS}?tradeId=${counterTrade.trade.tradeId}`
											)
											modal.remove()
										}}
									>
										{t('trade-listings:deny-success-modal.go-to-listing')}
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
export default DenySuccessModal
