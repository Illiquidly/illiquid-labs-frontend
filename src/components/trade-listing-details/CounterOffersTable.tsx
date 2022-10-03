import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import NiceModal from '@ebay/nice-modal-react'
import {
	Table,
	TableHead,
	TableHeadRow,
	TableHeadRowCell,
	TableBody,
	TableBodyRow,
	TableBodyRowCell,
	Button,
} from 'components/ui'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React from 'react'
import {
	CounterTrade,
	CounterTradesService,
} from 'services/api/counterTradesService'
import { Coin, Trade } from 'services/api/tradesService'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import { amountConverter } from 'utils/blockchain/terraUtils'
import {
	acceptTrade,
	cancelCounterTradeAndWithdraw,
	confirmCounterTrade,
	refuseCounterTrade,
	TRADE_STATE,
	withdrawAcceptedTrade,
	withdrawAllFromCounter,
} from 'services/blockchain'
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
import { asyncAction } from 'utils/js/asyncAction'
import { TxBroadcastingModal } from 'components/shared'
import {
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
} from './ListingDetails.styled'

const Title = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;

	text-align: left;
	color: ${props => props.theme.colors.gray1000};
`

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 45px;
	width: 100%;
`

interface CounterOffersTableProps {
	trade?: Trade
}
function CounterOffersTable({ trade }: CounterOffersTableProps) {
	const wallet = useWallet()
	const previewItemsLimit = 5

	const [page, setPage] = React.useState(1)

	const { tradeId } = trade ?? {}

	// TODO extract this into hook, along with useQuery part.
	const [infiniteData, setInfiniteData] = React.useState<CounterTrade[]>([])

	React.useEffect(() => {
		setInfiniteData([])
		setPage(1)
	}, [wallet.network, tradeId])

	const {
		data: counterTrades,
		isLoading,
		refetch,
	} = useQuery(
		['trades', wallet.network, page, tradeId],
		async () =>
			CounterTradesService.getAllCounterTrades(
				wallet.network.name,
				{
					tradeIds: [`${tradeId}`],
				},
				{
					limit: 20,
					page,
				}
			),
		{
			enabled: !!wallet.network && !!tradeId,
			retry: true,
		}
	)

	React.useEffect(
		() =>
			counterTrades && setInfiniteData(prev => [...prev, ...counterTrades.data]),
		[counterTrades]
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
				closeOnFinish: true,
			})

			setInfiniteData([])
			refetch()

			console.warn(acceptTradeResult)

			// TODO: show offer accepted modal
		}
	}

	const withdrawCounterTrade = async (counterTrade: CounterTrade) => {
		if (!tradeId) {
			return
		}

		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: withdrawAllFromCounter(tradeId, counterTrade?.counterId),
			closeOnFinish: true,
		})
	}

	const cancelCounterTrade = async (counterTrade: CounterTrade) => {
		if (!tradeId) {
			return
		}

		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: cancelCounterTradeAndWithdraw(
				counterTrade?.counterId,
				tradeId
			),
			closeOnFinish: true,
		})
	}

	const handleDeny = async (counterTrade: CounterTrade) => {
		const [, result] = await asyncAction<DenyCounterOfferModalResult>(
			NiceModal.show(DenyCounterOfferModal, {
				counterTrade,
			} as DenyCounterOfferModalProps)
		)

		if (result) {
			await NiceModal.show(TxBroadcastingModal, {
				transactionAction: refuseCounterTrade(
					counterTrade.trade.id,
					counterTrade.counterId,
					result.comment
				),
				closeOnFinish: true,
			})

			setInfiniteData([])
			refetch()

			await NiceModal.show(DenyCounterOfferSuccessModal, {
				counterTrade,
			} as DenySuccessModalProps)
		}
	}

	const withdrawAccepted = async () => {
		if (!tradeId) {
			return
		}
		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: withdrawAcceptedTrade(tradeId),
			closeOnFinish: true,
		})
	}

	const confirmCounter = async (counterTrade: CounterTrade) => {
		if (!tradeId) {
			return
		}

		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: confirmCounterTrade(counterTrade?.counterId, tradeId),
			closeOnFinish: true,
		})
	}

	const { t } = useTranslation(['common', 'trade-listings'])
	const columns: Array<string> = t(
		'trade-listings:counter-offers.table.columns',
		{
			returnObjects: true,
		}
	)

	const myAddress = wallet.wallets[0]?.terraAddress ?? ''
	const isMyTrade = trade?.tradeInfo?.owner === myAddress

	return (
		<Container>
			<Box sx={{ padding: '8px 0' }}>
				<Title>{t('trade-listings:counter-offers.title')}</Title>
			</Box>
			<Table>
				<TableHead>
					<TableHeadRow>
						{columns.map(col => (
							<TableHeadRowCell key={col}>{col}</TableHeadRowCell>
						))}
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{infiniteData.map(counterTrade => {
						const isMyCounterTrade = counterTrade?.tradeInfo?.owner === myAddress

						const { id, tradeInfo } = counterTrade
						const nfts = (tradeInfo.associatedAssets ?? [])
							.filter(x => x.cw721Coin)
							.map(x => x.cw721Coin) as NFT[]

						const coins = (tradeInfo.associatedAssets ?? [])
							.filter(x => x.coin)
							.map(x => x.coin) as Coin[]

						return (
							<TableBodyRow key={id}>
								<TableBodyRowCell>
									<Flex
										sx={{
											minWidth: '314px',
											justifyContent: 'flex-start',
										}}
									>
										<p>{tradeInfo?.owner ?? ''}</p>
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											width: '100%',
											justifyContent: 'flex-start',
										}}
									>
										<PreviewNFTsSection>
											{nfts.slice(0, previewItemsLimit).map(nft => (
												<PreviewImageContainer
													key={`${nft.collectionAddress}_${nft.tokenId}`}
												>
													{nft.imageUrl?.every(img => img === '') ? (
														<ImagePlaceholder width='18px' height='18px' />
													) : (
														<PreviewImage src={nft.imageUrl ?? []} />
													)}
												</PreviewImageContainer>
											))}
											{(nfts || []).slice(previewItemsLimit).length
												? `+${(nfts || []).slice(previewItemsLimit).length}`
												: ''}
										</PreviewNFTsSection>
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											minWidth: '100px',
											justifyContent: 'flex-start',
										}}
									>
										{!coins.length && '-'}
										{coins.map(
											({ amount, denom }) =>
												`${amountConverter.luna.blockchainValueToUserFacing(
													amount
												)}${denom.substring(1)}`
										)}
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											minWidth: '100px',
											justifyContent: 'flex-start',
										}}
									>
										{moment(tradeInfo.additionalInfo.time).fromNow()}
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											gap: '12px',
										}}
									>
										{/* When trade is countered and I am the offerer and counter trade is
										published. 
											* I can refuse/deny counter trade.
											* I can accept/approve trade offer.
										*/}
										{isMyTrade &&
											[TRADE_STATE.Countered].includes(tradeInfo?.state) &&
											!isMyCounterTrade &&
											[TRADE_STATE.Published].includes(counterTrade?.tradeInfo.state) && (
												<>
													<Button
														fullWidth
														variant='primary'
														onClick={() => handleApprove(counterTrade)}
													>
														{t('trade-listings:counter-offers.table.approve')}
													</Button>

													<Button
														onClick={() => handleDeny(counterTrade)}
														variant='secondary'
														fullWidth
													>
														{t('trade-listings:counter-offers.table.deny')}
													</Button>
												</>
											)}
										{/* 
											When trade is not mine, trade is any state, my counter trade is refused (not accepted) or cancelled I can
											* Withdraw my assets from counter trade.
										*/}
										{!isMyTrade &&
											isMyCounterTrade &&
											!counterTrade?.tradeInfo?.assetsWithdrawn &&
											[TRADE_STATE.Refused, TRADE_STATE.Cancelled].includes(
												counterTrade?.tradeInfo?.state
											) && (
												<Button onClick={async () => withdrawCounterTrade(counterTrade)}>
													{t('common:withdraw')}
												</Button>
											)}

										{/* When trade is not mine, in any state, my counter trade is published I can
										 * Cancel and withdraw from counter trade.
										 */}
										{!isMyTrade &&
											isMyCounterTrade &&
											[TRADE_STATE.Published].includes(counterTrade?.tradeInfo?.state) && (
												<Button onClick={() => cancelCounterTrade(counterTrade)}>
													{t('common:remove')}
												</Button>
											)}

										{isMyTrade &&
											[TRADE_STATE.Accepted].includes(tradeInfo?.state) &&
											!isMyCounterTrade &&
											[TRADE_STATE.Accepted].includes(counterTrade?.tradeInfo?.state) &&
											!counterTrade?.tradeInfo?.assetsWithdrawn && (
												<Button onClick={withdrawAccepted}>{t('common:withdraw')}</Button>
											)}

										{!isMyTrade &&
											isMyCounterTrade &&
											!counterTrade?.tradeInfo?.assetsWithdrawn &&
											![TRADE_STATE.Accepted].includes(tradeInfo?.state) &&
											[TRADE_STATE.Created].includes(counterTrade?.tradeInfo?.state) && (
												<>
													<Button onClick={async () => confirmCounter(counterTrade)}>
														{t('common:publish')}
													</Button>
												</>
											)}
									</Flex>
								</TableBodyRowCell>
							</TableBodyRow>
						)
					})}
				</TableBody>
			</Table>
			{counterTrades?.data && !!counterTrades.data?.length && !isLoading && (
				<Button
					disabled={counterTrades?.page === counterTrades.pageCount}
					fullWidth
					variant='dark'
					onClick={() => setPage(prev => prev + 1)}
				>
					{t('common:show-more')}
				</Button>
			)}
		</Container>
	)
}

CounterOffersTable.defaultProps = {
	trade: undefined,
}

export default CounterOffersTable
