import styled from '@emotion/styled'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import {
	Table,
	TableHead,
	TableHeadRow,
	TableHeadRowCell,
	TableBody,
	TableBodyRow,
	TableBodyRowCell,
	TableFooterRow,
	TableFooterRowCell,
	Button,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import { Flex } from 'theme-ui'
import { CounterOffer } from 'types'
import {
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
} from './ListingDetails.styled'

const nfts = [
	{
		collectionAddress: '1',
		collectionName: '1',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '1',
		description: 'test',
	},
	{
		collectionAddress: '2',
		collectionName: '2',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '2',
		description: 'test',
	},
	{
		collectionAddress: '3',
		collectionName: '3',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '3',
		description: 'test',
	},
	{
		collectionAddress: '4',
		collectionName: '4',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '4',
		description: 'test',
	},
	{
		collectionAddress: '5',
		collectionName: '5',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '5',
		description: 'test',
	},
]

const imageUrl = [
	'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
]

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

interface CounterOffersProps {
	handleApprove: (offer: CounterOffer) => void
	handleDeny: (offer: CounterOffer) => void
}
export default function CounterOffers({
	handleApprove,
	handleDeny,
}: CounterOffersProps) {
	const previewItemsLimit = 5

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
					{[1, 2, 3, 4, 5].map(i => (
						<TableBodyRow key={i}>
							<TableBodyRowCell>
								<Flex
									sx={{
										minWidth: '314px',
										justifyContent: 'flex-start',
									}}
								>
									<p>{`Username${i}`}</p>
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
												key={`${nft.collectionAddress}${nft.tokenId}`}
											>
												{imageUrl?.every(img => img === '') ? (
													<ImagePlaceholder width='18px' height='18px' />
												) : (
													<PreviewImage src={imageUrl ?? []} />
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
									{`${i * 3} tokens`}
								</Flex>
							</TableBodyRowCell>
							<TableBodyRowCell>
								<Flex
									sx={{
										minWidth: '100px',
										justifyContent: 'flex-start',
									}}
								>
									{`${i * 2} days ago`}
								</Flex>
							</TableBodyRowCell>
							<TableBodyRowCell>
								<Flex
									sx={{
										gap: '12px',
									}}
								>
									<Button
										sx={{ height: '40px', flex: 1 }}
										variant='primary'
										onClick={handleApprove}
									>
										{t('trade-listings:counter-offers.table.approve')}
									</Button>
									<Button
										onClick={handleDeny}
										variant='secondary'
										sx={{ height: '40px', flex: 1 }}
									>
										{t('trade-listings:counter-offers.table.deny')}
									</Button>
								</Flex>
							</TableBodyRowCell>
						</TableBodyRow>
					))}
					<TableFooterRow>
						<TableFooterRowCell colSpan={4}>
							<Button
								sx={{
									height: '40px',
									width: '100%',
									borderTopRightRadius: '0px',
									borderTopLeftRadius: '0px',
									borderBottomRightRadius: '8px',
									borderBottomLeftRadius: '8px',
									border: 'none',
									margin: 0,
									':hover': {
										border: 'unset',
										boxShadow: 'unset',
									},
								}}
								variant='dark'
								size='small'
							>
								{t('common:show-more')}
							</Button>
						</TableFooterRowCell>
					</TableFooterRow>
				</TableBody>
			</Table>
		</Container>
	)
}
