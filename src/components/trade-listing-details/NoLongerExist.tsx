import { ArrowLeftIcon } from 'assets/icons/mixed'
import { Button } from 'components/ui'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { useTranslation } from 'next-i18next'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'

import NotFoundImg from 'assets/images/NotFoundImg'
import { GridController, GRID_TYPE } from 'components/trade-listings'
import React from 'react'
import { LISTINGS_TYPE } from 'constants/listings'
import { Trade, TradesService } from 'services/api/tradesService'
import { SupportedCollectionsService } from 'services/api'
import styled from '@emotion/styled'

export const NoLongerExist = () => {
	const { t } = useTranslation(['common', 'trade-listings'])
	const wallet = useWallet()

	// TODO extract this into hook, along with useQuery part.
	const [infiniteData, setInfiniteData] = React.useState<Trade[]>([])
	React.useEffect(() => {
		setInfiniteData([])
	}, [])

	const myAddress = wallet.wallets[0]?.terraAddress ?? ''
	const { data: trades, isLoading } = useQuery(
		[
			'trades',
			wallet.network,
			LISTINGS_TYPE.ALL_LISTINGS, // listings
			[], // statuses
			[], // lookingForCollections,
			[], // collections,
			false,
			false,
			false, // lookingForLiquidAssetsChecked,
			'', // debouncedSearch,
			1, // page
		],
		async () =>
			TradesService.getAllTrades(
				wallet.network.name,
				{
					owners: undefined, // maybe myaddress
					states: [].flatMap(({ value }) => JSON.parse(value)),
					collections: [].map(({ value }) => value),
					lookingFor: [].map(({ value }) => value),
					counteredBy: undefined,
					hasLiquidAsset: false,
					search: '',
					myAddress,
					// myFavoritesChecked
				},
				{
					page: 1,
					limit: 10,
				}
			),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	React.useEffect(
		() => trades && setInfiniteData(prev => [...prev, ...trades.data]),
		[trades]
	)

	const { data: verifiedCollections } = useQuery(
		['verifiedCollections', wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const MightLikeText = styled(Flex)`
		font-size: 20px;
		line-height: 28px;
		padding-bottom: 16px;
	`

	const NotFoundText = styled(Flex)`
		font-size: 30px;
		line-height: 36px;
		padding-bottom: 64px;
		padding-top: 22px;
		text-align: center;
	`

	return (
		<>
			<Flex
				sx={{
					justifyContent: 'flex-start',
					padding: '22px 0',
				}}
			>
				<Button
					href={ROUTES.TRADE_LISTINGS}
					sx={{ height: '40px', padding: '13px' }}
					variant='secondary'
					startIcon={<ArrowLeftIcon />}
				>
					{t('trade-listings:back-to-listings')}
				</Button>
			</Flex>
			<Flex sx={{ justifyContent: 'center' }}>
				<NotFoundImg />
			</Flex>
			<NotFoundText>{t('trade-listings:not-found-text')}</NotFoundText>
			<MightLikeText sx={{ fontSize: '20px', lineHeight: '28px' }}>
				{t('trade-listings:you-might-like')}
			</MightLikeText>
			<Box sx={{ width: '100%' }}>
				<GridController
					trades={infiniteData}
					isLoading={!infiniteData.length && isLoading}
					verifiedCollections={verifiedCollections}
					gridType={Number(Boolean(GRID_TYPE.SMALL))}
				/>
			</Box>
		</>
	)
}

export default NoLongerExist
