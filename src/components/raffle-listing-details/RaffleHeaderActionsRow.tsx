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

interface RaffleHeaderActionsRowProps {
	raffle?: Raffle
}

export const RaffleHeaderActionsRow = ({
	raffle,
}: RaffleHeaderActionsRowProps) => {
	const { raffleInfo } = raffle ?? {}

	const router = useRouter()

	const editDisabled =
		![RAFFLE_STATE.Started].includes(
			(raffleInfo?.state as RAFFLE_STATE) ?? RAFFLE_STATE.Cancelled
		) || (raffle?.participants ?? []).length > 0

	const removeDisabled =
		![RAFFLE_STATE.Started].includes(
			(raffleInfo?.state as RAFFLE_STATE) ?? RAFFLE_STATE.Cancelled
		) || (raffle?.participants ?? []).length > 0

	const myAddress = useAddress()

	const isMyRaffleListing = raffleInfo?.owner === myAddress

	// const handleEditClick = async () => {
	// if (!raffle) {
	// 	return
	// }
	// const initialComment = raffleOptions?.comment ?? ''
	// const [, result] = await asyncAction<EditModalResult>(
	// 	NiceModal.show(EditModal, {
	// 		initialComment,
	// 	})
	// )
	// if (result) {
	// 	const { newTokensWanted, newNFTsWanted, comment } =
	// 		fromUpdateTradeToBlockchain(result)
	// 	const response = await NiceModal.show(TxBroadcastingModal, {
	// 		transactionAction: updateTrade(
	// 			trade.tradeId,
	// 			comment,
	// 			newTokensWanted,
	// 			newNFTsWanted
	// 		),
	// 		closeOnFinish: true,
	// 	})
	// 	if (response) {
	// 		await queryClient.invalidateQueries([TRADE])
	// 	}
	// }
	// }

	// const handleRemoveClick = async () => {
	// 	if (!raffle) {
	// 		return
	// 	}
	// 	const [, result] = await asyncAction<RemoveModalProps>(
	// 		NiceModal.show(RemoveModal, {
	// 			tradeId: trade.tradeId,
	// 		})
	// 	)

	// 	if (result) {
	// 		const cancelTradeResponse = await NiceModal.show(TxBroadcastingModal, {
	// 			transactionAction: cancelAndWithdrawTrade(Number(result.tradeId)),
	// 			closeOnFinish: true,
	// 		})

	// 		if (cancelTradeResponse) {
	// 			await queryClient.invalidateQueries([TRADE])
	// 		}

	// 		if (cancelTradeResponse) {
	// 			NiceModal.show(RemoveSuccessModal, {
	// 				tradeId: trade.tradeId,
	// 			})
	// 		}
	// 	}
	// }

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
					<IconButton disabled={editDisabled}>
						<PenOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:edit')}
						</Box>
					</IconButton>
					<IconButton disabled={removeDisabled}>
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
