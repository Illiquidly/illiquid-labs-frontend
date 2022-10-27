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
import moment from 'moment'

import {
	Row,
	RaffleHeaderActionsRow,
	RaffleParticipantsTable,
	RaffleListingsYouMightLike,
	AttributeCard,
	AttributeName,
	AttributeValue,
	AttributesCard,
} from 'components/raffle-listing-details'

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
import { SupportedCollectionsService } from 'services/api'
import { asyncAction } from 'utils/js/asyncAction'

import {
	DescriptionRow,
	ImageRow,
	LayoutContainer,
	Page,
	TxBroadcastingModal,
	ViewNFTsModal,
	ViewNFTsModalProps,
	ViewNFTsModalResult,
} from 'components'
import useAddress from 'hooks/useAddress'
import NFTPreviewImages from 'components/shared/nft-preview-images/NFTPreviewImages'
import {
	FAVORITES_RAFFLES,
	RAFFLE,
	VERIFIED_COLLECTIONS,
} from 'constants/use-query-keys'
import { NetworkType } from 'types'
import { FavoriteRafflesService } from 'services/api/favoriteRafflesService'
import { RafflesService, RAFFLE_STATE } from 'services/api/rafflesService'
import CreateRaffleListing from 'components/shared/header-actions/create-raffle-listing/CreateRaffleListing'
import { RafflesContract } from 'services/blockchain'

const getStaticProps = makeStaticProps(['common', 'raffle-listings'])
const getStaticPaths = makeStaticPaths()

export { getStaticPaths, getStaticProps }

export default function ListingDetails() {
	const { t } = useTranslation(['common', 'raffle-listings'])

	const route = useRouter()

	const wallet = useWallet()

	const queryClient = useQueryClient()

	const { raffleId } = route.query ?? {}

	const { mutate: addFavoriteRaffle } = useMutation(
		FavoriteRafflesService.addFavoriteRaffle,
		{
			onSuccess: data => {
				queryClient.setQueryData(
					[FAVORITES_RAFFLES, wallet.network],
					(old: any) => [...old.filter(o => o.id !== data.id), data]
				)
			},
		}
	)

	const { mutate: removeFavoriteRaffle } = useMutation(
		FavoriteRafflesService.removeFavoriteRaffle,
		{
			onSuccess: data => {
				queryClient.setQueryData(
					[FAVORITES_RAFFLES, wallet.network],
					(old: any) => [...old.filter(o => o.id !== data.id), data]
				)
			},
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
		data: raffle,
		isLoading,
		refetch,
	} = useQuery(
		[RAFFLE, raffleId, wallet.network],
		async () => RafflesService.getRaffle(wallet.network.name, raffleId as string),
		{
			enabled: !!wallet.network,
			retry: true,
			refetchInterval: 60 * 1000, // Refetch every minute
		}
	)

	const myAddress = useAddress()

	const { data: favoriteRaffles } = useQuery(
		[FAVORITES_RAFFLES, wallet.network],
		async () =>
			FavoriteRafflesService.getFavoriteRaffles(
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

	const { raffleInfo } = raffle ?? {}
	const { raffleOptions } = raffleInfo ?? {}

	const [rafflePreview, setRafflePreview] = React.useState<{
		cw721Coin?: NFT
		cw1155Coin?: any
	} | null>(null)

	React.useEffect(() => {
		if (raffle) {
			setRafflePreview(raffleOptions?.rafflePreview ?? null)
		}
	}, [raffle])

	useHeaderActions(<CreateRaffleListing />)

	const handleViewAllNFTs = async () => {
		if (!raffle) {
			return
		}
		const [, result] = await asyncAction<ViewNFTsModalResult>(
			NiceModal.show(ViewNFTsModal, {
				nfts: (raffleInfo?.allAssociatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin),
				title: t('common:all-nfts'),
			} as ViewNFTsModalProps)
		)

		if (result) {
			setRafflePreview(oldPrev => ({ ...oldPrev, cw721Coin: result.nft }))
		}
	}

	const isMyRaffle = raffleInfo?.owner === myAddress

	const liked = Boolean(
		(favoriteRaffles ?? []).find(
			favoriteRaffle =>
				favoriteRaffle.raffles.some(
					fRaffle => fRaffle.raffleId === Number(raffleId)
				) && favoriteRaffle.user === myAddress
		)
	)

	const toggleLike = () =>
		liked
			? removeFavoriteRaffle({
					network: wallet.network.name as NetworkType,
					raffleId: [Number(raffleId)],
					user: myAddress,
			  })
			: addFavoriteRaffle({
					network: wallet.network.name as NetworkType,
					raffleId: [Number(raffleId)],
					user: myAddress,
			  })

	const purchaseTicket = async () => {
		if (!raffle) {
			return
		}

		const ticketNumber = 1

		const { coin, cw20Coin } = raffleInfo?.raffleTicketPrice ?? {}

		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: RafflesContract.purchaseRaffleTickets(
				raffle?.raffleId,
				ticketNumber,
				coin,
				cw20Coin
			),
			closeOnFinish: true,
		})

		refetch()
	}

	const drawTicket = async () => {
		if (!raffle) {
			return
		}

		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: RafflesContract.drawRaffle(raffle?.raffleId),
			closeOnFinish: true,
		})

		refetch()
	}

	const ticketsSold =
		(raffleOptions?.maxParticipantNumber ?? 0) -
		(raffle?.participants ?? [])
			.map(p => p.ticketNumber)
			.reduce((a, b) => a + b, 0)

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				{!isLoading ? (
					<>
						<RaffleHeaderActionsRow raffle={raffle} />
						<Row>
							{![RAFFLE_STATE.Started, RAFFLE_STATE.Created].includes(
								raffleInfo?.state as RAFFLE_STATE
							) && (
								<BlueWarning sx={{ width: '100%', height: '49px' }}>
									{t('raffle-listings:item-not-available')}
								</BlueWarning>
							)}
						</Row>

						<Flex
							sx={{ flexDirection: ['column', 'column', 'row'], gap: [0, 0, '32px'] }}
						>
							<Box sx={{ flex: [1, 1, 'unset'], width: ['unset', 'unset', '491px'] }}>
								<ImageRow
									nft={rafflePreview?.cw721Coin}
									imageUrl={rafflePreview?.cw721Coin?.imageUrl ?? []}
									onLike={toggleLike}
									liked={liked}
								/>

								<Row>
									<Button fullWidth variant='dark' onClick={handleViewAllNFTs}>
										<Flex sx={{ alignItems: 'center' }}>
											<NFTPreviewImages
												nfts={(raffleInfo?.allAssociatedAssets ?? [])
													.filter(asset => asset.cw721Coin)
													.map(({ cw721Coin }) => cw721Coin as NFT)}
											/>
											<div>{t('raffle-listings:view-all-nfts')}</div>
										</Flex>
									</Button>
								</Row>
							</Box>
							<Box sx={{ flex: 1 }}>
								<Row>
									<DescriptionRow
										isPrivate={false}
										name={rafflePreview?.cw721Coin?.name}
										collectionName={rafflePreview?.cw721Coin?.collectionName ?? ''}
										verified={(verifiedCollections ?? []).some(
											({ collectionAddress }) =>
												rafflePreview?.cw721Coin?.collectionAddress === collectionAddress
										)}
									/>
								</Row>
								{Boolean(rafflePreview?.cw721Coin?.attributes?.length) && (
									<Row>
										<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
											{(rafflePreview?.cw721Coin?.attributes ?? []).map(attribute => (
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
												<AvatarIcon />
												<Box sx={{ ml: '3px', flex: 1 }}>
													{`''${raffleOptions?.comment ?? ''}''`}
												</Box>
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
												{raffleInfo?.owner ?? ''}
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
												{t(`raffle-listings:listed`, {
													listed: moment(
														raffleInfo?.raffleOptions?.raffleStartDate ?? ''
													).fromNow(),
												})}
											</Box>
										</DescriptionCardItem>
									</DescriptionCard>
								</Row>

								<Row>
									<AttributesCard>
										<AttributeCard>
											<AttributeName>
												{t('raffle-listings:raffle-start-date')}
											</AttributeName>
											<AttributeValue>
												{moment(raffleInfo?.raffleOptions?.raffleStartDate ?? '').format(
													'L'
												)}
											</AttributeValue>
										</AttributeCard>
										<AttributeCard>
											<AttributeName>{t('raffle-listings:raffle-ends-in')}</AttributeName>
											<AttributeValue>
												{moment(raffleInfo?.raffleOptions?.raffleStartDate)
													.add(raffleInfo?.raffleOptions?.raffleDuration ?? 0, 'seconds')
													.fromNow()}
											</AttributeValue>
										</AttributeCard>
										<AttributeCard>
											<AttributeName>
												{t('raffle-listings:raffle-ticket-cost')}
											</AttributeName>
											<AttributeValue>
												{raffleInfo?.raffleTicketPrice?.coin?.amount ??
													raffleInfo?.raffleTicketPrice?.cw20Coin?.amount ??
													''}{' '}
												{raffleInfo?.raffleTicketPrice?.coin?.currency ??
													raffleInfo?.raffleTicketPrice?.cw20Coin?.currency ??
													''}
												<Box sx={{ ml: 8 }}>
													<LunaIcon />
												</Box>
											</AttributeValue>
										</AttributeCard>
										<AttributeCard>
											<AttributeName>
												{t('raffle-listings:raffle-tickets-remaining')}
											</AttributeName>
											<AttributeValue>
												{ticketsSold}
												{raffleOptions?.maxParticipantNumber
													? `/ ${raffleOptions?.maxParticipantNumber}`
													: ''}
											</AttributeValue>
										</AttributeCard>
									</AttributesCard>
								</Row>

								{!isMyRaffle &&
									raffle &&
									ticketsSold <
										(raffleOptions?.maxParticipantNumber ?? Number.POSITIVE_INFINITY) &&
									[RAFFLE_STATE.Started].includes(raffleInfo?.state as RAFFLE_STATE) && (
										<Row>
											<Button
												size='extraLarge'
												onClick={purchaseTicket}
												fullWidth
												variant='gradient'
											>
												<div>{t('raffle-listings:buy-raffle-ticket')}</div>
											</Button>
										</Row>
									)}

								{raffle &&
									[RAFFLE_STATE.Finished].includes(raffleInfo?.state as RAFFLE_STATE) &&
									(raffleInfo?.winner === myAddress ||
										(raffle.participants ?? []).some(p => p.user === myAddress)) && (
										<Row>
											<Button
												size='extraLarge'
												onClick={drawTicket}
												fullWidth
												variant='gradient'
											>
												<div>{t('raffle-listings:draw-raffle-ticket')}</div>
											</Button>
										</Row>
									)}
							</Box>
						</Flex>

						<Row>
							<RaffleParticipantsTable raffle={raffle} />
						</Row>
						<RaffleListingsYouMightLike
							search={
								rafflePreview?.cw721Coin?.collectionName ??
								sample(verifiedCollections ?? [])?.collectionName ??
								''
							}
							raffleId={raffle?.raffleId}
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
