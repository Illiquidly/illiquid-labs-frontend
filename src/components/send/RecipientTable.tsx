import styled from '@emotion/styled'
import {
	Button,
	OverflowTip,
	Table,
	TableBody,
	TableBodyRow,
	TableBodyRowCell,
	TableHead,
	TableHeadRow,
	TableHeadRowCell,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { NFT } from 'services/api/walletNFTsService'
import { Flex } from 'theme-ui'
import getShortText from 'utils/js/getShortText'
import useInfiniteData from 'utils/react/useInfiniteData'

interface RecipientTableProps {
	nfts: (NFT & { recipient: string })[]
}

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 8px;
	width: 100%;
`

export default function RecipientTable({ nfts }: RecipientTableProps) {
	const { t } = useTranslation(['send'])

	const columns: Array<string> = t('send:recipients.table.columns', {
		returnObjects: true,
	})

	const { data, loadMore, hasMore } = useInfiniteData<
		NFT & { recipient: string }
	>({
		data: nfts,
		perPage: 10,
	})

	return (
		<Container>
			<Table>
				<TableHead>
					<TableHeadRow>
						{(columns || []).map(col => (
							<TableHeadRowCell key={col}>{col}</TableHeadRowCell>
						))}
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{(data ?? []).map(nft => {
						return (
							<TableBodyRow key={`${nft.collectionAddress}_${nft.tokenId}`}>
								<TableBodyRowCell>
									<OverflowTip>
										<div>{getShortText(nft?.recipient ?? '', 10)}</div>
									</OverflowTip>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
										}}
									>
										{getShortText(nft?.collectionAddress ?? '', 10)}
									</Flex>
								</TableBodyRowCell>

								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
										}}
									>
										{nft?.tokenId ?? ''}
									</Flex>
								</TableBodyRowCell>
							</TableBodyRow>
						)
					})}
				</TableBody>
			</Table>
			<Flex sx={{ mt: '8px' }}>
				<Button disabled={!hasMore} fullWidth variant='dark' onClick={loadMore}>
					{t('common:show-more')}
				</Button>
			</Flex>
		</Container>
	)
}
