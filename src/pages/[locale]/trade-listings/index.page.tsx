import React from 'react'
import { useTranslation } from 'next-i18next'

import {
	LayoutContainer,
	ListingCard,
	Page,
	SearchInput,
	Tab,
	Tabs,
	Button,
	Accordion,
	AccordionTitle,
	MultiSelectAccordionInput,
	CheckboxCard,
} from 'components/ui'
import { getStaticPaths, makeStaticProps } from 'lib'
import {
	CollectionsBoxesIcon,
	FilterIcon,
	LookingForCompassIcon,
	TargetIcon,
} from 'assets/icons/mixed'
import GridSwitch from 'components/ui/grid-switch/GridSwitch'
import { Box, Flex } from 'theme-ui'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import {
	DesktopFiltersSection,
	FiltersButtonContainer,
	FiltersButtonLabel,
	FiltersSection,
	GridSwitchContainer,
	ListingNFTsGrid,
	ListingsNFTsContainer,
	SearchInputContainer,
	SortSelectContainer,
	TabsSection,
} from './trade-listings.styled'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
export { getStaticPaths, getStaticProps }

enum LISTINGS_TYPE {
	ALL_LISTINGS = '0',
	MY_LISTINGS = '1',
}

export default function TradeListings() {
	const { t } = useTranslation(['common', 'trade-listings'])
	const [listingsType, setListingsType] = React.useState(
		LISTINGS_TYPE.ALL_LISTINGS
	)
	const [isSmallGrid, setIsSmallGrid] = React.useState(false)
	const [lookingForCollections, setLookingForCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<TabsSection>
					<Tabs
						onChange={e => setListingsType(e.target.value as LISTINGS_TYPE)}
						value={listingsType}
						name='listings'
					>
						<Tab value={LISTINGS_TYPE.ALL_LISTINGS}>All Listings</Tab>
						<Tab value={LISTINGS_TYPE.MY_LISTINGS}>My Listings</Tab>
					</Tabs>
				</TabsSection>
				<FiltersSection>
					<SearchInputContainer>
						<SearchInput placeholder='Search' />
					</SearchInputContainer>

					<FiltersButtonContainer>
						<Button
							variant='secondary'
							fullWidth
							sx={{
								alignItems: 'center',
								justifyContent: 'center',
								gap: '12px',
							}}
						>
							<FilterIcon />
							<FiltersButtonLabel>{t('common:filters-label')}</FiltersButtonLabel>
						</Button>
					</FiltersButtonContainer>
					<SortSelectContainer />

					<GridSwitchContainer>
						<GridSwitch
							onChange={e => setIsSmallGrid(e.target.checked)}
							checked={isSmallGrid}
						/>
					</GridSwitchContainer>
				</FiltersSection>
				<ListingsNFTsContainer>
					<DesktopFiltersSection>
						<Box>
							<Accordion
								icon={<TargetIcon />}
								title={
									<AccordionTitle>{t('trade-listings:status-label')}</AccordionTitle>
								}
							/>
						</Box>
						<Box>
							<Accordion
								icon={<CollectionsBoxesIcon />}
								title={
									<AccordionTitle>
										{t('trade-listings:collections-label')}
									</AccordionTitle>
								}
							>
								<Flex sx={{ flex: 1, mb: '8px' }}>
									<MultiSelectAccordionInput
										value={lookingForCollections}
										onChange={v => setLookingForCollections(v)}
										accordionTitle={t('trade-listings:nft-collections-search-label')}
										options={[
											{
												label: 'Galactic Punks',
												value: 'terrra1asjdkasdkajhsdkahskd',
												extraLabel: '43',
											},
											{
												label: 'Skeleton Punks',
												value: 'terrra1asjdkasdkajhsdskahskd',
												extraLabel: '43',
											},
											{
												label: 'Super Punks',
												value: 'terrra1assjdkasdkajhsdkahskd',
												extraLabel: '43',
											},
											{
												label: 'Galaxy Punks',
												value: 'terrra1assjdkaadkajhsdkahskd',
												extraLabel: '43',
											},
										]}
										placeholder={t('trade-listings:search-collections-label')}
									/>
								</Flex>
							</Accordion>
						</Box>

						<Box>
							<Accordion
								icon={<LookingForCompassIcon />}
								title={
									<AccordionTitle>
										{t('trade-listings:looking-for-label')}
									</AccordionTitle>
								}
							>
								<Flex sx={{ flex: 1, mb: '8px' }}>
									<MultiSelectAccordionInput
										value={lookingForCollections}
										onChange={v => setLookingForCollections(v)}
										accordionTitle={t('trade-listings:nft-collections-search-label')}
										options={[
											{
												label: 'Galactic Punks',
												value: 'terrra1asjdkasdkajhsdkahskd',
												extraLabel: '43',
											},
											{
												label: 'Skeleton Punks',
												value: 'terrra1asjdkasdkajhsdskahskd',
												extraLabel: '43',
											},
											{
												label: 'Super Punks',
												value: 'terrra1assjdkasdkajhsdkahskd',
												extraLabel: '43',
											},
											{
												label: 'Galaxy Punks',
												value: 'terrra1assjdkaadkajhsdkahskd',
												extraLabel: '43',
											},
										]}
										placeholder={t('trade-listings:search-collections-placeholder')}
									/>
								</Flex>
							</Accordion>
						</Box>
						<Box mb='8px'>
							<CheckboxCard
								variant='medium'
								title={t('trade-listings:my-favorites-label')}
								extra='43'
							/>
						</Box>
						<Box mb='8px'>
							<CheckboxCard
								variant='medium'
								title={t('trade-listings:countered-by-me-label')}
								extra='43'
							/>
						</Box>
						<Box mb='8px'>
							<CheckboxCard
								variant='medium'
								title={t('trade-listings:looking-for-liquid-assets-label')}
								extra='43'
							/>
						</Box>
					</DesktopFiltersSection>
					<ListingNFTsGrid>
						<ListingCard
							verified
							unavailableText={t('trade-listings:listing-unavailable')}
							description='2'
							attributes={[]}
							onLike={n => console.warn(n)}
							tokenId='Something'
							collectionAddress='Something'
							href={`/listing-details/${1}`}
							nfts={[]}
							imageUrl={[
								'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
							]}
							name='Fox #7561'
							collectionName='Mutant Ape Yacht Club'
						/>
						<ListingCard
							verified
							unavailableText={t('trade-listings:listing-unavailable')}
							description='2'
							attributes={[]}
							onLike={n => console.warn(n)}
							tokenId='Something'
							collectionAddress='Something'
							href={`/listing-details/${1}`}
							nfts={[]}
							imageUrl={[
								'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
							]}
							name='Fox #7561'
							collectionName='Mutant Ape Yacht Club'
						/>
						<ListingCard
							verified
							unavailableText={t('trade-listings:listing-unavailable')}
							description='2'
							attributes={[]}
							onLike={n => console.warn(n)}
							tokenId='Something'
							collectionAddress='Something'
							href={`/listing-details/${1}`}
							nfts={[]}
							imageUrl={[
								'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
							]}
							name='Fox #7561'
							collectionName='Mutant Ape Yacht Club'
						/>
						<ListingCard
							verified
							unavailableText={t('trade-listings:listing-unavailable')}
							description='2'
							attributes={[]}
							onLike={n => console.warn(n)}
							tokenId='Something'
							collectionAddress='Something'
							href={`/listing-details/${1}`}
							nfts={[]}
							imageUrl={[
								'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
							]}
							name='Fox #7561'
							collectionName='Mutant Ape Yacht Club'
						/>
						<ListingCard
							verified
							unavailableText={t('trade-listings:listing-unavailable')}
							description='2'
							attributes={[]}
							onLike={n => console.warn(n)}
							tokenId='Something'
							collectionAddress='Something'
							href={`/listing-details/${1}`}
							nfts={[]}
							imageUrl={[
								'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
							]}
							name='Fox #7561'
							collectionName='Mutant Ape Yacht Club'
						/>
						<ListingCard
							verified
							unavailableText={t('trade-listings:listing-unavailable')}
							description='2'
							attributes={[]}
							onLike={n => console.warn(n)}
							tokenId='Something'
							collectionAddress='Something'
							href={`/listing-details/${1}`}
							nfts={[]}
							imageUrl={[
								'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
							]}
							name='Fox #7561'
							collectionName='Mutant Ape Yacht Club'
						/>
						<ListingCard
							verified
							unavailableText={t('trade-listings:listing-unavailable')}
							description='2'
							attributes={[]}
							onLike={n => console.warn(n)}
							tokenId='Something'
							collectionAddress='Something'
							href={`/listing-details/${1}`}
							nfts={[
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
							]}
							lookingFor={[
								{
									amount: '10',
									denom: 'Luna',
								},
								{
									collectionName: 'DeGods',
									collectionAddress: '1',
								},
								{
									collectionName: 'Galactic Punks',
									collectionAddress: '2',
								},
								{
									collectionName: 'Skeleton Punks',
									collectionAddress: '3',
								},
								{
									collectionName: 'Lovely Punks',
									collectionAddress: '4',
								},
								{
									collectionName: 'Scary Punks',
									collectionAddress: '5',
								},
								{
									denom: 'yLuna',
									amount: '20',
								},
							]}
							imageUrl={[
								'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
							]}
							name='Fox #7561'
							liked
							isPrivate
							collectionName='Mutant Ape Yacht Club'
						/>
					</ListingNFTsGrid>
				</ListingsNFTsContainer>
			</LayoutContainer>
		</Page>
	)
}
