import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon, ModalErrorCircleIcon } from 'assets/icons/modal'

import { Button, Modal, TextArea } from 'components/ui'

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
	Label,
	Subtitle,
} from './WithdrawCancelledCounterModal.styled'

export interface WithdrawCancelledCounterModalProps {
	trade: Trade
	counterTrade: CounterTrade
}
const WithdrawCancelledCounterModal = NiceModal.create(
	({ trade, counterTrade }: WithdrawCancelledCounterModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('trade-listings:withdraw-cancelled-counter-modal.title')}
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
										<ModalErrorCircleIcon />
									</Box>
									<Box>
										<Title>
											{t('trade-listings:withdraw-cancelled-counter-modal.answer', {
												username: getShortText(trade.tradeInfo.owner ?? '', 8),
											})}
										</Title>
										<Subtitle>
											{t('trade-listings:withdraw-cancelled-counter-modal.note')}
										</Subtitle>
									</Box>
								</Flex>

								<Flex sx={{ flexDirection: 'column' }}>
									<Label htmlFor='comment'>
										{t('trade-listings:withdraw-cancelled-counter-modal.comment', {
											username: getShortText(trade.tradeInfo.owner ?? '', 8),
										})}
									</Label>
									<TextArea
										id='comment'
										disabled
										value={
											counterTrade?.tradeInfo?.additionalInfo?.traderComment?.comment ?? ''
										}
										style={{ height: '128px' }}
										placeholder={t('trade-listings:deny-counter-offer-modal:enter-text')}
									/>
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
										{t('trade-listings:withdraw-cancelled-counter-modal.back-to-listing')}
									</Button>
									<Button
										variant='gradient'
										fullWidth
										onClick={() => {
											modal.resolve({ counterTrade, trade })
											modal.remove()
										}}
									>
										{t('trade-listings:withdraw-cancelled-counter-modal.withdraw-offer')}
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
export default WithdrawCancelledCounterModal
