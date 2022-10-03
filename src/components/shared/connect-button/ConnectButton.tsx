import { ConnectType, useWallet, WalletStatus } from '@terra-money/use-wallet'
import useIsTablet from 'hooks/react/useIsTablet'
import { useTranslation } from 'next-i18next'
import { Button } from '../../ui/button'

export default function ConnectButton() {
	const { status, connect, disconnect } = useWallet()

	const isTablet = useIsTablet()

	const { t } = useTranslation('common')

	return (
		<Button
			onClick={() =>
				status === WalletStatus.WALLET_CONNECTED
					? disconnect()
					: connect(isTablet ? ConnectType.WALLETCONNECT : undefined)
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
