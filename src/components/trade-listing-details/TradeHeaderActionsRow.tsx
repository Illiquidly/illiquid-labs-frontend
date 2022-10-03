import React from 'react'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/ui'
import { Box, Flex } from 'theme-ui'
import NiceModal from '@ebay/nice-modal-react'
import { IconButton } from 'components/trade-listing-details'
import * as ROUTES from 'constants/routes'
import { TwitterShareButton } from 'react-share'
import {
	DeleteOutlineIcon,
	PenOutlineIcon,
	ShareOutlineIcon,
	ArrowLeftIcon,
} from 'assets/icons/mixed'
import {
	EditModal,
	RemoveModal,
	EditModalResult,
	RemoveModalProps,
	RemoveSuccessModal,
} from 'components/trade-listing-details/modals'
import { asyncAction } from 'utils/js/asyncAction'

import { fromUpdateTradeToBlockchain } from 'utils/mappers/fromUpdateTradeToBlockchain'

import {
	cancelAndWithdrawTrade,
	TRADE_STATE,
	updateTrade,
} from 'services/blockchain'
import { Trade } from 'services/api/tradesService'
import { useWallet } from '@terra-money/use-wallet'
import { useRouter } from 'next/router'
import { noop } from 'lodash'
import { TxBroadcastingModal } from 'components/shared'

interface TradeHeaderActionsRowProps {
	trade?: Trade
}

export const TradeHeaderActionsRow = ({
	trade,
}: TradeHeaderActionsRowProps) => {
	const { tradeInfo } = trade ?? {}

	const wallet = useWallet()

	const router = useRouter()

	const editDisabled = ![
		TRADE_STATE.Published,
		TRADE_STATE.Countered,
		TRADE_STATE.Created,
	].includes((tradeInfo?.state as TRADE_STATE) ?? TRADE_STATE.Cancelled)

	const removeDisabled = ![
		TRADE_STATE.Published,
		TRADE_STATE.Countered,
		TRADE_STATE.Created,
	].includes((tradeInfo?.state as TRADE_STATE) ?? TRADE_STATE.Cancelled)

	const myAddress = wallet.wallets[0]?.terraAddress ?? ''

	const isMyTradeListing = tradeInfo?.owner === myAddress

	const handleEditClick = async () => {
		if (!trade) {
			return
		}
		const initialLookingFor = tradeInfo?.additionalInfo?.lookingFor ?? []
		const initialComment = tradeInfo?.additionalInfo?.ownerComment?.comment ?? ''

		const [, result] = await asyncAction<EditModalResult>(
			NiceModal.show(EditModal, {
				initialLookingFor,
				initialComment,
			})
		)

		if (result) {
			const { newTokensWanted, newNFTsWanted, comment } =
				fromUpdateTradeToBlockchain(result)

			const response = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: updateTrade(
					trade.tradeId,
					comment,
					newTokensWanted,
					newNFTsWanted
				),
			})

			// TODO refetch trade
			console.warn(response)
		}
	}

	const handleRemoveClick = async () => {
		if (!trade) {
			return
		}
		const [, result] = await asyncAction<RemoveModalProps>(
			NiceModal.show(RemoveModal, {
				tradeId: trade.tradeId,
			})
		)

		if (result) {
			const cancelTradeResponse = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: cancelAndWithdrawTrade(Number(result.tradeId)),
			})

			if (cancelTradeResponse) {
				NiceModal.show(RemoveSuccessModal, {
					tradeId: trade.tradeId,
				})
			}
		}
	}

	const { t } = useTranslation(['common', 'trade-listings'])

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
				<Button
					href={ROUTES.TRADE_LISTINGS}
					sx={{ height: '40px', padding: '13px' }}
					variant='secondary'
					startIcon={<ArrowLeftIcon />}
				>
					{t('trade-listings:back-to-listings')}
				</Button>
			</Flex>
			{isMyTradeListing && (
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
						title={t('common:checkout-my-trade')}
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

TradeHeaderActionsRow.defaultProps = {
	trade: undefined,
}

export default TradeHeaderActionsRow
