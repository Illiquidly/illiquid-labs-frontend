import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { RaffleGridController } from 'components/shared/raffle'
import { GRID_TYPE } from 'components/shared/raffle/GridController'
import { RAFFLES, VERIFIED_COLLECTIONS } from 'constants/useQueryKeys'
import useAddress from 'hooks/useAddress'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionsService } from 'services/api'
import { RafflesService, RAFFLE_STATE } from 'services/api/rafflesService'
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

export interface RaffleListingsYouMightLikeProps {
	search: string
	raffleId?: string | number
}

function RaffleListingsYouMightLike({
	search,
	raffleId,
}: RaffleListingsYouMightLikeProps) {
	const wallet = useWallet()
	const { t } = useTranslation(['common', 'raffle-listings'])
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

	const { data: raffles, isLoading } = useQuery(
		[RAFFLES, wallet.network, search, myAddress],
		async () =>
			RafflesService.getAllRaffles(
				wallet.network.name,
				{
					myAddress,
					search,
					states: [RAFFLE_STATE.Started],
					excludeMyRaffles: true,
					...(raffleId ? { excludeRaffles: [raffleId] } : {}),
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
				<MightLikeText>{t('raffle-listings:you-might-like')}</MightLikeText>
			</Box>
			<Box sx={{ width: '100%' }}>
				<RaffleGridController
					raffles={raffles?.data ?? []}
					isLoading={isLoading}
					verifiedCollections={verifiedCollections}
					gridType={Number(Boolean(GRID_TYPE.SMALL))}
				/>
			</Box>
		</Flex>
	)
}

export default RaffleListingsYouMightLike
