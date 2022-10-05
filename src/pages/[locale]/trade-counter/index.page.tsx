import React from 'react'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'

import {
	AttributeCard,
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
	ImageRow,
	DescriptionRow,
	LookingForRow,
	CounterOffersTable,
	TradeListingsYouMightLike,
} from 'components/trade-listing-details'

import {
	ArrowLeftIcon,
	AvatarIcon,
	CalendarIcon,
	CreateListingAddIcon,
	WalletIcon,
} from 'assets/icons/mixed'
import useHeaderActions from 'hooks/useHeaderActions'
import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Coin, TradesService } from 'services/api/tradesService'
import { useWallet } from '@terra-money/use-wallet'
import { NFT } from 'services/api/walletNFTsService'
import { noop, sample } from 'lodash'
import { SupportedCollectionsService } from 'services/api'
import { TRADE_STATE } from 'services/blockchain'
import { asyncAction } from 'utils/js/asyncAction'

import {
	ConnectButton,
	LayoutContainer,
	ModalTitle,
	Page,
	ViewNFTsModal,
	ViewNFTsModalProps,
	ViewNFTsModalResult,
} from 'components'
import useAddress from 'hooks/useAddress'
import NFTPreviewImages from 'components/trade-listing-details/NFTPreviewImages'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
const getStaticPaths = makeStaticPaths()

export { getStaticPaths, getStaticProps }

export default function TradeCounter() {
	const { t } = useTranslation(['common', 'trade-listings'])

	const route = useRouter()

	const wallet = useWallet()

	const { tradeId } = route.query ?? {}

	const { data: verifiedCollections } = useQuery(
		['verifiedCollections', wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data: trade, isLoading } = useQuery(
		['trade', tradeId, wallet.network],
		async () => TradesService.getTrade(wallet.network.name, tradeId as string),
		{
			enabled: !!wallet.network,
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

	useHeaderActions(
		<Flex sx={{ gap: '8px', height: '40px' }}>
			<Button variant='gradient' size='medium' href={ROUTES.TRADE_CREATE_LISTING}>
				<CreateListingAddIcon />
				<Box sx={{ display: ['none', 'block'], ml: '8px' }}>
					{t('common:create-listing')}
				</Box>
			</Button>
			<ConnectButton />
		</Flex>
	)

	const handleViewAllNFTs = async () => {
		if (!trade) {
			return
		}
		const [, result] = await asyncAction<ViewNFTsModalResult>(
			NiceModal.show(ViewNFTsModal, {
				nfts: (trade?.tradeInfo.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin),
			} as ViewNFTsModalProps)
		)

		if (result) {
			setTradePreview(oldPrev => ({ ...oldPrev, cw721Coin: result.nft }))
		}
	}

	const myAddress = useAddress()
	const isMyTrade = trade?.tradeInfo?.owner === myAddress

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				{!isLoading ? (
					<>
						<Flex
							sx={{
								justifyContent: 'flex-start',
								padding: '22px 0',
							}}
						>
							<Button
								href={`${ROUTES.TRADE_LISTING_DETAILS}?tradeId=${tradeId}`}
								sx={{ height: '40px', padding: '13px' }}
								variant='secondary'
								startIcon={<ArrowLeftIcon />}
							>
								{t('trade-listings:back-to-listings')}
							</Button>
						</Flex>
						<Row>
							<ModalTitle>
								{t('trade-listings:trade-counter.submit-counter-offer')}
							</ModalTitle>
						</Row>
						<Row>
							{[TRADE_STATE.Cancelled, TRADE_STATE.Accepted].includes(
								tradeInfo?.state as TRADE_STATE
							) && (
								<BlueWarning sx={{ width: '100%', height: '49px' }}>
									{t('trade-listings:item-not-available')}
								</BlueWarning>
							)}
						</Row>

						<Flex
							sx={{ flexDirection: ['column', 'column', 'row'], gap: [0, 0, '32px'] }}
						>
							<Box sx={{ flex: [1, 1, 'unset'], width: ['unset', 'unset', '491px'] }}>
								<ImageRow
									nft={tradePreview?.cw721Coin}
									imageUrl={tradePreview?.cw721Coin?.imageUrl ?? []}
									onLike={noop}
									liked={false}
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
										name={tradePreview?.cw721Coin?.name}
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
												<AttributeCard
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
											<AvatarIcon />
											<Box sx={{ ml: '3px', flex: 1 }}>
												{`''${tradeInfo?.additionalInfo?.ownerComment?.comment ?? ''}''`}
											</Box>
										</DescriptionCardItem>
										<DescriptionCardItem>
											<WalletIcon width='20px' height='20px' color='#fff' />
											<Box
												sx={{
													ml: '9px',
													flex: 1,
												}}
											>
												{tradeInfo?.owner ?? ''}
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
												{t(`trade-listings:listed`, {
													listed: moment(tradeInfo?.additionalInfo?.time ?? '').fromNow(),
												})}
											</Box>
										</DescriptionCardItem>
									</DescriptionCard>
								</Row>
								{Boolean((additionalInfo?.lookingFor ?? []).length) && (
									<Row>
										<LookingForRow lookingFor={additionalInfo?.lookingFor ?? []} />
									</Row>
								)}
								{!isMyTrade && trade && (
									<Row>
										<Button
											disabled={
												![TRADE_STATE.Published, TRADE_STATE.Countered].includes(
													tradeInfo?.state as TRADE_STATE
												)
											}
											size='extraLarge'
											href={`${ROUTES.TRADE_CREATE_COUNTER_LISTING}?tradeId=${tradeId}`}
											fullWidth
											variant='gradient'
										>
											<div>{t('trade-listings:make-offer')}</div>
										</Button>
									</Row>
								)}
							</Box>
						</Flex>

						<Row>
							<CounterOffersTable trade={trade} />
						</Row>
						<TradeListingsYouMightLike
							search={
								tradePreview?.cw721Coin?.collectionName ??
								sample(verifiedCollections ?? [])?.collectionName ??
								''
							}
							tradeId={trade?.tradeId}
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
