import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'

import {
	Button,
	Card,
	DescriptionCard,
	DescriptionCardItem,
	Loader,
	AttributeCard as PrimaryAttributeCard,
} from 'components/ui'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { Box, Flex } from 'theme-ui'
import moment from 'moment'

import {
	HorizontalLoanLine,
	Row,
	VerticalLoanLine,
} from 'components/loan-listing-details'

import {
	ArrowLeftIcon,
	AvatarIcon,
	CalendarIcon,
	WalletIcon,
} from 'assets/icons/mixed'
import useHeaderActions from 'hooks/useHeaderActions'
import * as ROUTES from 'constants/routes'
import { NFT } from 'services/api/walletNFTsService'
import { LoanOffersService, LoansService } from 'services/api'
import { asyncAction } from 'utils/js/asyncAction'

import {
	ViewNFTsModalProps,
	ViewNFTsModalResult,
	ViewNFTsModal,
	TxBroadcastingModal,
	ModalTitle,
} from 'components/shared'

import NFTPreviewImages from 'components/shared/nft-preview-images/NFTPreviewImages'
import { FAVORITES_LOANS, LOAN } from 'constants/useQueryKeys'
import { FormProvider, useForm } from 'react-hook-form'

import useAddress from 'hooks/useAddress'
import { theme } from 'constants/theme'
import { FavoriteLoansService } from 'services/api/favoriteLoansService'
import { Coin, NetworkName } from 'types'
import CreateLoanListing from 'components/shared/header-actions/create-loan-listing/CreateLoanListings'
import { LoanOfferForm } from 'types/loan/types'
import Offer from 'components/loan-offer/Offer'
import { LoanDetailsStepSchema } from 'constants/validation-schemas/loan'
import { LoansContract } from 'services/blockchain'
import SubmitLoanOfferModal, {
	SubmitLoanOfferModalProps,
} from 'components/loan-offer/modals/submit-loan-offer-modal/SubmitLoanOfferModal'
import { SubmitLoanOfferSuccessModal } from 'components/loan-offer/modals'
import { ImageRow } from 'components/shared/trade'
import { LayoutContainer, Page } from 'components/layout'
import { LinkButton } from 'components/link'
import { getNetworkName } from 'utils/blockchain/terraUtils'

const getStaticProps = makeStaticProps(['common', 'loan-listings', 'loan'])
const getStaticPaths = makeStaticPaths()

export { getStaticPaths, getStaticProps }

export default function LoanCounter() {
	const { t } = useTranslation(['common', 'loan-listings'])

	const route = useRouter()

	const networkName = getNetworkName()

	const { loanId, borrower } = route.query ?? {}

	const myAddress = useAddress()

	const queryClient = useQueryClient()

	const updateFavoriteLoanState = data =>
		queryClient.setQueryData(
			[FAVORITES_LOANS, networkName, myAddress],
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

	const { data: loan, isLoading } = useQuery(
		[LOAN, loanId, networkName],
		async () =>
			LoansService.getLoan(networkName, loanId as string, borrower as string),
		{
			retry: true,
		}
	)

	const { data: favoriteLoans } = useQuery(
		[FAVORITES_LOANS, networkName, myAddress],
		async () =>
			FavoriteLoansService.getFavoriteLoans(
				{ network: networkName as NetworkName },
				{
					users: [myAddress],
				}
			),
		{
			enabled: !!myAddress,
			retry: true,
		}
	)

	const { loanInfo } = loan ?? {}

	const [loanPreview, setLoanPreview] = React.useState<{
		coin?: Coin
		cw721Coin?: NFT
		cw1155Coin?: any
	} | null>(null)

	React.useEffect(() => {
		if (loan) {
			setLoanPreview(loanInfo?.loanPreview ?? null)
		}
	}, [loan])

	useHeaderActions(<CreateLoanListing />)

	const formMethods = useForm<LoanOfferForm>({
		mode: 'all',
		resolver: yupResolver(LoanDetailsStepSchema),
		defaultValues: {
			tokenName: 'Luna',
		},
	})

	const handleViewAllNFTs = async () => {
		if (!loan) {
			return
		}
		const [, result] = await asyncAction<ViewNFTsModalResult>(
			NiceModal.show(ViewNFTsModal, {
				nfts: (loan?.loanInfo.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin),
				title: t('common:all-nfts'),
			} as ViewNFTsModalProps)
		)

		if (result) {
			setLoanPreview(oldPrev => ({ ...oldPrev, cw721Coin: result.nft }))
		}
	}

	const onSubmit = async ({
		tokenAmount,
		tokenName,
		interestRate,
		loanPeriod,
		comment,
	}) => {
		if (!loanId) {
			return
		}

		await NiceModal.show(SubmitLoanOfferModal, {
			loan,
			tokenAmount,
			tokenName,
			interestRate,
			loanPeriod,
			comment,
		} as SubmitLoanOfferModalProps)

		const loanOfferResult: {
			globalOfferId: string
		} = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.makeLoanOffer(
				loanId as string,
				borrower as string,
				loanPeriod,
				interestRate,
				tokenAmount,
				comment
			),
			closeOnFinish: true,
		})

		formMethods.reset()

		await Promise.all([
			NiceModal.show(SubmitLoanOfferSuccessModal, {
				loan,
			}),
			LoanOffersService.getLoanOffer(networkName, loanOfferResult.globalOfferId),
		])
	}

	const liked = Boolean(
		(favoriteLoans ?? []).find(favoriteLoan =>
			favoriteLoan.loans.some(favLoan => favLoan.id === loan?.id)
		)
	)

	const toggleLike = () =>
		({ addFavoriteLoan, removeFavoriteLoan }[
			liked ? 'removeFavoriteLoan' : 'addFavoriteLoan'
		]({
			network: networkName,
			loanId: [`${loanId}`],
			borrower: `${borrower}`,
			user: myAddress,
		}))

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<FormProvider {...formMethods}>
					<form onSubmit={formMethods.handleSubmit(onSubmit)}>
						<Flex sx={{ flexDirection: 'column', mb: '48px', overflow: 'auto' }}>
							{!isLoading ? (
								<>
									<Flex
										sx={{
											justifyContent: 'flex-start',
											padding: '22px 0',
										}}
									>
										<LinkButton
											href={`${ROUTES.LOAN_LISTING_DETAILS}?loanId=${loanId}&borrower=${borrower}`}
											sx={{ height: '40px', padding: '13px' }}
											variant='secondary'
											startIcon={<ArrowLeftIcon />}
										>
											{t('loan-listings:back-to-listing')}
										</LinkButton>
									</Flex>
									<Row>
										<ModalTitle>{t('loan-listings:loan-counter.title')}</ModalTitle>
									</Row>
									<Flex sx={{ flexDirection: ['column', 'column', 'row'] }}>
										<Flex
											sx={{
												flex: 1,
												order: [1, 1, 3],
											}}
										>
											<Box sx={{ width: '100%' }}>
												<Offer />
											</Box>
										</Flex>
										<Box
											sx={{
												order: 2,
												my: 10,
												width: '100%',
												display: ['block', 'block', 'none'],
											}}
										>
											<HorizontalLoanLine />
										</Box>

										<Box
											sx={{
												order: 2,
												minHeight: '100%',
												display: ['none', 'none', 'block'],
											}}
										>
											<VerticalLoanLine />
										</Box>

										<Card
											sx={{
												flex: 1,
												order: [3, 3, 1],
												flexDirection: 'column',
												p: '12px',
											}}
										>
											<Box sx={{ flex: 1 }}>
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
												{Boolean(loanPreview?.cw721Coin?.attributes?.length) && (
													<Row>
														<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
															{(loanPreview?.cw721Coin?.attributes ?? []).map(attribute => (
																<PrimaryAttributeCard
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
														<DescriptionCardItem style={{ background: theme.colors.dark400 }}>
															<Flex sx={{ alignItems: 'center' }}>
																<AvatarIcon />
																<Box sx={{ ml: '3px', flex: 1 }}>
																	{`''${loanInfo?.comment ?? ''}''`}
																</Box>
															</Flex>
														</DescriptionCardItem>
														<DescriptionCardItem style={{ background: theme.colors.dark400 }}>
															<WalletIcon
																width='20px'
																height='20px'
																color={theme.colors.gray1000}
															/>
															<Box
																sx={{
																	ml: '9px',
																	flex: 1,
																}}
															>
																{borrower ?? ''}
															</Box>
														</DescriptionCardItem>
														<DescriptionCardItem style={{ background: theme.colors.dark400 }}>
															<CalendarIcon
																width='20px'
																height='20px'
																color={theme.colors.gray1000}
															/>
															<Box
																sx={{
																	ml: '9px',
																	flex: 1,
																}}
															>
																{t(`loan-listings:listed`, {
																	listed: moment(loanInfo?.listDate ?? '').fromNow(),
																})}
															</Box>
														</DescriptionCardItem>
													</DescriptionCard>
												</Row>
											</Box>
										</Card>
									</Flex>
								</>
							) : (
								<Flex
									sx={{
										height: '100vh',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Loader />
								</Flex>
							)}
						</Flex>
					</form>
				</FormProvider>
			</LayoutContainer>
		</Page>
	)
}
