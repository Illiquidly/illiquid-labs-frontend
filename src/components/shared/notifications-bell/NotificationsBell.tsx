import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { NotificationOutlineIcon } from 'assets/icons/20ptOutline'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import { Button } from 'components/ui'
import NotificationCard from 'components/ui/notifications-card/NotificationCard'
import { HEADER_HEIGHT } from 'constants/components'
import { NOTIFICATIONS } from 'constants/use-query-keys'
import useAddress from 'hooks/useAddress'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import { TradeNotificationsService } from 'services/api'
import { TRADE_NOTIFICATION_TYPE } from 'services/api/tradeNotificationsService'
import { Box } from 'theme-ui'
import * as ROUTES from 'constants/routes'

export default function NotificationsBell() {
	const wallet = useWallet()
	const myAddress = useAddress()
	const router = useRouter()
	const { t } = useTranslation(['common'])

	const { data } = useQuery(
		[NOTIFICATIONS],
		async () =>
			TradeNotificationsService.getTradeNotifications(
				wallet.network.name,
				{
					user: myAddress,
				},
				{
					page: 1,
					limit: 30,
				}
			),
		{
			enabled: !!wallet.network.name && !!myAddress,
			retry: true,
		}
	)

	const getNotificationMessageFromType = (type: TRADE_NOTIFICATION_TYPE) => {
		const messages = {
			[TRADE_NOTIFICATION_TYPE.NewCounterTrade]: t(
				'common:new-counter-trade-message'
			),
			[TRADE_NOTIFICATION_TYPE.CounterTradeReview]: t(
				'common:counter-trade-review-message'
			),
			[TRADE_NOTIFICATION_TYPE.CounterTradeAccepted]: t(
				'common:counter-trade-accepted-message'
			),
			[TRADE_NOTIFICATION_TYPE.OtherCounterTradeAccepted]: t(
				'common:other-counter-trade-accepted'
			),
			[TRADE_NOTIFICATION_TYPE.TradeCancelled]: t(
				'common:trade-cancelled-message'
			),
			[TRADE_NOTIFICATION_TYPE.RefuseCounterTrade]: t(
				'common:refuse-counter-trade-message'
			),
		}

		const actionMessages = {
			[TRADE_NOTIFICATION_TYPE.NewCounterTrade]: t(
				'common:new-counter-trade-action-message'
			),
			[TRADE_NOTIFICATION_TYPE.CounterTradeReview]: t(
				'common:counter-trade-review-action-message'
			),
			[TRADE_NOTIFICATION_TYPE.CounterTradeAccepted]: t(
				'common:counter-trade-accepted-action-message'
			),
			[TRADE_NOTIFICATION_TYPE.OtherCounterTradeAccepted]: t(
				'common:other-counter-trade-action-accepted'
			),
			[TRADE_NOTIFICATION_TYPE.TradeCancelled]: t(
				'common:trade-cancelled-action-message'
			),
			[TRADE_NOTIFICATION_TYPE.RefuseCounterTrade]: t(
				'common:refuse-counter-trade-action-message'
			),
		}

		return {
			message: messages[type] ?? '',
			actionMessage: actionMessages[type] ?? '',
		}
	}

	const [expanded, setExpanded] = React.useState(false)

	return (
		<Box sx={{ position: 'relative' }}>
			<Button
				onClick={() => setExpanded(prevExpanded => !prevExpanded)}
				variant='secondary'
				sx={{ padding: '10px' }}
			>
				<NotificationOutlineIcon />
			</Button>
			{expanded && (
				<Box
					sx={{
						position: ['fixed', 'absolute'],
						top: [`calc(${HEADER_HEIGHT} - 8px)`, 'unset'],
						left: [0, 'unset'],
						right: [0, 'unset'],
						width: ['unset', '341px', '341px'],
						margin: ['0 16px', '4px 0'],
					}}
				>
					<NotificationCard
						onNotificationClick={({ tradeId }) =>
							router.push(`${ROUTES.TRADE_LISTING_DETAILS}?tradeId=${tradeId}`)
						}
						title={t('common:notifications')}
						newNotificationsTitle={t('common:new')}
						oldNotificationsTitle={t('common:older')}
						oldNotifications={[]}
						newNotifications={(data?.data ?? []).map(
							({
								id,
								tradeId,
								notificationPreview,
								notificationType,
								time,
								status,
							}) => {
								const { message, actionMessage } =
									getNotificationMessageFromType(notificationType)
								return {
									id,
									data: { tradeId },
									timeDescription: moment(time).fromNow(),
									status,
									message,
									actionMessage,
									imageUrl: notificationPreview?.cw721Coin?.imageUrl ?? [],
									typeBadge: {
										icon: <TradeIcon width='15px' height='17px' color='#fff' />,
										background: 'linear-gradient(135deg, #61EA77 0%, #22BB28 100%)',
									},
								}
							}
						)}
					/>
				</Box>
			)}
		</Box>
	)
}
