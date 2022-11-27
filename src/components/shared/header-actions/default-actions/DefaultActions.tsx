import React from 'react'
import { Box, Flex } from 'theme-ui'
import { ConnectButton } from 'components/shared/header-actions/connect-button'

import { NotificationsBell } from 'components/shared/header-actions/notifications-bell'

export default function DefaultActions() {
	return (
		<Flex sx={{ gap: '8px', height: '40px' }}>
			<Box sx={{ display: ['none', 'block'] }}>
				<NotificationsBell />
			</Box>

			<ConnectButton />
		</Flex>
	)
}
