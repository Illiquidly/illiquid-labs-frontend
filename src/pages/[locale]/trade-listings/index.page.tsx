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
	TradeListingsFilterModal,
	TradeListingsFilterModalProps,
	Button,
} from 'components/ui'
import { makeStaticPaths, makeStaticProps } from 'lib'
import {
	CollectionsBoxesIcon,
	FilterIcon,
	LookingForCompassIcon,
	TargetIcon,
} from 'assets/icons/mixed'
import { Box, Flex } from 'theme-ui'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { useQuery } from '@tanstack/react-query'
import { SupportedCollectionsService } from 'services/api'
import { useWallet } from '@terra-money/use-wallet'
import useIsMobile from 'hooks/react/useIsMobile'
import NiceModal from '@ebay/nice-modal-react'
import { asyncAction } from 'utils/js/asyncAction'
import { TradesService } from 'services/api/tradesService'
import { noop } from 'lodash'
import { NFT } from 'services/api/walletNFTsService'
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

export default function TradeListings() {
	const { t } = useTranslation(['common', 'trade-listings'])
	const wallet = useWallet()

	const isMobile = useIsMobile()
	const [filtersExpanded, setFiltersExpanded] = React.useState(true)
	const { data: verifiedCollections, isFetched: verifiedCollectionsFetched } =
		useQuery(
			['verifiedCollections', wallet.network],
			async () =>
				SupportedCollectionsService.getSupportedCollections(wallet.network.name),
			{
				enabled: !!wallet.network,
				retry: true,
			}
		)

	const statusesLabels: Array<string> = t('trade-listings:statuses', {
		returnObjects: true,
	})
	const statusOptions = [
		{
			label: statusesLabels[0],
			value: 'active',
		},
		{
			label: statusesLabels[1],
			value: 'inactive',
		},
		{
			label: statusesLabels[2],
			value: 'cancelled',
		},
		{
			label: statusesLabels[3],
			value: 'published',
		},
		{
			label: statusesLabels[4],
			value: 'countered',
		},
	]
	const [gridType, setGridType] = React.useState(Boolean(GRID_TYPE.BIG))

	const myAddress = wallet.wallets[0]?.terraAddress

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

	const { data: trades } = useQuery(
		[
			'trades',
			wallet.network,
			listingsType,
			statuses,
			lookingForCollections,
			collections,
			myFavoritesChecked,
			counteredByMeChecked,
			lookingForLiquidAssetsChecked,
		],
		async () =>
			TradesService.getAllTrades(wallet.network.name, {
				owners:
					listingsType === LISTINGS_TYPE.MY_LISTINGS ? [myAddress] : undefined,
				state: statuses.map(({ value }) => value),
				collections: collections.map(({ value }) => value),
				lookingFor: lookingForCollections.map(({ value }) => value),
				counteredBy: counteredByMeChecked ? [myAddress] : undefined,
				hasLiquidAsset: lookingForLiquidAssetsChecked,
				// myFavoritesChecked
				// lookingForLiquidAssetsChecked
			}),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const onFiltersClick = async () => {
		if (!isMobile) {
			setFiltersExpanded(prevFiltersExpanded => !prevFiltersExpanded)
			return
		}
		if (!verifiedCollectionsFetched) {
			return
		}
		const [, filters] = await asyncAction<TradeListingsFilterModalProps>(
			NiceModal.show(TradeListingsFilterModal, {
				statusOptions,
				verifiedCollections,
				statuses,
				lookingForCollections,
				collections,
				counteredByMeChecked,
				myFavoritesChecked,
				lookingForLiquidAssetsChecked,
			})
		)

		if (filters) {
			setStatuses(filters.statuses)
			setCollections(filters.collections)
			setLookingForCollections(filters.lookingForCollections)
			setCounteredByMeChecked(filters.counteredByMeChecked)
			setMyFavoritesChecked(filters.myFavoritesChecked)
			setLookingForLiquidAssetsChecked(filters.lookingForLiquidAssetsChecked)
		}
	}

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<Box sx={{ minHeight: '1248px' }}>
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
							<FilterButton onClick={onFiltersClick}>
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
						{filtersExpanded && (
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
						)}
						<Box sx={{ width: '100%' }}>
							<ListingNFTsGrid>
								{(trades?.data || []).map(
									({
										tradeId,
										tradeInfo: {
											additionalInfo,
											associatedAssetsWithInfo,
											whitelistedUsers,
										},
									}) => (
										<Box>
											<ListingCard
												key={tradeId}
												onLike={noop}
												unavailableText={t('trade-listings:listing-unavailable')}
												description={
													additionalInfo?.tradePreview?.cw721Coin?.description ?? ''
												}
												attributes={
													additionalInfo?.tradePreview?.cw721Coin?.attributes ?? []
												}
												tokenId={additionalInfo?.tradePreview?.cw721Coin?.tokenId ?? ''}
												collectionAddress={
													additionalInfo?.tradePreview?.cw721Coin?.collectionAddress ?? ''
												}
												href={`/trade-listings/${tradeId}`}
												nfts={(associatedAssetsWithInfo || [])
													.filter(nft => nft.cw721Coin)
													.map(({ cw721Coin }) => cw721Coin as NFT)}
												lookingFor={additionalInfo?.lookingFor ?? []}
												imageUrl={additionalInfo?.tradePreview?.cw721Coin?.imageUrl ?? []}
												name={additionalInfo?.tradePreview?.cw721Coin?.name ?? ''}
												liked={false}
												isPrivate={(whitelistedUsers || []).length > 0}
												collectionName={
													additionalInfo?.tradePreview?.cw721Coin?.collectionName || ''
												}
											/>
										</Box>
									)
								)}
							</ListingNFTsGrid>
							<Flex sx={{ width: '100%', marginTop: '14px' }}>
								{trades?.data && !!trades.data?.length && (
									<Button
										disabled={trades?.data.length <= trades.totalNumber}
										fullWidth
										variant='dark'
									>
										Show more
									</Button>
								)}
							</Flex>
						</Box>
					</ListingsNFTsContainer>
				</Box>
			</LayoutContainer>
		</Page>
	)
}
