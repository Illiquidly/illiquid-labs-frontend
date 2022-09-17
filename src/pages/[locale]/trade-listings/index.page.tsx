import React from 'react'
import { useTranslation } from 'next-i18next'

import {
	LayoutContainer,
	ListingCard,
	Page,
	SearchInput,
	Tab,
	Tabs,
	Accordion,
	AccordionTitle,
	MultiSelectAccordionInput,
	CheckboxCard,
	GridSwitch,
} from 'components/ui'
import { makeStaticPaths, makeStaticProps } from 'lib'
import {
	CollectionsBoxesIcon,
	FilterIcon,
	LookingForCompassIcon,
	TargetIcon,
} from 'assets/icons/mixed'
import { Box } from 'theme-ui'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { useQuery } from '@tanstack/react-query'
import { SupportedCollectionsService } from 'services/api'
import { useWallet } from '@terra-money/use-wallet'
import {
	AccordionContentWrapper,
	DesktopFiltersSection,
	FilterButton,
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
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

enum LISTINGS_TYPE {
	ALL_LISTINGS = '0',
	MY_LISTINGS = '1',
}

enum GRID_TYPE {
	SMALL = 0,
	BIG = 1,
}

const statusOptions = [
	{
		label: 'Active',
		value: 'active',
	},
	{
		label: 'Inactive',
		value: 'inactive',
	},
	{
		label: 'Cancelled',
		value: 'cancelled',
	},
	{
		label: 'Published',
		value: 'published',
	},
	{
		label: 'Countered',
		value: 'countered',
	},
]

export default function TradeListings() {
	const { t } = useTranslation(['common', 'trade-listings'])
	const wallet = useWallet()
	const { data: verifiedCollections } = useQuery(
		['verifiedCollections'],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)
	const [gridType, setGridType] = React.useState(Boolean(GRID_TYPE.BIG))

	const [listingsType, setListingsType] = React.useState(
		LISTINGS_TYPE.ALL_LISTINGS
	)

	const [statuses, setStatuses] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])
	const [lookingForCollections, setLookingForCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])
	const [collections, setCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const [myFavoritesChecked, setMyFavoritesChecked] = React.useState(false)

	const [counteredByMeChecked, setCounteredByMeChecked] = React.useState(false)

	const [lookingForLiquidAssetsChecked, setLookingForLiquidAssetsChecked] =
		React.useState(false)

	const mockupListings = React.useMemo(
		() => Array.from({ length: 30 }).map((_, index) => ({ id: index })),
		[]
	)

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<TabsSection>
					<Tabs
						onChange={e => setListingsType(e.target.value as LISTINGS_TYPE)}
						value={listingsType}
						name='listings'
					>
						<Tab value={LISTINGS_TYPE.ALL_LISTINGS}>
							{t('trade-listings:tabs:all-listings')}
						</Tab>
						<Tab value={LISTINGS_TYPE.MY_LISTINGS}>
							{t('trade-listings:tabs:my-listings')}
						</Tab>
					</Tabs>
				</TabsSection>
				<FiltersSection>
					<SearchInputContainer>
						<SearchInput
							placeholder={t('trade-listings:filters:search-placeholder')}
						/>
					</SearchInputContainer>

					<FiltersButtonContainer>
						<FilterButton>
							<FilterIcon />
							<FiltersButtonLabel>{t('common:filters-label')}</FiltersButtonLabel>
						</FilterButton>
					</FiltersButtonContainer>
					<SortSelectContainer />

					<GridSwitchContainer>
						<GridSwitch
							onChange={e => setGridType(e.target.checked)}
							checked={gridType}
						/>
					</GridSwitchContainer>
				</FiltersSection>
				<ListingsNFTsContainer>
					<DesktopFiltersSection>
						<Box>
							<Accordion
								icon={<TargetIcon />}
								title={
									<AccordionTitle>
										{t('trade-listings:filters:status-label')}
									</AccordionTitle>
								}
							>
								<AccordionContentWrapper>
									<MultiSelectAccordionInput
										value={statuses}
										onChange={v => setStatuses(v)}
										accordionTitle={t('trade-listings:filters:status-label')}
										options={statusOptions}
									/>
								</AccordionContentWrapper>
							</Accordion>
						</Box>
						<Box>
							<Accordion
								icon={<CollectionsBoxesIcon />}
								title={
									<AccordionTitle>
										{t('trade-listings:filters:collections-label')}
									</AccordionTitle>
								}
							>
								<AccordionContentWrapper>
									<MultiSelectAccordionInput
										value={collections}
										onChange={v => setCollections(v)}
										accordionTitle={t(
											'trade-listings:filters:nft-collections-search-label'
										)}
										options={(verifiedCollections ?? [])?.map(
											({ collectionAddress, collectionName }) => ({
												label: collectionName,
												value: collectionAddress,
											})
										)}
										placeholder={t(
											'trade-listings:filters:search-collections-placeholder'
										)}
									/>
								</AccordionContentWrapper>
							</Accordion>
						</Box>

						<Box>
							<Accordion
								icon={<LookingForCompassIcon />}
								title={
									<AccordionTitle>
										{t('trade-listings:filters:looking-for-label')}
									</AccordionTitle>
								}
							>
								<AccordionContentWrapper>
									<MultiSelectAccordionInput
										value={lookingForCollections}
										onChange={v => setLookingForCollections(v)}
										accordionTitle={t(
											'trade-listings:filters:nft-collections-search-label'
										)}
										options={(verifiedCollections ?? [])?.map(
											({ collectionAddress, collectionName }) => ({
												label: collectionName,
												value: collectionAddress,
											})
										)}
										placeholder={t(
											'trade-listings:filters:search-collections-placeholder'
										)}
									/>
								</AccordionContentWrapper>
							</Accordion>
						</Box>
						<Box mb='8px'>
							<CheckboxCard
								variant='medium'
								title={t('trade-listings:filters:my-favorites-label')}
								onChange={e => setMyFavoritesChecked(e.target.checked)}
								checked={myFavoritesChecked}
							/>
						</Box>
						<Box mb='8px'>
							<CheckboxCard
								variant='medium'
								title={t('trade-listings:filters:countered-by-me-label')}
								onChange={e => setCounteredByMeChecked(e.target.checked)}
								checked={counteredByMeChecked}
							/>
						</Box>
						<Box mb='8px'>
							<CheckboxCard
								variant='medium'
								title={t('trade-listings:filters:looking-for-liquid-assets-label')}
								onChange={e => setLookingForLiquidAssetsChecked(e.target.checked)}
								checked={lookingForLiquidAssetsChecked}
							/>
						</Box>
					</DesktopFiltersSection>
					<ListingNFTsGrid>
						{mockupListings.map(({ id }) => (
							<ListingCard
								key={id}
								verified
								unavailableText={t('trade-listings:listing-unavailable')}
								description='2'
								attributes={[]}
								onLike={n => console.warn(n)}
								tokenId='Something'
								collectionAddress='Something'
								href={`/trade-listings/${id}`}
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
						))}
					</ListingNFTsGrid>
				</ListingsNFTsContainer>
			</LayoutContainer>
		</Page>
	)
}
