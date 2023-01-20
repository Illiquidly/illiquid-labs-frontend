import React from 'react'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'

import {
	AttributeCard as UIAttributeCard,
	BlueWarning,
	Button,
	DescriptionCard,
	DescriptionCardItem,
	Loader,
} from 'components/ui'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { Box, Flex } from 'theme-ui'

import {
	Row,
	AttributeCard,
	AttributeName,
	AttributeValue,
	AttributesCard,
	OwnerName,
	OwnerAvatarImg,
	ParticipantsTitle,
	LoanHeaderActionsRow,
	LoanListingsYouMightLike,
	LoanOffersTable,
} from 'components/loan-listing-details'

import { AvatarIcon, CalendarIcon, WalletIcon } from 'assets/icons/mixed'
import useHeaderActions from 'hooks/useHeaderActions'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { NFT } from 'services/api/walletNFTsService'
import { sample } from 'lodash'
import { LoansService, SupportedCollectionsService } from 'services/api'
import { asyncAction } from 'utils/js/asyncAction'

import {
	DescriptionRow,
	ImageRow,
	LayoutContainer,
	NFTPreviewImages,
	Page,
	ViewNFTsModal,
	ViewNFTsModalProps,
	ViewNFTsModalResult,
} from 'components'
import useAddress from 'hooks/useAddress'
import {
	FavoriteLoanResponse,
	FavoriteLoansService,
} from 'services/api/favoriteLoansService'
import {
	FAVORITES_LOANS,
	LOAN,
	VERIFIED_COLLECTIONS,
} from 'constants/useQueryKeys'
import { NetworkName } from 'types'
import useNameService from 'hooks/useNameService'
import CreateLoanListing from 'components/shared/header-actions/create-loan-listing/CreateLoanListings'
import { LOAN_STATE } from 'services/api/loansService'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'

const getStaticProps = makeStaticProps(['common', 'loan-listings'])
const getStaticPaths = makeStaticPaths()

export { getStaticPaths, getStaticProps }

export default function LoanListingDetails() {
	const { t } = useTranslation(['common', 'loan-listings'])

	const route = useRouter()

	const wallet = useWallet()

	const myAddress = useAddress()

	const queryClient = useQueryClient()

	const { loanId, borrower } = route.query ?? {}

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

	const { data: verifiedCollections } = useQuery(
		[VERIFIED_COLLECTIONS, wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data: loan, isLoading } = useQuery(
		[LOAN, loanId, wallet.network],
		async () =>
			LoansService.getLoan(
				wallet.network.name,
				loanId as string,
				borrower as string
			),
		{
			enabled: !!wallet.network,
			retry: true,
			refetchInterval: 60 * 1000, // Refetch every minute
		}
	)

	const { data: favoriteLoans } = useQuery(
		[FAVORITES_LOANS, wallet.network, myAddress],
		async () =>
			FavoriteLoansService.getFavoriteLoans(
				{ network: wallet.network.name as NetworkName },
				{
					users: [myAddress],
				}
			),
		{
			enabled: !!wallet.network && !!myAddress,
			retry: true,
		}
	)

	const [ownerInfo] = useNameService(loan?.borrower ? [loan?.borrower] : [])

	const { loanInfo, id } = loan ?? {}
	const { comment } = loanInfo ?? {}

	const [loanPreview, setLoanPreview] = React.useState<{
		cw721Coin?: NFT
		cw1155Coin?: any
	} | null>(null)

	React.useEffect(() => {
		if (loan) {
			setLoanPreview(loanInfo?.loanPreview ?? null)
		}
	}, [loan])

	useHeaderActions(<CreateLoanListing />)

	const handleViewAllNFTs = async () => {
		if (!loan) {
			return
		}
		const [, result] = await asyncAction<ViewNFTsModalResult>(
			NiceModal.show(ViewNFTsModal, {
				nfts: (loanInfo?.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin),
				title: t('common:all-nfts'),
			} as ViewNFTsModalProps)
		)

		if (result) {
			setLoanPreview(oldPrev => ({ ...oldPrev, cw721Coin: result.nft }))
		}
	}

	const liked = Boolean(
		(favoriteLoans ?? []).find(favoriteLoan =>
			favoriteLoan.loans.some(favLoan => favLoan.id === Number(id))
		)
	)

	const toggleLike = () =>
		({ addFavoriteLoan, removeFavoriteLoan }[
			liked ? 'removeFavoriteLoan' : 'addFavoriteLoan'
		]({
			network: wallet.network.name as NetworkName,
			loanId: [Number(loanId)],
			borrower: borrower as string,
			user: myAddress,
		}))

	const ownerName =
		ownerInfo?.extension?.publicName ?? ownerInfo?.extension?.name

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				{!isLoading ? (
					<>
						<LoanHeaderActionsRow loan={loan} />
						<Row>
							{![LOAN_STATE.Published].includes(loanInfo?.state as LOAN_STATE) && (
								<BlueWarning sx={{ width: '100%', height: '49px' }}>
									{t('loan-listings:item-not-available')}
								</BlueWarning>
							)}
						</Row>

						<Flex
							sx={{ flexDirection: ['column', 'column', 'row'], gap: [0, 0, '32px'] }}
						>
							<Box sx={{ flex: [1, 1, 'unset'], width: ['unset', 'unset', '491px'] }}>
								<ImageRow
									nft={loanPreview?.cw721Coin}
									imageUrl={loanPreview?.cw721Coin?.imageUrl ?? []}
									onLike={toggleLike}
									liked={liked}
								/>

								<Row>
									<Button fullWidth variant='dark' onClick={handleViewAllNFTs}>
										<Flex sx={{ alignItems: 'center' }}>
											<NFTPreviewImages
												nfts={(loanInfo?.associatedAssets ?? [])
													.filter(asset => asset.cw721Coin)
													.map(({ cw721Coin }) => cw721Coin as NFT)}
											/>
											<div>{t('loan-listings:view-all-nfts')}</div>
										</Flex>
									</Button>
								</Row>
							</Box>
							<Box sx={{ flex: 1 }}>
								<Row>
									<DescriptionRow
										isPrivate={false}
										name={loanPreview?.cw721Coin?.name}
										collectionName={loanPreview?.cw721Coin?.collectionName ?? ''}
										verified={(verifiedCollections ?? []).some(
											({ collectionAddress }) =>
												loanPreview?.cw721Coin?.collectionAddress === collectionAddress
										)}
									/>
								</Row>
								{Boolean(loanPreview?.cw721Coin?.attributes?.length) && (
									<Row>
										<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
											{(loanPreview?.cw721Coin?.attributes ?? []).map(attribute => (
												<UIAttributeCard
													key={JSON.stringify(attribute)}
													name={attribute.traitType}
													value={attribute.value}
												/>
											))}
										</Flex>
									</Row>
								)}
								<Row>
									<DescriptionCard>
										<DescriptionCardItem>
											<Flex sx={{ alignItems: 'center' }}>
												<Box
													sx={{
														width: '24px',
														height: '24px',
														borderRadius: '4px',
														overflow: 'hidden',
													}}
												>
													{ownerInfo?.extension?.image ? (
														<OwnerAvatarImg
															src={fromIPFSImageURLtoImageURL(ownerInfo?.extension?.image)}
														/>
													) : (
														<AvatarIcon width='100%' height='100%' />
													)}
												</Box>
												{ownerName && (
													<Box sx={{ ml: '4px' }}>
														<OwnerName>{ownerName}</OwnerName>
													</Box>
												)}
												<Box sx={{ ml: '4px', flex: 1 }}>{`''${comment ?? ''}''`}</Box>
											</Flex>
										</DescriptionCardItem>
										<DescriptionCardItem>
											<WalletIcon width='20px' height='20px' color='#fff' />
											<Box
												sx={{
													ml: '9px',
													flex: 1,
												}}
											>
												{borrower ?? ''}
											</Box>
										</DescriptionCardItem>
										<DescriptionCardItem>
											<CalendarIcon width='20px' height='20px' color='#fff' />
											<Box
												sx={{
													ml: '9px',
													flex: 1,
												}}
											>
												<div />
											</Box>
										</DescriptionCardItem>
									</DescriptionCard>
								</Row>

								<Row>
									<AttributesCard>
										<AttributeCard>
											<AttributeName>{t('loan-listings:loan-start-date')}</AttributeName>
											<AttributeValue />
										</AttributeCard>
										<AttributeCard>
											<AttributeName />
											<AttributeValue />
										</AttributeCard>
										<AttributeCard>
											<AttributeName>{t('loan-listings:loan-ticket-cost')}</AttributeName>
											<AttributeValue />
										</AttributeCard>
										<AttributeCard>
											<AttributeName>
												{t('loan-listings:loan-tickets-remaining')}
											</AttributeName>
											<AttributeValue />
										</AttributeCard>
									</AttributesCard>
								</Row>

								<Row>
									<Button size='extraLarge' fullWidth variant='gradient'>
										<div>{t('loan-listings:fund-loan')}</div>
									</Button>
								</Row>
							</Box>
						</Flex>

						<Row>
							<Flex sx={{ flex: 1, flexDirection: 'column' }}>
								<Box sx={{ padding: '8px 0' }}>
									<ParticipantsTitle>
										{t('loan-listings:participants.title')}
									</ParticipantsTitle>
								</Box>
								<LoanOffersTable loan={loan} />
							</Flex>
						</Row>
						<LoanListingsYouMightLike
							search={
								loanPreview?.cw721Coin?.collectionName ??
								sample(verifiedCollections ?? [])?.collectionName ??
								''
							}
							loanId={loan?.loanId}
						/>
					</>
				) : (
					<Flex
						sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}
					>
						<Loader />
					</Flex>
				)}
			</LayoutContainer>
		</Page>
	)
}
