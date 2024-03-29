import { CreateListingAddIcon } from 'assets/icons/mixed'
import React from 'react'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { useTranslation } from 'next-i18next'
import { useWallet, WalletStatus } from '@terra-money/wallet-kit'
import { LinkButton } from 'components/link'
import { OverflowTip } from 'components/ui'
import { NotificationsBell } from '../notifications-bell'
import { Profile } from '../profile'

export default function CreateTradeListing() {
	const { t } = useTranslation(['common'])
	const wallet = useWallet()

	return (
		<Flex sx={{ gap: ['6px', '8px'] }}>
			<Profile />
			<NotificationsBell />
			{wallet.status === WalletStatus.CONNECTED && (
				<LinkButton
					variant='gradient'
					size='medium'
					href={ROUTES.TRADE_CREATE_LISTING}
					sx={{
						padding: ['11.75px', '10px 16px'],
					}}
				>
					<CreateListingAddIcon />

					<OverflowTip>
						<Box sx={{ display: ['none', 'block'], ml: '8px' }}>
							{t('common:create-listing')}
						</Box>
					</OverflowTip>
				</LinkButton>
			)}
		</Flex>
	)
}
