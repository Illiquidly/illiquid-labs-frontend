import { CreateListingAddIcon } from 'assets/icons/mixed'
import React from 'react'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { ConnectButton } from 'components/shared/header-actions/connect-button'
import { useTranslation } from 'next-i18next'
import { useWallet, WalletStatus } from '@terra-money/use-wallet'
import { LinkButton } from 'components/link'
import { NotificationsBell } from 'components/shared/header-actions/notifications-bell'

export default function CreateLoanListing() {
	const { t } = useTranslation(['common'])
	const wallet = useWallet()
	return (
		<Flex sx={{ gap: '8px', height: '40px' }}>
			<Box sx={{ display: ['none', 'block'] }}>
				<NotificationsBell />
			</Box>
			{wallet.status === WalletStatus.WALLET_CONNECTED && (
				<LinkButton
					variant='gradient'
					size='medium'
					href={ROUTES.LOAN_CREATE_LISTING}
					sx={{
						padding: ['11.75px', '10px 16px'],
					}}
				>
					<CreateListingAddIcon />

					<Box sx={{ display: ['none', 'block'], ml: '8px' }}>
						{t('common:create-listing')}
					</Box>
				</LinkButton>
			)}
			<ConnectButton />
		</Flex>
	)
}
