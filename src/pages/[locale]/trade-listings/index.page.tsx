import { useTranslation } from 'next-i18next'
import React from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import {
	CollectionsBoxesIcon,
	CreateListingAddIcon,
	FilterIcon,
	LookingForCompassIcon,
	TargetIcon,
} from 'assets/icons/mixed'

import {
	Accordion,
	AccordionTitle,
	Button,
	CheckboxCard,
	ConnectButton,
	GridSwitch,
	LayoutContainer,
	MultiSelectAccordionInput,
	Page,
	SearchInput,
	Tab,
	Tabs,
	TradeListingsFilterModal,
	TradeListingsFilterModalProps,
} from 'components/ui'

import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import useIsTablet from 'hooks/react/useIsTablet'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { SupportedCollectionsService } from 'services/api'
import { TradesService } from 'services/api/tradesService'
import { Box, Flex } from 'theme-ui'

import * as ROUTES from 'constants/routes'
import { asyncAction } from 'utils/js/asyncAction'

import {
	AccordionContentWrapper,
	DesktopFiltersSection,
	FilterButton,
	FiltersButtonContainer,
	FiltersButtonLabel,
	FiltersSection,
	GridController,
	GridSwitchContainer,
	GRID_TYPE,
	ListingsNFTsContainer,
	SearchInputContainer,
	SortSelectContainer,
	TabsSection,
} from 'components/trade-listings'
import useHeaderActions from 'hooks/useHeaderActions'
import { TRADE_STATE } from 'services/blockchain'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

enum LISTINGS_TYPE {
	ALL_LISTINGS = '0',
	MY_LISTINGS = '1',
}

export default function TradeListings() {
	const { t } = useTranslation(['common', 'trade-listings'])
	const wallet = useWallet()

	useHeaderActions(
		<Flex sx={{ gap: '8px', height: '40px' }}>
			<Button variant='gradient' size='medium' href={ROUTES.CREATE_TRADE_LISTING}>
				<CreateListingAddIcon />
				<Box sx={{ display: ['none', 'block'], ml: '8px' }}>
					{t('common:create-listing')}
				</Box>
			</Button>
			<ConnectButton />
		</Flex>
	)

	const isTablet = useIsTablet()
	const [filtersExpanded, setFiltersExpanded] = React.useState(false)
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
			value: JSON.stringify([TRADE_STATE.Published, TRADE_STATE.Countered]),
		},
		{
			label: statusesLabels[1],
			value: JSON.stringify([TRADE_STATE.Cancelled, TRADE_STATE.Accepted]),
		},
		{
			label: statusesLabels[2],
			value: JSON.stringify([TRADE_STATE.Cancelled]),
		},
		{
			label: statusesLabels[3],
			value: JSON.stringify([TRADE_STATE.Published]),
		},
		{
			label: statusesLabels[4],
			value: JSON.stringify([TRADE_STATE.Countered]),
		},
		{
			label: statusesLabels[5],
			value: JSON.stringify([TRADE_STATE.Accepted]),
		},
	]
	const [gridType, setGridType] = React.useState(Boolean(GRID_TYPE.SMALL))

	const myAddress = wallet.wallets[0]?.terraAddress

	const [listingsType, setListingsType] = React.useState(
		LISTINGS_TYPE.ALL_LISTINGS
	)

	// TODO: Uncomment this when backend operates normally
	// const [activeTradesOption] = statusOptions
	const [statuses, setStatuses] = React.useState<
		MultiSelectAccordionInputOption[]
	>([
		// activeTradesOption
	])
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
				states: statuses.flatMap(({ value }) => JSON.parse(value)),
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
		if (!isTablet) {
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
							<GridController
								trades={trades}
								verifiedCollections={verifiedCollections}
								gridType={Number(gridType)}
							/>
							<Flex sx={{ width: '100%', marginTop: '14px' }}>
								{trades?.data && !!trades.data?.length && (
									<Button
										disabled={trades?.data.length <= trades.totalNumber}
										fullWidth
										variant='dark'
									>
										{t('common:show-more')}
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
