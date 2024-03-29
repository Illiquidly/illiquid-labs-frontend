import { Loader } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionGetResponse } from 'services/api/supportedCollectionsService'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useAddress from 'hooks/useAddress'
import { FAVORITES_RAFFLES } from 'constants/useQueryKeys'
import { Raffle } from 'services/api/rafflesService'
import {
	FavoriteRaffleResponse,
	FavoriteRafflesService,
} from 'services/api/favoriteRafflesService'
import moment from 'moment'
import { getNetworkName } from 'utils/blockchain/terraUtils'
import { ListingCard } from './listing-card'

export enum GRID_TYPE {
	SMALL = 0,
	BIG = 1,
}

interface GridControllerProps {
	raffles: Raffle[]
	gridType?: GRID_TYPE
	verifiedCollections?: SupportedCollectionGetResponse[]
	isLoading?: boolean
	favoriteRaffles?: FavoriteRaffleResponse[]
}

const stylesByGrid = {
	[GRID_TYPE.SMALL]: {
		gridTemplateColumns: [
			'1fr',
			'repeat(auto-fill, minmax(332px, 1fr))',
			'repeat(auto-fill, minmax(245px, 1fr))',
		],
		gridColumnGap: ['16px', '25px', '14px'],
		gridRowGap: ['8px', '16px', '18px'],
	},
	[GRID_TYPE.BIG]: {
		gridTemplateColumns: [
			'1fr',
			'repeat(auto-fill, minmax(332px, 1fr))',
			'repeat(auto-fill, minmax(225px, 1fr))',
		],
		gridColumnGap: ['16px', '25px', '14px'],
		gridRowGap: ['8px', '16px', '18px'],
	},
}

function GridController({
	raffles,
	gridType = GRID_TYPE.SMALL,
	verifiedCollections = [],
	isLoading,
	favoriteRaffles,
}: GridControllerProps) {
	const { t } = useTranslation()

	const networkName = getNetworkName()

	const myAddress = useAddress()

	const queryClient = useQueryClient()

	const updateFavoriteRaffleState = (data: FavoriteRaffleResponse) =>
		queryClient.setQueryData(
			[FAVORITES_RAFFLES, networkName, myAddress],
			(old: any) => [...old.filter(o => o.id !== data.id), data]
		)

	const { mutate: addFavoriteRaffle } = useMutation(
		FavoriteRafflesService.addFavoriteRaffle,
		{
			onSuccess: updateFavoriteRaffleState,
		}
	)

	const { mutate: removeFavoriteRaffle } = useMutation(
		FavoriteRafflesService.removeFavoriteRaffle,
		{
			onSuccess: updateFavoriteRaffleState,
		}
	)

	if (isLoading) {
		return (
			<Flex
				sx={{
					marginTop: '240px',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Loader loadingText={t('common:loading')} />
			</Flex>
		)
	}

	return (
		<Flex
			sx={{
				display: 'grid',
				width: [null, null, '100%'],
				overflow: 'auto',
				...stylesByGrid[gridType],
			}}
		>
			{raffles.map(
				({
					id,
					raffleId,
					participants,
					raffleInfo: {
						raffleTicketPrice,
						raffleOptions,
						allAssociatedAssets,
						winner,
						state,
					},
				}) => {
					const liked = Boolean(
						(favoriteRaffles ?? []).find(favoriteRaffle =>
							favoriteRaffle.raffles.some(raffle => raffle.id === id)
						)
					)

					const toggleLike = () =>
						({ addFavoriteRaffle, removeFavoriteRaffle }[
							liked ? 'removeFavoriteRaffle' : 'addFavoriteRaffle'
						]({
							network: networkName,
							raffleId: [Number(raffleId)],
							user: myAddress,
						}))

					const ticketsSold = (participants ?? []).reduce(
						(a, b) => a + b.ticketNumber,
						0
					)

					const ticketPrice = Number(
						raffleTicketPrice?.coin?.amount ??
							raffleTicketPrice?.cw20Coin?.amount ??
							0
					)

					const ticketCurrency =
						raffleTicketPrice?.coin?.currency ??
						raffleTicketPrice?.cw20Coin?.currency ??
						''

					const totalVolume = ticketPrice * ticketsSold

					const ticketsRemaining =
						(raffleOptions?.maxParticipantNumber ?? 0) - ticketsSold

					return (
						<Box key={raffleId}>
							<ListingCard
								state={state}
								winner={winner}
								onLike={toggleLike}
								description={raffleOptions?.rafflePreview?.cw721Coin?.description ?? ''}
								attributes={raffleOptions?.rafflePreview?.cw721Coin?.attributes ?? []}
								tokenId={raffleOptions?.rafflePreview?.cw721Coin?.tokenId ?? ''}
								collectionAddress={
									raffleOptions?.rafflePreview?.cw721Coin?.collectionAddress ?? ''
								}
								href={`${ROUTES.RAFFLE_LISTING_DETAILS}?raffleId=${raffleId}`}
								nfts={(allAssociatedAssets || [])
									.filter(nft => nft.cw721Coin)
									.map(({ cw721Coin }) => cw721Coin as NFT)}
								imageUrl={raffleOptions?.rafflePreview?.cw721Coin?.imageUrl ?? []}
								name={raffleOptions?.rafflePreview?.cw721Coin?.name ?? ''}
								liked={liked}
								verified={verifiedCollections.some(
									({ collectionAddress }) =>
										raffleOptions?.rafflePreview?.cw721Coin?.collectionAddress ===
										collectionAddress
								)}
								collectionName={
									raffleOptions?.rafflePreview?.cw721Coin?.collectionName || ''
								}
								ticketPrice={ticketPrice}
								ticketCurrency={ticketCurrency}
								ticketNumber={raffleOptions.maxParticipantNumber}
								totalVolume={totalVolume}
								ticketsRemaining={ticketsRemaining}
								endsIn={moment(raffleOptions?.raffleStartDate)
									.add(raffleOptions?.raffleDuration ?? 0, 'seconds')
									.toDate()}
								isSmall={gridType === GRID_TYPE.BIG}
							/>
						</Box>
					)
				}
			)}
		</Flex>
	)
}

GridController.defaultProps = {
	gridType: GRID_TYPE.SMALL,
	verifiedCollections: [],
	isLoading: false,
	favoriteRaffles: [],
}

export default GridController
