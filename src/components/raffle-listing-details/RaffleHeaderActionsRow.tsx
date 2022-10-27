import React from 'react'
import { useTranslation } from 'next-i18next'

import { Box, Flex } from 'theme-ui'
import { IconButton } from 'components/trade-listing-details'
import * as ROUTES from 'constants/routes'
import { TwitterShareButton } from 'react-share'
import {
	DeleteOutlineIcon,
	PenOutlineIcon,
	ShareOutlineIcon,
	ArrowLeftIcon,
} from 'assets/icons/mixed'

import { useRouter } from 'next/router'
import { noop } from 'lodash'
import useAddress from 'hooks/useAddress'
import { LinkButton } from 'components/link'
import { Raffle, RAFFLE_STATE } from 'services/api/rafflesService'
import { asyncAction } from 'utils/js/asyncAction'
import NiceModal from '@ebay/nice-modal-react'
import { TxBroadcastingModal } from 'components/shared'
import { RafflesContract } from 'services/blockchain'
import { useQueryClient } from '@tanstack/react-query'
import { RAFFLE } from 'constants/use-query-keys'
import moment from 'moment'
import RemoveModal, {
	RemoveModalProps,
} from './modals/remove-modal/RemoveModal'
import RemoveSuccessModal from './modals/remove-success-modal/RemoveSuccessModal'
import EditModal, { EditModalResult } from './modals/edit-modal/EditModal'

interface RaffleHeaderActionsRowProps {
	raffle?: Raffle
}

export const RaffleHeaderActionsRow = ({
	raffle,
}: RaffleHeaderActionsRowProps) => {
	const { raffleInfo } = raffle ?? {}
	const { raffleOptions } = raffleInfo ?? {}

	const router = useRouter()

	const queryClient = useQueryClient()

	const editDisabled =
		[RAFFLE_STATE.Cancelled].includes(raffleInfo?.state as RAFFLE_STATE) ||
		(raffle?.participants ?? []).length > 0

	const removeDisabled =
		[RAFFLE_STATE.Cancelled].includes(raffleInfo?.state as RAFFLE_STATE) ||
		(raffle?.participants ?? []).length > 0

	const myAddress = useAddress()

	const isMyRaffleListing = raffleInfo?.owner === myAddress

	const handleEditClick = async () => {
		if (!raffle) {
			return
		}

		const initialEnd = moment(raffleOptions?.raffleStartDate).add(
			raffleOptions?.raffleDuration ?? 0,
			'seconds'
		)

		const startDate = moment(raffleOptions?.raffleStartDate).toDate()

		const initialComment = raffleOptions?.comment ?? ''
		const initialEndDate = initialEnd.toDate()
		const initialEndTime = initialEnd.toDate()
		const initialTicketSupply = `${raffleOptions?.maxParticipantNumber ?? 0}`

		const initialTicketPrice = `${
			raffle?.raffleInfo?.raffleTicketPrice?.coin?.amount ??
			raffle?.raffleInfo?.raffleTicketPrice?.cw20Coin?.amount
		}`

		const initialTicketPriceCurrency = 'Luna'

		const [, result] = await asyncAction<EditModalResult>(
			NiceModal.show(EditModal, {
				initialComment,
				initialEndDate,
				initialEndTime,
				initialTicketSupply,
				initialTicketPrice,
				initialTicketPriceCurrency,
			})
		)
		if (result) {
			const {
				endDate,
				endTime,
				ticketSupply,
				comment,
				ticketPrice,
				ticketPriceCurrency = 'Luna',
			} = result

			const end = moment(
				`${moment(endDate).format('YYYY-MM-DD')} ${moment(endTime).format('HH:mm')}`
			)

			const duration = moment.duration(end.diff(startDate))

			const response = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: RafflesContract.modifyRaffleListing(
					raffle.raffleId,
					{
						maxParticipantNumber: +(ticketSupply ?? 0),
						raffleDuration: Math.floor(duration.asSeconds()),
						comment,
					},
					Number(ticketPrice),
					ticketPriceCurrency
				),
				closeOnFinish: true,
			})

			if (response) {
				await queryClient.invalidateQueries([RAFFLE])
			}
		}
	}

	const handleRemoveClick = async () => {
		if (!raffle) {
			return
		}
		const [, result] = await asyncAction<RemoveModalProps>(
			NiceModal.show(RemoveModal, {
				raffleId: raffle.raffleId,
			})
		)

		if (result) {
			const cancelRaffleResponse = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: RafflesContract.cancelRaffleListing(
					Number(result.raffleId)
				),
				closeOnFinish: true,
			})

			if (cancelRaffleResponse) {
				await queryClient.invalidateQueries([RAFFLE])

				NiceModal.show(RemoveSuccessModal)
			}
		}
	}

	const { t } = useTranslation(['common', 'raffle-listings'])

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: ''

	return (
		<Flex
			sx={{
				mt: ['12.5px', '24px', '22px'],
				flex: 1,
				justifyContent: 'space-between',
			}}
		>
			<Flex
				sx={{
					justifyContent: 'flex-start',
				}}
			>
				<LinkButton
					href={ROUTES.RAFFLE_LISTINGS}
					sx={{ height: '40px', padding: '13px' }}
					variant='secondary'
					startIcon={<ArrowLeftIcon />}
				>
					{t('raffle-listings:back-to-listings')}
				</LinkButton>
			</Flex>
			{isMyRaffleListing && (
				<Flex
					sx={{
						gap: '6px',
						justifyContent: 'flex-end',
					}}
				>
					<IconButton disabled={editDisabled} onClick={handleEditClick}>
						<PenOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:edit')}
						</Box>
					</IconButton>
					<IconButton disabled={removeDisabled} onClick={handleRemoveClick}>
						<DeleteOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:remove')}
						</Box>
					</IconButton>
					<TwitterShareButton
						title={t('common:checkout-my-raffle')}
						url={`${origin}${router.asPath}`}
					>
						<IconButton onClick={noop}>
							<ShareOutlineIcon />
							<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
								{t('common:share')}
							</Box>
						</IconButton>
					</TwitterShareButton>
				</Flex>
			)}
		</Flex>
	)
}

RaffleHeaderActionsRow.defaultProps = {
	raffle: undefined,
}

export default RaffleHeaderActionsRow
