import { ConnectType, useWallet, WalletStatus } from '@terra-money/use-wallet'
import { Button } from 'components/ui'
import useIsTablet from 'hooks/react/useIsTablet'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Flex } from 'theme-ui'
import {
	WatchListCard,
	Title,
	Description,
	WatchListEmptyContainer,
} from './WatchList.styled'

function WatchList() {
	const wallet = useWallet()
	const isTablet = useIsTablet()

	const { t } = useTranslation(['common', 'dashboard'])

	const connectWallet = () => {
		wallet.connect(isTablet ? ConnectType.WALLETCONNECT : undefined)
	}

	return (
		<WatchListCard>
			<WatchListEmptyContainer>
				<Title>{t('dashboard:watch-list.no-watching-any-listings')}</Title>
				<Description>
					{t('dashboard:watch-list.explore-generic-description')}
				</Description>
				<Flex sx={{ mt: '8px' }}>
					{wallet.status === WalletStatus.WALLET_NOT_CONNECTED ? (
						<Button onClick={connectWallet} variant='gradient' size='large'>
							{t('common:connect-wallet')}
						</Button>
					) : (
						<Button variant='gradient' size='large' disabled>
							{t('dashboard:watch-list.explore-generic')}
						</Button>
					)}
				</Flex>
			</WatchListEmptyContainer>
		</WatchListCard>
	)
}

export default WatchList
