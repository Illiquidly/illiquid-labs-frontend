import { CreateListingAddIcon } from 'assets/icons/mixed'
import { Button } from 'components/ui'
import React from 'react'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { ConnectButton } from 'components/shared/connect-button'
import { useTranslation } from 'next-i18next'
import { useWallet, WalletStatus } from '@terra-money/use-wallet'

export default function CreateTradeListing() {
	const { t } = useTranslation(['common'])
	const wallet = useWallet()
	return (
		<Flex sx={{ gap: '8px', height: '40px' }}>
			{wallet.status === WalletStatus.WALLET_CONNECTED && (
				<Button variant='gradient' size='medium' href={ROUTES.TRADE_CREATE_LISTING}>
					<CreateListingAddIcon />

					<Box sx={{ display: ['none', 'block'], ml: '8px' }}>
						{t('common:create-listing')}
					</Box>
				</Button>
			)}
			<ConnectButton />
		</Flex>
	)
}
