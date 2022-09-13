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

export default function CounterOffers() {
	const previewItemsLimit = 5

	const { t } = useTranslation(['common', 'trade-listings'])
	return (
		<>
			<Title>{t('trade-listings:counter-offers')}</Title>
			<Table>
				<TableHead>
					<TableHeadRow>
						{['User', 'NFTs', 'Tokens', 'Date'].map(col => (
							<TableHeadRowCell>{col}</TableHeadRowCell>
						))}
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{[1, 2, 3, 4, 5].map(i => (
						<TableBodyRow>
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
								Show more
							</Button>
						</TableFooterRowCell>
					</TableFooterRow>
				</TableBody>
			</Table>
		</>
	)
}
