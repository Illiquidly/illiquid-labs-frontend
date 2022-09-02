import { ConnectType, useWallet, WalletStatus } from '@terra-money/use-wallet'
import { useTranslation } from 'next-i18next'
import useIsMobile from 'hooks/react/useIsMobile'
import React from 'react'
import { Button } from '../button'

export default function ConnectButton() {
	const { status, connect, disconnect } = useWallet()

	const isMobile = useIsMobile()

	const { t } = useTranslation('common')

	return (
		<Button
			onClick={() =>
				status === WalletStatus.WALLET_CONNECTED
					? disconnect()
					: connect(isMobile ? ConnectType.WALLETCONNECT : undefined)
			}
			variant='secondary'
			size='medium'
			disabled={status === WalletStatus.INITIALIZING}
		>
			{status === WalletStatus.WALLET_NOT_CONNECTED && t('connect')}
			{status === WalletStatus.INITIALIZING && t('initializing')}
			{status === WalletStatus.WALLET_CONNECTED && t('disconnect')}
		</Button>
	)
}
