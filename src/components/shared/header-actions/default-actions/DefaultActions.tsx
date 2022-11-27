import React from 'react'
import { Flex } from 'theme-ui'
import { NotificationsBell } from '../notifications-bell'

import { Profile } from '../profile'

export default function DefaultActions() {
	return (
		<Flex sx={{ gap: ['6px', '8px'] }}>
			<NotificationsBell />
			<Profile />
		</Flex>
	)
}
