import React from 'react'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'

import {
	AttributeCard,
	BlueWarning,
	Button,
	Wallet,
	WalletItem,
} from 'components/ui'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { Box, Flex } from 'theme-ui'
import moment from 'moment'

import {
	Row,
	TradeHeaderActionsRow,
	ImageRow,
	DescriptionRow,
	LookingForRow,
	CounterOffersTable,
} from 'components/trade-listing-details'
import {
	AcceptCounterOfferModal,
	DenyCounterOfferSuccessModal,
	DenyCounterOfferModal,
	AcceptCounterOfferModalProps,
	AcceptCounterOfferModalResult,
	DenyCounterOfferModalProps,
	DenyCounterOfferModalResult,
	DenySuccessModalProps,
} from 'components/trade-listing-details/modals'
import {
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
import { noop } from 'lodash'
import { SupportedCollectionsService } from 'services/api'
import {
	acceptTrade,
	refuseCounterTrade,
	TRADE_STATE,
} from 'services/blockchain'
import { asyncAction } from 'utils/js/asyncAction'

import { CounterTrade } from 'services/api/counterTradesService'
import {
	ConnectButton,
	LayoutContainer,
	Page,
	TxBroadcastingModal,
	ViewNFTsModal,
	ViewNFTsModalProps,
	ViewNFTsModalResult,
} from 'components'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
const getStaticPaths = makeStaticPaths()

export { getStaticPaths, getStaticProps }

export default function ListingDetails() {
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

	const { data: trade } = useQuery(
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
		setTradePreview(additionalInfo?.tradePreview ?? null)
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

	const handleApprove = async (counterTrade: CounterTrade) => {
		const [, result] = await asyncAction<AcceptCounterOfferModalResult>(
			NiceModal.show(AcceptCounterOfferModal, {
				counterTrade,
			} as AcceptCounterOfferModalProps)
		)

		if (result) {
			const acceptTradeResult = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: acceptTrade(
					counterTrade.counterId,
					counterTrade.trade.tradeId,
					result.comment,
					true
				),
			})

			console.warn(acceptTradeResult)

			// TODO: show offer accepted modal
		}
	}

	const handleDeny = async (counterTrade: CounterTrade) => {
		const [, result] = await asyncAction<DenyCounterOfferModalResult>(
			NiceModal.show(DenyCounterOfferModal, {
				counterTrade,
			} as DenyCounterOfferModalProps)
		)

		if (result) {
			const response = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: refuseCounterTrade(
					counterTrade.trade.id,
					counterTrade.counterId,
					result.comment
				),
			})

			console.warn(response)

			await NiceModal.show(DenyCounterOfferSuccessModal, {
				counterTrade,
			} as DenySuccessModalProps)
		}
	}

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

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<TradeHeaderActionsRow trade={trade} />
				<Row>
					{[TRADE_STATE.Cancelled, TRADE_STATE.Accepted].includes(
						tradeInfo?.state as TRADE_STATE
					) && (
						<BlueWarning sx={{ width: '100%', height: '49px' }}>
							{t('trade-listings:item-not-available')}
						</BlueWarning>
					)}
				</Row>
				<ImageRow
					nft={tradePreview?.cw721Coin}
					imageUrl={tradePreview?.cw721Coin?.imageUrl ?? []}
					onLike={noop}
					liked={false}
				/>
				<Row>
					<Button
						fullWidth
						variant='dark'
						onClick={
							handleViewAllNFTs
							// TODO: implement view all NFTs modal
							/* nfts={(associatedAssets || [])
							.filter(nft => nft.cw721Coin)
							.map(({ cw721Coin }) => cw721Coin as NFT)} */
						}
					>
						{t('trade-listings:view-all-nfts')}
					</Button>
				</Row>

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
							{(additionalInfo?.tradePreview?.cw721Coin?.attributes ?? []).map(
								attribute => (
									<AttributeCard
										key={JSON.stringify(attribute)}
										name={attribute.traitType}
										value={attribute.value}
									/>
								)
							)}
						</Flex>
					</Row>
				)}
				<Row>
					<Wallet>
						<WalletItem>
							{tradeInfo?.additionalInfo?.ownerComment?.comment ?? ''}
						</WalletItem>
						<WalletItem>
							<WalletIcon width='20px' height='20px' color='#fff' />
							<Box
								sx={{
									ml: 9,
								}}
							>
								{tradeInfo?.owner ?? ''}
							</Box>
						</WalletItem>
						<WalletItem>
							<CalendarIcon width='20px' height='20px' color='#fff' />
							<Box
								sx={{
									ml: 9,
								}}
							>
								{t(`trade-listings:listed`, {
									listed: moment(tradeInfo?.additionalInfo?.time ?? '').fromNow(),
								})}
							</Box>
						</WalletItem>
					</Wallet>
				</Row>
				{tradeInfo && (
					<Row>
						<LookingForRow lookingFor={additionalInfo?.lookingFor ?? []} />
					</Row>
				)}
				<Row>
					<CounterOffersTable
						tradeId={String(trade?.tradeId) ?? '-1'}
						handleApprove={handleApprove}
						handleDeny={handleDeny}
					/>
				</Row>
			</LayoutContainer>
		</Page>
	)
}
