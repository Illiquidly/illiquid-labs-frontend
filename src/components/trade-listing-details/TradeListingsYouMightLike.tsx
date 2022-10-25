import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { TradeGridController, GRID_TYPE } from 'components/shared'
import { TRADES, VERIFIED_COLLECTIONS } from 'constants/use-query-keys'
import useAddress from 'hooks/useAddress'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionsService } from 'services/api'
import { TradesService, TRADE_STATE } from 'services/api/tradesService'
import { Box, Flex } from 'theme-ui'

const MightLikeText = styled(Flex)`
	font-size: 20px;
	line-height: 28px;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
`

MightLikeText.defaultProps = {
	sx: {
		fontSize: ['20px', '24px'],
		lineHeight: ['28px', '28px'],
	},
}

export interface TradeListingsYouMightLikeProps {
	search: string
	tradeId?: string | number
}

function TradeListingsYouMightLike({
	search,
	tradeId,
}: TradeListingsYouMightLikeProps) {
	const wallet = useWallet()
	const { t } = useTranslation(['common', 'trade-listings'])
	const myAddress = useAddress()

	const { data: verifiedCollections } = useQuery(
		[VERIFIED_COLLECTIONS, wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data: trades, isLoading } = useQuery(
		[TRADES, wallet.network, search],
		async () =>
			TradesService.getAllTrades(
				wallet.network.name,
				{
					myAddress,
					search,
					states: [TRADE_STATE.Published, TRADE_STATE.Countered],
					excludeMyTrades: true,
					...(tradeId ? { excludeTrades: [tradeId] } : {}),
				},
				{
					page: 1,
					limit: 15,
				}
			),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	return (
		<Flex
			sx={{ minHeight: '400px', flexDirection: 'column', paddingBottom: '48px' }}
		>
			<Box
				sx={{
					marginBottom: ['16px', '25px'],
				}}
			>
				<MightLikeText>{t('trade-listings:you-might-like')}</MightLikeText>
			</Box>
			<Box sx={{ width: '100%' }}>
				<TradeGridController
					trades={trades?.data ?? []}
					isLoading={isLoading}
					verifiedCollections={verifiedCollections}
					gridType={Number(Boolean(GRID_TYPE.SMALL))}
				/>
			</Box>
		</Flex>
	)
}

export default TradeListingsYouMightLike
