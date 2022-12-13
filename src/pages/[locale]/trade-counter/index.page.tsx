import React from 'react'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'

import {
	Button,
	Card,
	DescriptionCard,
	DescriptionCardItem,
	Loader,
} from 'components/ui'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { Box, Flex } from 'theme-ui'
import moment from 'moment'

import {
	HorizontalTradeLine,
	Row,
	VerticalTradeLine,
} from 'components/trade-listing-details'

import {
	ArrowLeftIcon,
	AvatarIcon,
	CalendarIcon,
	WalletIcon,
} from 'assets/icons/mixed'
import useHeaderActions from 'hooks/useHeaderActions'
import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Coin, TradesService } from 'services/api/tradesService'
import { useWallet } from '@terra-money/use-wallet'
import { NFT } from 'services/api/walletNFTsService'
import { CounterTradesService, SupportedCollectionsService } from 'services/api'
import { asyncAction } from 'utils/js/asyncAction'

import {
	DescriptionRow,
	ImageRow,
	LayoutContainer,
	ModalTitle,
	Page,
	ViewNFTsModal,
	ViewNFTsModalProps,
	ViewNFTsModalResult,
	AttributeCard as PrimaryAttributeCard,
	TxBroadcastingModal,
	LinkButton,
} from 'components'
import NFTPreviewImages from 'components/shared/nft-preview-images/NFTPreviewImages'
import {
	FAVORITES_TRADES,
	TRADE,
	VERIFIED_COLLECTIONS,
} from 'constants/useQueryKeys'
import CreateTradeListing from 'components/shared/header-actions/create-trade-listing/CreateTradeListing'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import SelectNFTs from 'components/trade-counter/SelectNFTs'

import { TxReceipt } from 'services/blockchain/blockchain.interface'
import {
	SubmitCounterOfferModal,
	SubmitCounterOfferModalProps,
} from 'components/trade-counter/modals'
import SubmitCounterOfferSuccessModal, {
	SubmitCounterOfferSuccessModalProps,
} from 'components/trade-counter/modals/submit-counter-offer-success/SubmitCounterOfferSuccessModal'
import { FavoriteTradesService } from 'services/api/favoriteTradesService'
import { NetworkType } from 'types'
import useAddress from 'hooks/useAddress'
import terraUtils, { amountConverter } from 'utils/blockchain/terraUtils'
import { TradeCounterValidationSchema } from 'constants/validation-schemas/trade-counter'
import { TradeCounterForm } from 'types/trade-counter'
import { P2PTradingContract } from 'services/blockchain'
import { theme } from 'constants/theme'

const getStaticProps = makeStaticProps(['common', 'trade-listings', 'trade'])
const getStaticPaths = makeStaticPaths()

export { getStaticPaths, getStaticProps }

export default function TradeCounter() {
	const { t } = useTranslation(['common', 'trade-listings'])

	const route = useRouter()

	const wallet = useWallet()

	const { tradeId } = route.query ?? {}

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

	const { data: verifiedCollections } = useQuery(
		[VERIFIED_COLLECTIONS, wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data: trade, isLoading } = useQuery(
		[TRADE, tradeId, wallet.network],
		async () => TradesService.getTrade(wallet.network.name, tradeId as string),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data: favoriteTrades } = useQuery(
		[FAVORITES_TRADES, wallet.network, myAddress],
		async () =>
			FavoriteTradesService.getFavoriteTrades(
				{ network: wallet.network.name as NetworkType },
				{
					users: [myAddress],
				}
			),
		{
			enabled: !!wallet.network && !!myAddress,
			retry: true,
		}
	)

	const { tradeInfo } = trade ?? {}
	const { additionalInfo, whitelistedUsers } = tradeInfo ?? {}

	const [tradePreview, setTradePreview] = React.useState<{
		coin?: Coin
		cw721Coin?: NFT
		cw1155Coin?: any
	} | null>(null)

	React.useEffect(() => {
		if (trade) {
			setTradePreview(additionalInfo?.tradePreview ?? null)
		}
	}, [trade])

	useHeaderActions(<CreateTradeListing />)

	const formMethods = useForm<TradeCounterForm>({
		mode: 'all',
		resolver: yupResolver(TradeCounterValidationSchema),
		defaultValues: {
			selectedNFTs: [],
			tokenName: 'Luna',
		},
	})

	const handleViewAllNFTs = async () => {
		if (!trade) {
			return
		}
		const [, result] = await asyncAction<ViewNFTsModalResult>(
			NiceModal.show(ViewNFTsModal, {
				nfts: (trade?.tradeInfo.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin),
				title: t('common:all-nfts'),
			} as ViewNFTsModalProps)
		)

		if (result) {
			setTradePreview(oldPrev => ({ ...oldPrev, cw721Coin: result.nft }))
		}
	}

	const onSubmit = async ({ comment, selectedNFTs, tokenAmount, tokenName }) => {
		if (!tradeId) {
			return
		}

		const assets = [
			...selectedNFTs.map(({ collectionAddress, tokenId }) => ({
				cw721Coin: {
					address: collectionAddress,
					tokenId,
				},
			})),
			...(tokenAmount
				? [
						{
							coin: {
								amount:
									amountConverter.default.userFacingToBlockchainValue(tokenAmount),
								denom: terraUtils.getDenomForCurrency(tokenName),
							},
						},
				  ]
				: []),
		]

		const fees = await P2PTradingContract.simulateTradeFee({
			tradeId: Number(tradeId),
			counterAssets: assets,
		})

		const [, result] = await asyncAction(
			NiceModal.show(SubmitCounterOfferModal, {
				counterTradeNFTs: selectedNFTs,
				counterTradeCoins: [
					...(tokenAmount
						? [
								{
									amount: tokenAmount,
									currency: tokenName,
								},
						  ]
						: []),
				],
				trade,
				fees,
			} as SubmitCounterOfferModalProps)
		)

		if (result) {
			const {
				counterId,
			}: {
				tradeId: string
				counterId: string
			} & TxReceipt = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: P2PTradingContract.listCounterTradeOffer({
					tradeId: Number(tradeId),
					comment,
					cw721Tokens: selectedNFTs,
					amountNative: tokenAmount,
				}),
				closeOnFinish: true,
			})

			formMethods.reset()

			await Promise.all([
				CounterTradesService.getCounterTrade(
					wallet.network.name,
					tradeId as string,
					counterId
				),
				NiceModal.show(SubmitCounterOfferSuccessModal, {
					trade,
				} as SubmitCounterOfferSuccessModalProps),
			])
		}
	}

	const liked = Boolean(
		(favoriteTrades ?? []).find(
			favoriteTrade =>
				favoriteTrade.trades.some(fTrade => fTrade.tradeId === Number(tradeId)) &&
				favoriteTrade.user === myAddress
		)
	)

	const toggleLike = () =>
		({ addFavoriteTrade, removeFavoriteTrade }[
			liked ? 'removeFavoriteTrade' : 'addFavoriteTrade'
		]({
			network: wallet.network.name as NetworkType,
			tradeId: [Number(tradeId)],
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
											href={`${ROUTES.TRADE_LISTING_DETAILS}?tradeId=${tradeId}`}
											sx={{ height: '40px', padding: '13px' }}
											variant='secondary'
											startIcon={<ArrowLeftIcon />}
										>
											{t('trade-listings:back-to-listing')}
										</LinkButton>
									</Flex>
									<Row>
										<ModalTitle>
											{t('trade-listings:trade-counter.submit-counter-offer')}
										</ModalTitle>
									</Row>
									<Flex sx={{ flexDirection: ['column', 'column', 'row'] }}>
										<Flex
											sx={{
												flex: 1,
												order: [1, 1, 3],
											}}
										>
											<Box sx={{ width: '100%' }}>
												<SelectNFTs />
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
											<HorizontalTradeLine />
										</Box>

										<Box
											sx={{
												order: 2,
												minHeight: '100%',
												display: ['none', 'none', 'block'],
											}}
										>
											<VerticalTradeLine />
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
													nft={tradePreview?.cw721Coin}
													imageUrl={tradePreview?.cw721Coin?.imageUrl ?? []}
													onLike={toggleLike}
													liked={liked}
												/>

												<Row>
													<Button fullWidth variant='dark' onClick={handleViewAllNFTs}>
														<Flex sx={{ alignItems: 'center' }}>
															<NFTPreviewImages
																nfts={(tradeInfo?.associatedAssets ?? [])
																	.filter(asset => asset.cw721Coin)
																	.map(({ cw721Coin }) => cw721Coin as NFT)}
															/>
															<div>{t('trade-listings:view-all-nfts')}</div>
														</Flex>
													</Button>
												</Row>
											</Box>
											<Box sx={{ flex: 1 }}>
												<Row>
													<DescriptionRow
														name={
															<Box
																sx={{
																	fontSize: [null, null, '30px'],
																	lineHeight: [null, null, '32px'],
																}}
															>
																{tradePreview?.cw721Coin?.name}
															</Box>
														}
														isPrivate={(whitelistedUsers ?? []).length > 0}
														collectionName={tradePreview?.cw721Coin?.collectionName ?? ''}
														verified={(verifiedCollections ?? []).some(
															({ collectionAddress }) =>
																tradePreview?.cw721Coin?.collectionAddress === collectionAddress
														)}
													/>
												</Row>
												{Boolean(tradePreview?.cw721Coin?.attributes?.length) && (
													<Row>
														<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
															{(tradePreview?.cw721Coin?.attributes ?? []).map(attribute => (
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
																	{`''${
																		tradeInfo?.additionalInfo?.ownerComment?.comment ?? ''
																	}''`}
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
																{tradeInfo?.owner ?? ''}
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
																{t(`trade-listings:listed`, {
																	listed: moment(
																		tradeInfo?.additionalInfo?.time ?? ''
																	).fromNow(),
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
						</Flex>{' '}
					</form>
				</FormProvider>
			</LayoutContainer>
		</Page>
	)
}
