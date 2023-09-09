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
	Tabs,
	Tab,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Box, Flex } from 'theme-ui'

import { useQuery } from '@tanstack/react-query'
import NiceModal from '@ebay/nice-modal-react'
import useAddress from 'hooks/useAddress'
import { SendTransaction, SenderService } from 'services/api/senderService'
import { SEND_TRANSACTIONS } from 'constants/useQueryKeys'
import { first, groupBy, last, omit } from 'lodash'
import moment from 'moment'
import {
	getNetworkName,
	getTransactionExplorer,
} from 'utils/blockchain/terraUtils'
import getShortText from 'utils/js/getShortText'
import {
	ViewNFTsModal,
	ViewNFTsModalProps,
	ViewNFTsModalResult,
} from 'components/shared'
import { NFT } from 'services/api/walletNFTsService'
import { asyncAction } from 'utils/js/asyncAction'

import EmptyBox from 'assets/images/EmptyBox'
import { SEND_TYPE } from 'constants/sendTypes'
import { AvatarIcon } from 'assets/icons/mixed'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import useNameService from 'hooks/useNameService'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import {
	NameLabel,
	NameServiceImage,
	NameServiceImagePlaceholder,
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
	TabsSection,
} from './styled'

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 45px;
	width: 100%;
`

const EmptyCard = styled(Flex)`
	width: 100%;
	height: 287px;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	background: ${props => props.theme.colors.dark400};
	border-radius: 20px;
`

const EmptyCardTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 24px;
	line-height: 32px;
`

export enum SEND_TYPE_TABS {
	MULTISENDER = 'MULTISENDER',
	AIRDROPPER = 'AIRDROPPER',
	ALL = 'ALL',
}
function SendTransactionsTable({ previewItemsLimit = 4 }) {
	const networkName = getNetworkName()
	const [sendType, setSendType] = React.useState<SEND_TYPE_TABS>(
		SEND_TYPE_TABS.ALL
	)
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
	}, [networkName, sendType])

	const { data: transactions, isLoading } = useQuery(
		[SEND_TRANSACTIONS, networkName, page, sendType, myAddress],
		async () =>
			SenderService.getAllTransactions(
				networkName,
				{
					senders: [myAddress],
					memo: {
						[SEND_TYPE_TABS.AIRDROPPER]: SEND_TYPE.AIRDROP_TYPE,
						[SEND_TYPE_TABS.MULTISENDER]: SEND_TYPE.MULTI_SEND_TYPE,
						[SEND_TYPE_TABS.ALL]: undefined,
					}[sendType],
				},
				{
					limit: 5,
					page,
				}
			),
		{
			enabled: !!myAddress,
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

	const uniqueTransfers = getUniqueTransferred(infiniteData)

	const nameServiceResolutions = useNameService(
		uniqueTransfers.map(ut => ut.recipient)
	)

	return (
		<Container>
			<TabsSection>
				<Tabs
					onChange={e => setSendType(e.target.value as SEND_TYPE_TABS)}
					value={sendType}
					name='listings'
				>
					<Tab value={SEND_TYPE_TABS.ALL}>{t('send-transactions:tabs:all')}</Tab>

					<Tab value={SEND_TYPE_TABS.MULTISENDER}>
						{t('send-transactions:tabs:multisender')}
					</Tab>
					<Tab value={SEND_TYPE_TABS.AIRDROPPER}>
						{t('send-transactions:tabs:airdropper')}
					</Tab>
				</Tabs>
			</TabsSection>
			{infiniteData.length ? (
				<Table>
					<TableHead>
						<TableHeadRow>
							{columns.map(col => (
								<TableHeadRowCell key={col}>{col}</TableHeadRowCell>
							))}
						</TableHeadRow>
					</TableHead>
					<TableBody>
						{uniqueTransfers.map((transaction, index) => {
							const { id } = transaction

							const nfts = (transaction?.sentAssets ?? []).map(
								asset => asset.cw721Token
							)

							const profileImage = nameServiceResolutions[index]?.extension?.image
							const name = nameServiceResolutions[index]?.extension?.name

							return (
								<TableBodyRow key={id} onClick={() => handleViewAllNFTs(nfts)}>
									<TableBodyRowCell>
										<Flex sx={{ gap: '12px', flex: 1 }}>
											<NameServiceImagePlaceholder>
												{profileImage ? (
													<NameServiceImage src={fromIPFSImageURLtoImageURL(profileImage)} />
												) : (
													<AvatarIcon width='100%' height='100%' />
												)}
											</NameServiceImagePlaceholder>
											<div>
												<OverflowTip>
													<NameLabel>{name}</NameLabel>
												</OverflowTip>
												<OverflowTip>
													<div>{first(transaction?.sentAssets)?.recipient ?? ''}</div>
												</OverflowTip>
												<OverflowTip>
													<div>{`"${last(transaction.memo.split(':'))}"`}</div>
												</OverflowTip>
											</div>
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
												minWidth: '172px',
												justifyContent: 'flex-start',
											}}
										>
											<Button
												onClick={async () =>
													window.open(getTransactionExplorer(transaction.txHash), '_blank')
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
			) : (
				<EmptyCard>
					<EmptyBox />
					<EmptyCardTitle>
						{t('send-transactions:no-previous-transactions')}
					</EmptyCardTitle>
				</EmptyCard>
			)}
			<Flex sx={{ mt: '8px' }}>
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
