import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
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
import { Coin } from 'services/api/tradesService'
import { NFT } from 'services/api/walletNFTsService'
import { Flex } from 'theme-ui'
import { amountConverter } from 'utils/blockchain/terraUtils'
import {
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
} from './ListingDetails.styled'

const Title = styled.p`
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;

	text-align: left;
	color: ${props => props.theme.colors.gray1000};
`

const Container = styled(Flex)`
	flex-direction: column;
	gap: 12px;
	padding-bottom: 45px;
	width: 100%;
`

interface CounterOffersTableProps {
	handleApprove: (offer: CounterTrade) => void
	handleDeny: (offer: CounterTrade) => void
	tradeId: string
}
export default function CounterOffersTable({
	handleApprove,
	handleDeny,
	tradeId,
}: CounterOffersTableProps) {
	const wallet = useWallet()
	const previewItemsLimit = 5

	const [page, setPage] = React.useState(1)

	// TODO extract this into hook, along with useQuery part.
	const [infiniteData, setInfiniteData] = React.useState<CounterTrade[]>([])
	React.useEffect(() => {
		setInfiniteData([])
		setPage(1)
	}, [wallet.network, tradeId])

	const { data: counterTrades, isLoading } = useQuery(
		['trades', wallet.network, page, tradeId],
		async () =>
			CounterTradesService.getAllCounterTrades(
				wallet.network.name,
				{
					tradeIds: [tradeId],
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

	const { t } = useTranslation(['common', 'trade-listings'])
	const columns: Array<string> = t(
		'trade-listings:counter-offers.table.columns',
		{
			returnObjects: true,
		}
	)

	return (
		<Container>
			<Title>{t('trade-listings:counter-offers.title')}</Title>
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
