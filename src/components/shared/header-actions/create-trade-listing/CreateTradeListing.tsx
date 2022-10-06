import { CreateListingAddIcon } from 'assets/icons/mixed'
import { Button } from 'components/ui'
import React from 'react'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { ConnectButton } from 'components/shared/connect-button'
import { useTranslation } from 'next-i18next'

export default function CreateTradeListing() {
	const { t } = useTranslation(['common'])
	return (
		<Flex sx={{ gap: '8px', height: '40px' }}>
			<Button variant='gradient' size='medium' href={ROUTES.TRADE_CREATE_LISTING}>
				<CreateListingAddIcon />
				<Box sx={{ display: ['none', 'block'], ml: '8px' }}>
					{t('common:create-listing')}
				</Box>
			</Button>
			<ConnectButton />
		</Flex>
	)
}
