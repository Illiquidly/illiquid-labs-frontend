import NiceModal from '@ebay/nice-modal-react'
import { useWallet, WalletStatus } from '@terra-money/wallet-kit'
import { LinkButton } from 'components/link'
import { Button } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import WatchListTradeAsset from 'assets/images/WatchListTradeAsset'
import { ConnectWalletModal } from 'components/shared/modals/connect-wallet-modal/ConnectWalletModal'
import {
	WatchListCard,
	Title,
	Description,
	WatchListEmptyContainer,
	WatchListAssetImageContainer,
} from './WatchList.styled'

function WatchListTrade() {
	const wallet = useWallet()

	const { t } = useTranslation(['common', 'dashboard'])

	const connectWallet = () => {
		NiceModal.show(ConnectWalletModal)
	}

	return (
		<WatchListCard>
			<WatchListEmptyContainer>
				<Flex sx={{ gap: ['12px'], flexDirection: 'column' }}>
					<Title>{t('dashboard:watch-list.no-watching-any-listings')}</Title>
					<Description>
						{t('dashboard:watch-list.explore-generic-description')}
					</Description>
					<Flex sx={{ mt: '8px' }}>
						{wallet.status === WalletStatus.NOT_CONNECTED ? (
							<Button onClick={connectWallet} variant='gradient' size='large'>
								{t('common:connect-wallet')}
							</Button>
						) : (
							<LinkButton variant='gradient' size='large' href={ROUTES.TRADE_LISTINGS}>
								{t('dashboard:watch-list.explore-generic')}
							</LinkButton>
						)}
					</Flex>
				</Flex>
			</WatchListEmptyContainer>
			<WatchListAssetImageContainer>
				<WatchListTradeAsset />
			</WatchListAssetImageContainer>
		</WatchListCard>
	)
}

export default WatchListTrade
