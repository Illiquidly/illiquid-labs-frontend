import { Loader } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionGetResponse } from 'services/api/supportedCollectionsService'
import { Trade } from 'services/api/tradesService'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	FavoriteTradeResponse,
	FavoriteTradesService,
} from 'services/api/favoriteTradesService'
import useAddress from 'hooks/useAddress'
import { useWallet } from '@terra-money/use-wallet'
import { FAVORITES_TRADES } from 'constants/useQueryKeys'
import { NetworkName } from 'types'
import { ListingCard } from './listing-card'

export enum GRID_TYPE {
	SMALL = 0,
	BIG = 1,
}

interface GridControllerProps {
	trades: Trade[]
	gridType?: GRID_TYPE
	verifiedCollections?: SupportedCollectionGetResponse[]
	isLoading?: boolean
	favoriteTrades?: FavoriteTradeResponse[]
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
	trades,
	gridType = GRID_TYPE.SMALL,
	verifiedCollections = [],
	isLoading,
	favoriteTrades,
}: GridControllerProps) {
	const { t } = useTranslation()

	const wallet = useWallet()

	const myAddress = useAddress()

	const queryClient = useQueryClient()

	const updateFavoriteTradeState = data =>
		queryClient.setQueryData(
			[FAVORITES_TRADES, wallet.network, myAddress],
			(old: any) => [...old.filter(o => o.id !== data.id), data]
		)

	const { mutate: addFavoriteTrade } = useMutation(
		FavoriteTradesService.addFavoriteTrade,
		{
			onSuccess: updateFavoriteTradeState,
		}
	)

	const { mutate: removeFavoriteTrade } = useMutation(
		FavoriteTradesService.removeFavoriteTrade,
		{
			onSuccess: updateFavoriteTradeState,
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
			{trades.map(
				({
					id,
					tradeId,
					tradeInfo: { additionalInfo, associatedAssets, whitelistedUsers, state },
				}) => {
					const liked = Boolean(
						(favoriteTrades ?? []).find(favoriteTrade =>
							favoriteTrade.trades.some(trade => trade.id === id)
						)
					)

					const toggleLike = () =>
						({ addFavoriteTrade, removeFavoriteTrade }[
							liked ? 'removeFavoriteTrade' : 'addFavoriteTrade'
						]({
							network: wallet.network.name as NetworkName,
							tradeId: [Number(tradeId)],
							user: myAddress,
						}))

					return (
						<Box key={tradeId}>
							<ListingCard
								onLike={toggleLike}
								unavailableText={t('trade-listings:listing-unavailable')}
								description={additionalInfo?.tradePreview?.cw721Coin?.description ?? ''}
								attributes={additionalInfo?.tradePreview?.cw721Coin?.attributes ?? []}
								tokenId={additionalInfo?.tradePreview?.cw721Coin?.tokenId ?? ''}
								collectionAddress={
									additionalInfo?.tradePreview?.cw721Coin?.collectionAddress ?? ''
								}
								href={`${ROUTES.TRADE_LISTING_DETAILS}?tradeId=${tradeId}`}
								nfts={(associatedAssets || [])
									.filter(nft => nft.cw721Coin)
									.map(({ cw721Coin }) => cw721Coin as NFT)}
								lookingFor={additionalInfo?.lookingFor ?? []}
								imageUrl={additionalInfo?.tradePreview?.cw721Coin?.imageUrl ?? []}
								name={additionalInfo?.tradePreview?.cw721Coin?.name ?? ''}
								liked={liked}
								verified={verifiedCollections.some(
									({ collectionAddress }) =>
										additionalInfo?.tradePreview?.cw721Coin?.collectionAddress ===
										collectionAddress
								)}
								isPrivate={(whitelistedUsers || []).length > 0}
								collectionName={
									additionalInfo?.tradePreview?.cw721Coin?.collectionName || ''
								}
								hasLookingFor={gridType !== GRID_TYPE.BIG}
								state={state}
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
	favoriteTrades: [],
}

export default GridController
