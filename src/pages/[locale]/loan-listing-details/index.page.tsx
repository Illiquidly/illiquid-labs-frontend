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

import {
	AvatarIcon,
	CalendarIcon,
	LunaIcon,
	WalletIcon,
} from 'assets/icons/mixed'
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
	LinkButton,
	NFTPreviewImages,
	Page,
	TxBroadcastingModal,
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
	LATEST_BLOCK,
	LOAN,
	LOAN_OFFERS,
	VERIFIED_COLLECTIONS,
} from 'constants/useQueryKeys'
import { NetworkName } from 'types'
import useNameService from 'hooks/useNameService'
import CreateLoanListing from 'components/shared/header-actions/create-loan-listing/CreateLoanListings'
import { LOAN_STATE } from 'services/api/loansService'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import { BLOCKS_PER_DAY } from 'constants/core'
import terraUtils from 'utils/blockchain/terraUtils'
import moment from 'moment'

import * as ROUTES from 'constants/routes'
import { LoansContract } from 'services/blockchain'
import FundLoanOfferModal, {
	FundLoanOfferModalResult,
} from 'components/loan-listing-details/modals/fund-loan-modal/FundLoanModal'

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

	const {
		data: loan,
		isLoading,
		refetch,
	} = useQuery(
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
			refetchInterval: 60 * 1000,
		}
	)

	const { data: latestBlockHeight } = useQuery(
		[LATEST_BLOCK, wallet.network],
		async () => terraUtils.getLatestBlockHeight(),
		{
			enabled: !!wallet.network,
			retry: true,
			refetchInterval: 60 * 1000,
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

	const acceptedLoanOffer = loan?.loanInfo?.activeOffer ?? null

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

	const fundLoan = async () => {
		if (!loan) {
			return
		}

		const [, result] = await asyncAction<FundLoanOfferModalResult>(
			NiceModal.show(FundLoanOfferModal, {
				loan,
			})
		)

		if (result) {
			const fundLoanResponse = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: LoansContract.fundLoan(
					loan.loanId,
					borrower as string,
					loan?.loanInfo?.terms?.principle?.amount,
					result.comment
				),
				closeOnFinish: true,
			})

			if (fundLoanResponse) {
				await refetch()
				await queryClient.refetchQueries([LOAN_OFFERS])
			}
		}
	}

	const repayLoan = async () => {
		if (!loan) {
			return
		}

		if (!acceptedLoanOffer) {
			return
		}

		// TODO: this should be returned from contract to now exactly the amount for now just add 0.05% more than required
		const TOLERANCE = 0.5

		const repayLoanResponse = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.repayBorrowedFunds(
				loan.loanId,
				Number(acceptedLoanOffer?.offerInfo?.terms?.principle?.amount ?? 0) +
					(Number(acceptedLoanOffer?.offerInfo.terms?.interest ?? 0 + TOLERANCE) /
						100) *
						Number(acceptedLoanOffer?.offerInfo.terms?.principle?.amount ?? 0)
			),
			closeOnFinish: true,
		})

		if (repayLoanResponse) {
			await refetch()
		}
	}

	const withdrawDefaultedLoan = async () => {
		if (!loan) {
			return
		}

		const withdrawDefaultedResponse = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.withdrawDefaultedLoan(
				loan.loanId,
				borrower as string
			),
			closeOnFinish: true,
		})

		if (withdrawDefaultedResponse) {
			await refetch()
		}
	}

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

	const isMyLoan = loan?.borrower === myAddress

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
												{moment(loan?.loanInfo?.listDate).fromNow()}
											</Box>
										</DescriptionCardItem>
									</DescriptionCard>
								</Row>

								<Row>
									<AttributesCard>
										<AttributeCard>
											<AttributeName>{t('loan-listings:loan-period')}</AttributeName>
											<AttributeValue>
												{t('loan-listings:days', {
													count: Math.floor(
														(acceptedLoanOffer?.offerInfo?.terms?.durationInBlocks ??
															loanInfo?.terms?.durationInBlocks ??
															0) / BLOCKS_PER_DAY
													),
												})}
											</AttributeValue>
										</AttributeCard>
										<AttributeCard>
											<AttributeName>
												{t('loan-listings:blocks-until-default')}
											</AttributeName>
											<AttributeValue>
												{loanInfo?.startBlock
													? t('loan-listings:days-estimated', {
															estimated: (
																((loanInfo?.startBlock ?? 0) +
																	(acceptedLoanOffer?.offerInfo?.terms?.durationInBlocks ?? 0) -
																	(Number(latestBlockHeight) ?? 0)) /
																BLOCKS_PER_DAY
															).toFixed(2),
															blocks:
																(loanInfo?.startBlock ?? 0) +
																(acceptedLoanOffer?.offerInfo?.terms?.durationInBlocks ?? 0) -
																(Number(latestBlockHeight) ?? 0),
													  })
													: '-'}
											</AttributeValue>
										</AttributeCard>
										<AttributeCard>
											<AttributeName>{t('loan-listings:loan-amount')}</AttributeName>
											<AttributeValue>
												{t('loan-listings:loan-principle', {
													amount:
														acceptedLoanOffer?.offerInfo?.terms?.principle?.amount ??
														loanInfo?.terms?.principle?.amount,
													currency:
														acceptedLoanOffer?.offerInfo?.terms?.principle?.currency ??
														loanInfo?.terms?.principle?.currency,
												})}

												<Box sx={{ ml: 8 }}>
													<LunaIcon />
												</Box>
											</AttributeValue>
										</AttributeCard>
										<AttributeCard>
											<AttributeName>{t('loan-listings:interest-rate-apr')}</AttributeName>
											<AttributeValue>
												{t('common:percentage', {
													value:
														acceptedLoanOffer?.offerInfo?.terms?.interest ??
														loanInfo?.terms?.interest ??
														0,
												})}
											</AttributeValue>
										</AttributeCard>
									</AttributesCard>
								</Row>

								{isMyLoan &&
									acceptedLoanOffer &&
									[LOAN_STATE.Started].includes(
										loan?.loanInfo?.state ?? ('' as LOAN_STATE)
									) && (
										<Row>
											<Button
												size='extraLarge'
												fullWidth
												variant='gradient'
												onClick={repayLoan}
											>
												<div>{t('loan-listings:repay-loan')}</div>
											</Button>
										</Row>
									)}

								{!isMyLoan &&
									[LOAN_STATE.PendingDefault].includes(
										loan?.loanInfo?.state as LOAN_STATE
									) &&
									loan?.loanInfo?.activeOffer?.offerInfo?.lender === myAddress && (
										<Row>
											<Button
												size='extraLarge'
												fullWidth
												variant='gradient'
												onClick={withdrawDefaultedLoan}
											>
												<div>{t('loan-listings:withdraw')}</div>
											</Button>
										</Row>
									)}

								{!isMyLoan &&
									[LOAN_STATE.Published].includes(
										loan?.loanInfo?.state ?? ('' as LOAN_STATE)
									) && (
										<Row
											sx={{ gap: ['8px'], flexDirection: ['column', 'column', 'row'] }}
										>
											<Button
												size='extraLarge'
												fullWidth
												variant='gradient'
												onClick={fundLoan}
											>
												<div>{t('loan-listings:fund-loan')}</div>
											</Button>
											<LinkButton
												href={`${ROUTES.LOAN_OFFER}?loanId=${loanId}&borrower=${borrower}`}
												size='extraLarge'
												fullWidth
												variant='dark'
											>
												<div>{t('loan-listings:make-offer')}</div>
											</LinkButton>
										</Row>
									)}
							</Box>
						</Flex>

						<Row>
							<Flex sx={{ flex: 1, flexDirection: 'column' }}>
								<Box sx={{ padding: '8px 0' }}>
									<ParticipantsTitle>
										{t('loan-listings:loan-offers.title')}
									</ParticipantsTitle>
								</Box>
								<LoanOffersTable refetchLoan={refetch} loan={loan} />
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
