import styled from '@emotion/styled'

import {
	Table,
	TableHead,
	TableHeadRow,
	TableHeadRowCell,
	TableBody,
	TableBodyRow,
	TableBodyRowCell,
	OverflowTip,
	Button,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Box, Flex } from 'theme-ui'

import { useQuery } from '@tanstack/react-query'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import NiceModal from '@ebay/nice-modal-react'
import useAddress from 'hooks/useAddress'
import { SendTransaction, SenderService } from 'services/api/senderService'
import { useWallet } from '@terra-money/use-wallet'
import { SEND_TRANSACTIONS } from 'constants/use-query-keys'
import { first, groupBy, omit } from 'lodash'
import moment from 'moment'
import { getTerraUrlForTxId } from 'utils/blockchain/terraUtils'
import getShortText from 'utils/js/getShortText'
import {
	ViewNFTsModal,
	ViewNFTsModalProps,
	ViewNFTsModalResult,
} from 'components/shared'
import { NFT } from 'services/api/walletNFTsService'
import { asyncAction } from 'utils/js/asyncAction'
import {
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
} from './styled'

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 45px;
	width: 100%;
`

function SendTransactionsTable({ previewItemsLimit = 4 }) {
	const wallet = useWallet()
	const { t } = useTranslation(['common', 'send-transactions'])
	const columns: Array<string> = t(
		'send-transactions:transactions.table.columns',
		{
			returnObjects: true,
		}
	)

	const [page, setPage] = React.useState(1)
	const [infiniteData, setInfiniteData] = React.useState<SendTransaction[]>([])
	const myAddress = useAddress()

	const handleViewAllNFTs = async (nfts: NFT[]) => {
		await asyncAction<ViewNFTsModalResult>(
			NiceModal.show(ViewNFTsModal, {
				nfts,
				title: t('common:all-nfts'),
			} as ViewNFTsModalProps)
		)
	}

	React.useEffect(() => {
		setInfiniteData([])
		setPage(1)
	}, [wallet.network])

	const { data: transactions, isLoading } = useQuery(
		[SEND_TRANSACTIONS, wallet.network, page],
		async () =>
			SenderService.getAllTransactions(
				wallet.network.name,
				{
					senders: [myAddress],
				},
				{
					limit: 5,
					page,
				}
			),
		{
			enabled: !!wallet.network && !!myAddress,
			retry: true,
		}
	)

	const getUniqueTransferred = React.useCallback((data: SendTransaction[]) => {
		const parsed = (data ?? []).flatMap(transaction =>
			(transaction?.sentAssets ?? []).map(asset => ({
				...asset,
				...omit(transaction, 'sentAssets'),
				id: `${transaction.id}_${asset.cw721Token?.collectionAddress}_${asset.cw721Token?.tokenId}`,
			}))
		)

		return Object.values(
			groupBy(parsed, tx => `${tx.recipient}_${tx.txHash}`)
		).map(assets => ({
			...omit(first(assets), 'cw721Token'),
			sentAssets: assets,
		}))
	}, [])

	React.useEffect(
		() =>
			transactions && setInfiniteData(prev => [...prev, ...transactions.data]),
		[transactions]
	)

	return (
		<Container>
			<Table>
				<TableHead>
					<TableHeadRow>
						{columns.map(col => (
							<TableHeadRowCell key={col}>{col}</TableHeadRowCell>
						))}
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{getUniqueTransferred(infiniteData).map(transaction => {
						const { id } = transaction

						const nfts = (transaction?.sentAssets ?? []).map(
							asset => asset.cw721Token
						)

						return (
							<TableBodyRow key={id} onClick={() => handleViewAllNFTs(nfts)}>
								<TableBodyRowCell style={{ verticalAlign: 'top' }}>
									<Flex
										sx={{
											maxWidth: '354px',
											flex: 1,
											flexDirection: 'column',
										}}
									>
										<OverflowTip>
											<div>{first(transaction?.sentAssets)?.recipient ?? ''}</div>
										</OverflowTip>
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											flex: 1,
											maxWidth: '144px',
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
											minWidth: '160px',
											justifyContent: 'flex-start',
										}}
									>
										{getShortText(transaction.txHash, 6)}
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Box sx={{ textTransform: 'capitalize' }}>
										<Flex
											sx={{
												minWidth: '100px',
												justifyContent: 'flex-start',
											}}
										>
											{moment(transaction.date).fromNow()}
										</Flex>
									</Box>
								</TableBodyRowCell>
								<TableBodyRowCell
									onClick={e => {
										e.stopPropagation()
										e.preventDefault()
									}}
								>
									<Flex
										sx={{
											minWidth: '180px',
											justifyContent: 'flex-start',
										}}
									>
										<Button
											onClick={async () =>
												window.open(getTerraUrlForTxId(transaction.txHash), '_blank')
											}
											variant='secondary'
										>
											{t('common:view-transaction')}
										</Button>
									</Flex>
								</TableBodyRowCell>
							</TableBodyRow>
						)
					})}
				</TableBody>
			</Table>
			<Flex sx={{ mt: '32px' }}>
				{transactions?.data && !!transactions.data?.length && !isLoading && (
					<Button
						disabled={transactions?.page === transactions.pageCount}
						fullWidth
						variant='dark'
						onClick={() => setPage(prev => prev + 1)}
					>
						{t('common:show-more')}
					</Button>
				)}
			</Flex>
		</Container>
	)
}

SendTransactionsTable.defaultProps = {
	raffle: undefined,
}

export default SendTransactionsTable
