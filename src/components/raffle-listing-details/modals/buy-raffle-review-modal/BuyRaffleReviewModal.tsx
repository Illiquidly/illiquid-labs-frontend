import React from 'react'
import { Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import { ModalLayoutContainer } from 'components/layout'
import { Raffle } from 'services/api/rafflesService'
import moment from 'moment'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	DescriptionCard,
	DescriptionCardLabel,
	DescriptionCardContent,
} from './BuyRaffleReviewModal.styled'

export interface BuyRaffleReviewModalProps {
	raffle: Raffle
	ticketNumber: number
}

const BuyRaffleReviewModal = NiceModal.create(
	({ raffle, ticketNumber }: BuyRaffleReviewModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'raffle-listings'])

		const theme = useTheme()

		const endsIn = moment(raffle?.raffleInfo?.raffleOptions?.raffleStartDate).add(
			raffle?.raffleInfo?.raffleOptions?.raffleDuration ?? 0,
			'seconds'
		)

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('raffle-listings:buy-raffle-review-modal.title')}
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
								<Flex sx={{ flexDirection: 'column', gap: '12px' }}>
									<DescriptionCard>
										<DescriptionCardLabel>
											{t('raffle-listings:buy-raffle-review-modal.raffle-start-date')}
										</DescriptionCardLabel>
										<DescriptionCardContent>
											{moment(
												raffle?.raffleInfo?.raffleOptions?.raffleStartDate
											).toLocaleString()}
										</DescriptionCardContent>
									</DescriptionCard>

									<DescriptionCard>
										<DescriptionCardLabel>
											{t('raffle-listings:buy-raffle-review-modal.raffle-ends-in')}
										</DescriptionCardLabel>
										<DescriptionCardContent>{endsIn.fromNow()}</DescriptionCardContent>
									</DescriptionCard>

									<DescriptionCard>
										<DescriptionCardLabel>
											{t('raffle-listings:buy-raffle-review-modal.amount-of-tickets')}
										</DescriptionCardLabel>
										<DescriptionCardContent>
											{t('raffle-listings:buy-raffle-review-modal.tickets', {
												count: ticketNumber,
											})}
										</DescriptionCardContent>
									</DescriptionCard>

									<DescriptionCard>
										<DescriptionCardLabel>
											{t('raffle-listings:buy-raffle-review-modal.ticket-cost')}
										</DescriptionCardLabel>
										<DescriptionCardContent>
											{`${
												raffle?.raffleInfo?.raffleTicketPrice?.coin?.amount ??
												raffle?.raffleInfo?.raffleTicketPrice?.cw20Coin?.amount ??
												0
											} ${
												raffle?.raffleInfo?.raffleTicketPrice?.coin?.currency ??
												raffle?.raffleInfo?.raffleTicketPrice?.cw20Coin?.currency
											}`}
										</DescriptionCardContent>
									</DescriptionCard>

									<DescriptionCard>
										<DescriptionCardLabel>
											{t('raffle-listings:buy-raffle-review-modal.total-cost')}
										</DescriptionCardLabel>
										<DescriptionCardContent>
											{`${
												Number(
													raffle?.raffleInfo?.raffleTicketPrice?.coin?.amount ??
														raffle?.raffleInfo?.raffleTicketPrice?.cw20Coin?.amount ??
														0
												) * ticketNumber
											} ${
												raffle?.raffleInfo?.raffleTicketPrice?.coin?.currency ??
												raffle?.raffleInfo?.raffleTicketPrice?.cw20Coin?.currency
											}`}
										</DescriptionCardContent>
									</DescriptionCard>
								</Flex>
								<Flex>
									<Button
										variant='gradient'
										fullWidth
										onClick={() => {
											modal.resolve()
											modal.remove()
										}}
									>
										{t('raffle-listings:buy-raffle-review-modal.buy-ticket')}
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
export default BuyRaffleReviewModal
