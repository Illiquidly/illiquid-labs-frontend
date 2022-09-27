import { ListingCard } from 'components/shared'
import { noop } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionGetResponse } from 'services/api/supportedCollectionsService'
import { TradesResponse } from 'services/api/tradesService'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'

export enum GRID_TYPE {
	SMALL = 0,
	BIG = 1,
}

interface GridControllerProps {
	trades?: TradesResponse
	gridType?: GRID_TYPE
	verifiedCollections?: SupportedCollectionGetResponse[]
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
}: GridControllerProps) {
	const { t } = useTranslation()

	return (
		<Flex
			sx={{
				display: 'grid',
				width: [null, null, '100%'],
				overflow: 'auto',
				...stylesByGrid[gridType],
			}}
		>
			{(trades?.data || []).map(
				({
					tradeId,
					tradeInfo: { additionalInfo, associatedAssetsWithInfo, whitelistedUsers },
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
							href={`/trade-listings/${tradeId}`}
							nfts={(associatedAssetsWithInfo || [])
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
	trades: [],
	gridType: GRID_TYPE.SMALL,
	verifiedCollections: [],
}

export default GridController
