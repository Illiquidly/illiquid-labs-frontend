import { ConnectType, useWallet, WalletStatus } from '@illiquid-labs/use-wallet'
import useIsMobile from 'hooks/react/useIsMobile'
import React from 'react'
import { Button } from '../button'

export default function ConnectButton() {
	const { status, connect, disconnect } = useWallet()

	const isMobile = useIsMobile()

	const walletConnected = React.useMemo(
		() => status === WalletStatus.WALLET_CONNECTED,
		[status]
	)

	return (
		<Button
			onClick={() =>
				walletConnected
					? disconnect()
					: connect(isMobile ? ConnectType.WALLETCONNECT : undefined)
			}
			variant='secondary'
			size='medium'
			disabled={status === WalletStatus.INITIALIZING}
		>
			{status === WalletStatus.WALLET_NOT_CONNECTED && 'Connect'}
			{status === WalletStatus.INITIALIZING && 'Initializing...'}
			{status === WalletStatus.WALLET_CONNECTED && 'Disconnect'}
		</Button>
	)
}
