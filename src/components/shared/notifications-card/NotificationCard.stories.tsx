import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import React from 'react'
import { Flex } from 'theme-ui'
import NotificationCard from './NotificationCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Notifications Card',
	component: NotificationCard,
}

export const NotificationCardExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: '343px' }}>
			<NotificationCard
				title='Notification'
				newNotificationsTitle='New'
				oldNotificationsTitle='Older'
				newNotifications={[
					{
						id: 1,
						data: { id: '1' },
						timeDescription: '2 minutes ago',
						status: 'unread',
						message: 'You received an offer on your NFT.',
						actionMessage: 'Reply to the offer to make the deal.',
						imageUrl: [
							'https://res.cloudinary.com/dbsyktgpl/image/upload/c_limit,h_550,q_80/aXBmczovL1FtUTk2WjVBalZuRkRNSnd5VFUzTWZEQUVucG5uMnphaDRkU2dGYmhEWmV0M0I%3D',
						],
						typeBadge: {
							icon: <TradeIcon width='15px' height='17px' color='#fff' />,
							background: 'linear-gradient(135deg, #61EA77 0%, #22BB28 100%)',
						},
					},
					{
						id: 2,
						data: { id: '2' },
						timeDescription: '2 minutes ago',
						status: 'unread',
						message: 'You received an offer on your NFT.',
						actionMessage: 'Reply to the offer to make the deal.',
						imageUrl: [
							'https://res.cloudinary.com/dbsyktgpl/image/upload/c_limit,h_550,q_80/aXBmczovL1FtUTk2WjVBalZuRkRNSnd5VFUzTWZEQUVucG5uMnphaDRkU2dGYmhEWmV0M0I%3D',
						],
						typeBadge: {
							icon: <TradeIcon width='15px' height='17px' color='#fff' />,
							background: 'linear-gradient(135deg, #61EA77 0%, #22BB28 100%)',
						},
					},
					{
						id: 3,
						data: { id: '3' },
						timeDescription: '2 minutes ago',
						status: 'unread',
						message: 'You received an offer on your NFT.',
						actionMessage: 'Reply to the offer to make the deal.',
						imageUrl: [
							'https://res.cloudinary.com/dbsyktgpl/image/upload/c_limit,h_550,q_80/aXBmczovL1FtUTk2WjVBalZuRkRNSnd5VFUzTWZEQUVucG5uMnphaDRkU2dGYmhEWmV0M0I%3D',
						],
						typeBadge: {
							icon: <TradeIcon width='15px' height='17px' color='#fff' />,
							background: 'linear-gradient(135deg, #61EA77 0%, #22BB28 100%)',
						},
					},
				]}
				oldNotifications={[]}
				onNotificationClick={e => console.warn(e)}
			/>
		</Flex>
	)
}
