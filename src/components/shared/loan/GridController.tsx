import { Loader } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionGetResponse } from 'services/api/supportedCollectionsService'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useAddress from 'hooks/useAddress'
import { useWallet } from '@terra-money/use-wallet'
import { NetworkName } from 'types'

import {
	FavoriteLoanResponse,
	FavoriteLoansService,
} from 'services/api/favoriteLoansService'
import { Loan } from 'services/api/loansService'
import { FAVORITES_LOANS } from 'constants/useQueryKeys'
import { NFT } from 'services/api/walletNFTsService'
import { BLOCKS_PER_DAY } from 'constants/core'
import { ListingCard } from './listing-card'

export enum GRID_TYPE {
	SMALL = 0,
	BIG = 1,
}

interface GridControllerProps {
	loans: Loan[]
	gridType?: GRID_TYPE
	verifiedCollections?: SupportedCollectionGetResponse[]
	isLoading?: boolean
	favoriteLoans?: FavoriteLoanResponse[]
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
	loans,
	gridType = GRID_TYPE.SMALL,
	verifiedCollections = [],
	isLoading,
	favoriteLoans,
}: GridControllerProps) {
	const { t } = useTranslation()

	const wallet = useWallet()

	const myAddress = useAddress()

	const queryClient = useQueryClient()

	const updateFavoriteLoanState = (data: FavoriteLoanResponse) =>
		queryClient.setQueryData(
			[FAVORITES_LOANS, wallet.network, myAddress],
			(old: any) => [...old.filter(o => o.id !== data.id), data]
		)

	const { mutate: addFavoriteLoan } = useMutation(
		FavoriteLoansService.addFavoriteLoan,
		{
			onSuccess: updateFavoriteLoanState,
		}
	)

	const { mutate: removeFavoriteLoan } = useMutation(
		FavoriteLoansService.removeFavoriteLoan,
		{
			onSuccess: updateFavoriteLoanState,
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
			{loans.map(
				({
					id,
					loanId,
					borrower,
					loanInfo: { terms, loanPreview, associatedAssets, activeOffer },
				}) => {
					const liked = Boolean(
						(favoriteLoans ?? []).find(favoriteLoan =>
							favoriteLoan.loans.some(loan => loan.id === id)
						)
					)

					const toggleLike = () =>
						({ addFavoriteLoan, removeFavoriteLoan }[
							liked ? 'removeFavoriteLoan' : 'addFavoriteLoan'
						]({
							network: wallet.network.name as NetworkName,
							loanId: [Number(loanId)],
							borrower,
							user: myAddress,
						}))

					return (
						<Box key={`${loanId}_${borrower}`}>
							<ListingCard
								onLike={toggleLike}
								description={loanPreview?.cw721Coin?.description ?? ''}
								attributes={loanPreview?.cw721Coin?.attributes ?? []}
								tokenId={loanPreview?.cw721Coin?.tokenId ?? ''}
								collectionAddress={loanPreview?.cw721Coin?.collectionAddress ?? ''}
								href={`${ROUTES.LOAN_LISTING_DETAILS}?loanId=${loanId}&borrower=${borrower}`}
								nfts={(associatedAssets || [])
									.filter(nft => nft.cw721Coin)
									.map(({ cw721Coin }) => cw721Coin as NFT)}
								imageUrl={loanPreview?.cw721Coin?.imageUrl ?? []}
								name={loanPreview?.cw721Coin?.name ?? ''}
								liked={liked}
								apr={Number(
									activeOffer?.offerInfo?.terms?.interest ?? terms?.interest ?? 0
								)}
								borrowAmount={Number(
									activeOffer?.offerInfo?.terms?.principle?.amount ??
										terms?.principle.amount ??
										0
								)}
								timeFrame={Math.floor(
									Number(
										(activeOffer?.offerInfo?.terms?.durationInBlocks ??
											terms?.durationInBlocks) / BLOCKS_PER_DAY
									)
								)}
								verified={verifiedCollections.some(
									({ collectionAddress }) =>
										loanPreview?.cw721Coin?.collectionAddress === collectionAddress
								)}
								collectionName={loanPreview?.cw721Coin?.collectionName || ''}
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
	favoriteLoans: [],
}

export default GridController
