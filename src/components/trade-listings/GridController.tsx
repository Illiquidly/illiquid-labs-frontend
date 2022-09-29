import { ListingCard } from 'components/shared'
import { Loader } from 'components/ui'
import { noop } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionGetResponse } from 'services/api/supportedCollectionsService'
import { Trade } from 'services/api/tradesService'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'

export enum GRID_TYPE {
	SMALL = 0,
	BIG = 1,
}

interface GridControllerProps {
	trades: Trade[]
	gridType?: GRID_TYPE
	verifiedCollections?: SupportedCollectionGetResponse[]
	isLoading?: boolean
}

const stylesByGrid = {
	[GRID_TYPE.SMALL]: {
		gridTemplateColumns: [
			'repeat(auto-fill, minmax(345px, 1fr))',
			'repeat(auto-fill, minmax(332px, 1fr))',
			'repeat(auto-fill, minmax(245px, 1fr))',
		],
		gridColumnGap: ['16px', '25px', '14px'],
		gridRowGap: ['8px', '16px', '18px'],
	},
	[GRID_TYPE.BIG]: {
		gridTemplateColumns: [
			'repeat(auto-fill, minmax(345px, 1fr))',
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
}: GridControllerProps) {
	const { t } = useTranslation()

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
					tradeId,
					tradeInfo: { additionalInfo, associatedAssets, whitelistedUsers },
				}) => (
					<Box key={tradeId}>
						<ListingCard
							onLike={noop}
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
							liked={false}
							verified={verifiedCollections.some(
								({ collectionAddress }) =>
									additionalInfo?.tradePreview?.cw721Coin?.collectionAddress ===
									collectionAddress
							)}
							isPrivate={(whitelistedUsers || []).length > 0}
							collectionName={
								additionalInfo?.tradePreview?.cw721Coin?.collectionName || ''
							}
						/>
					</Box>
				)
			)}
		</Flex>
	)
}

GridController.defaultProps = {
	gridType: GRID_TYPE.SMALL,
	verifiedCollections: [],
	isLoading: false,
}

export default GridController
