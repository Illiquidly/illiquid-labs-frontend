import { useTranslation } from 'next-i18next'
import React from 'react'

import {
	Accordion,
	AccordionTitle,
	Button,
	CheckboxCard,
	GridSwitch,
	LayoutContainer,
	MultiSelectAccordionInput,
	Page,
	SearchInput,
	Tab,
	Tabs,
} from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { useWallet } from '@terra-money/use-wallet'
import useHeaderActions from 'hooks/useHeaderActions'
import CreateRaffleListing from 'components/shared/header-actions/create-raffle-listing/CreateRaffleListing'
import { useQuery } from '@tanstack/react-query'
import {
	FAVORITES_RAFFLES,
	RAFFLES,
	VERIFIED_COLLECTIONS,
} from 'constants/use-query-keys'

import useAddress from 'hooks/useAddress'
import {
	Raffle,
	RafflesService,
	RAFFLE_STATE,
} from 'services/api/rafflesService'
import { FavoriteRafflesService } from 'services/api/favoriteRafflesService'
import { NetworkType } from 'types'
import { GRID_TYPE } from 'components/shared/raffle/GridController'
import { Box, Flex } from 'theme-ui'
import {
	AccordionContentWrapper,
	DesktopFiltersSection,
	FilterButton,
	FiltersButtonContainer,
	FiltersButtonLabel,
	FiltersSection,
	GridSwitchContainer,
	ListingsNFTsContainer,
	SearchInputContainer,
	TabsSection,
} from 'components/raffle-listings'
import {
	CollectionsBoxesIcon,
	FilterIcon,
	TargetIcon,
} from 'assets/icons/mixed'
import useIsTablet from 'hooks/react/useIsTablet'
import { SupportedCollectionsService } from 'services/api'
import { RAFFLE_LISTINGS_TYPE } from 'constants/listings'
import { useDebounce } from 'react-use'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { RaffleGridController } from 'components/shared/raffle'

const getStaticProps = makeStaticProps(['common', 'raffle-listings'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function RaffleListings() {
	const { t } = useTranslation(['common', 'raffle-listings'])
	const wallet = useWallet()

	useHeaderActions(<CreateRaffleListing />)

	const isTablet = useIsTablet()
	const [filtersExpanded, setFiltersExpanded] = React.useState(false)
	const { data: verifiedCollections, isFetched: verifiedCollectionsFetched } =
		useQuery(
			[VERIFIED_COLLECTIONS, wallet.network],
			async () =>
				SupportedCollectionsService.getSupportedCollections(wallet.network.name),
			{
				enabled: !!wallet.network,
				retry: true,
			}
		)

	const [
		startedStatusLabel,
		closedStatusLabel,
		finishedStatusLabel,
		cancelledStatusLabel,
	]: Array<string> = t('raffle-listings:statuses', {
		returnObjects: true,
	})

	const statusOptions = [
		{
			label: startedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Started]),
		},
		{
			label: closedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Closed]),
		},
		{
			label: finishedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Finished]),
		},
		{
			label: cancelledStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Cancelled]),
		},
	]

	const [defaultStatusOption] = statusOptions

	const [gridType, setGridType] = React.useState(Boolean(GRID_TYPE.SMALL))

	const [search, setSearch] = React.useState('')

	const [debouncedSearch, setDebouncedSearch] = React.useState('')

	useDebounce(() => setDebouncedSearch(search), 800, [search])

	const [listingsType, setListingsType] = React.useState(
		RAFFLE_LISTINGS_TYPE.ALL_LISTINGS
	)

	const [page, setPage] = React.useState(1)

	const [statuses, setStatuses] = React.useState<
		MultiSelectAccordionInputOption[]
	>([defaultStatusOption])

	const [collections, setCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const [myFavoritesChecked, setMyFavoritesChecked] = React.useState(false)

	const [participatedByMeChecked, setParticipatedByMeChecked] =
		React.useState(false)

	const [wonByMe, setWonByMe] = React.useState(false)

	const myAddress = useAddress()

	const { data: favoriteRaffles } = useQuery(
		[FAVORITES_RAFFLES, wallet.network],
		async () =>
			FavoriteRafflesService.getFavoriteRaffles(
				{ network: wallet.network.name as NetworkType },
				{
					users: [myAddress],
				}
			),
		{
			enabled: !!wallet.network && !!myAddress,
			retry: true,
		}
	)

	// TODO extract this into hook, along with useQuery part.
	const [infiniteData, setInfiniteData] = React.useState<Raffle[]>([])
	React.useEffect(() => {
		setInfiniteData([])
		setPage(1)
	}, [
		wallet.network,
		listingsType,
		statuses,
		collections,
		myFavoritesChecked,
		participatedByMeChecked,
		debouncedSearch,
		wonByMe,
		myAddress,
	])

	const { data: raffles, isLoading } = useQuery(
		[
			RAFFLES,
			wallet.network,
			listingsType,
			statuses,
			collections,
			myFavoritesChecked,
			participatedByMeChecked,
			debouncedSearch,
			wonByMe,
			page,
			myAddress,
		],
		async () =>
			RafflesService.getAllRaffles(
				wallet.network.name,
				{
					search: debouncedSearch,
					myAddress,
					owners:
						listingsType === RAFFLE_LISTINGS_TYPE.MY_LISTINGS
							? [myAddress]
							: undefined,
					states: statuses.flatMap(({ value }) => JSON.parse(value)),
					collections: collections.map(({ value }) => value),
					participatedBy: participatedByMeChecked ? [myAddress] : undefined,
					favoritesOf: myFavoritesChecked ? myAddress : undefined,
					wonByMe,
				},
				{
					page,
					limit: 28,
				}
			),
		{
			enabled: !!wallet.network && !!favoriteRaffles,
			retry: true,
		}
	)

	React.useEffect(() => {
		// eslint-disable-next-line security/detect-object-injection
		const fnc = {
			[RAFFLE_LISTINGS_TYPE.MY_LISTINGS]: () => setStatuses([]),
			[RAFFLE_LISTINGS_TYPE.PAST_LISTINGS]: () =>
				setStatuses([
					{
						label: closedStatusLabel,
						value: JSON.stringify([RAFFLE_STATE.Closed]),
					},
					{
						label: finishedStatusLabel,
						value: JSON.stringify([RAFFLE_STATE.Finished]),
					},
				]),
			[RAFFLE_LISTINGS_TYPE.ALL_LISTINGS]: () =>
				setStatuses([
					{
						label: startedStatusLabel,
						value: JSON.stringify([RAFFLE_STATE.Started]),
					},
				]),
		}[listingsType]

		fnc?.()
	}, [listingsType])

	React.useEffect(
		() => raffles && setInfiniteData(prev => [...prev, ...raffles.data]),
		[raffles]
	)

	const onFiltersClick = async () => {
		if (!isTablet) {
			setFiltersExpanded(prevFiltersExpanded => !prevFiltersExpanded)
			return
		}
		if (!verifiedCollectionsFetched) {
			console.warn('TODO')
		}

		// const [, filters] = await asyncAction<TradeListingsFilterModalProps>(
		// 	NiceModal.show(TradeListingsFilterModal, {
		// 		statusOptions,
		// 		verifiedCollections,
		// 		statuses,
		// 		lookingForCollections,
		// 		collections,
		// 		counteredByMeChecked,
		// 		myFavoritesChecked,
		// 		lookingForLiquidAssetsChecked,
		// 	})
		// )

		// if (filters) {
		// 	setStatuses(filters.statuses)
		// 	setCollections(filters.collections)
		// 	setLookingForCollections(filters.lookingForCollections)
		// 	setCounteredByMeChecked(filters.counteredByMeChecked)
		// 	setMyFavoritesChecked(filters.myFavoritesChecked)
		// 	setLookingForLiquidAssetsChecked(filters.lookingForLiquidAssetsChecked)
		// }
	}

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<Box sx={{ minHeight: '1248px' }}>
					<TabsSection>
						<Tabs
							onChange={e => setListingsType(e.target.value as RAFFLE_LISTINGS_TYPE)}
							value={listingsType}
							name='listings'
						>
							<Tab value={RAFFLE_LISTINGS_TYPE.ALL_LISTINGS}>
								{t('raffle-listings:tabs:all-listings')}
							</Tab>
							<Tab value={RAFFLE_LISTINGS_TYPE.MY_LISTINGS}>
								{t('raffle-listings:tabs:my-listings')}
							</Tab>
							<Tab value={RAFFLE_LISTINGS_TYPE.PAST_LISTINGS}>
								{t('raffle-listings:tabs:past-listings')}
							</Tab>
						</Tabs>
					</TabsSection>
					<FiltersSection>
						<SearchInputContainer>
							<SearchInput
								onChange={e => setSearch(e.target.value)}
								value={search}
								placeholder={t('raffle-listings:filters:search-placeholder')}
							/>
						</SearchInputContainer>

						<FiltersButtonContainer>
							<FilterButton onClick={onFiltersClick}>
								<FilterIcon />
								<FiltersButtonLabel>{t('common:filters-label')}</FiltersButtonLabel>
							</FilterButton>
						</FiltersButtonContainer>
						{/* <SortSelectContainer /> */}

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
												{t('raffle-listings:filters:status-label')}
											</AccordionTitle>
										}
									>
										<AccordionContentWrapper>
											<MultiSelectAccordionInput
												value={statuses}
												onChange={v => setStatuses(v)}
												accordionTitle={t('raffle-listings:filters:status-label')}
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
												{t('raffle-listings:filters:collections-label')}
											</AccordionTitle>
										}
									>
										<AccordionContentWrapper>
											<MultiSelectAccordionInput
												value={collections}
												onChange={v => setCollections(v)}
												accordionTitle={t(
													'raffle-listings:filters:nft-collections-search-label'
												)}
												options={(verifiedCollections ?? [])?.map(
													({ collectionAddress, collectionName }) => ({
														label: collectionName,
														value: collectionAddress,
													})
												)}
												placeholder={t(
													'raffle-listings:filters:search-collections-placeholder'
												)}
											/>
										</AccordionContentWrapper>
									</Accordion>
								</Box>

								<Box mb='8px'>
									<CheckboxCard
										variant='medium'
										title={t('raffle-listings:filters:my-favorites-label')}
										onChange={e => setMyFavoritesChecked(e.target.checked)}
										checked={myFavoritesChecked}
									/>
								</Box>
								<Box mb='8px'>
									<CheckboxCard
										variant='medium'
										title={t('raffle-listings:filters:participated-by-me-label')}
										onChange={e => setParticipatedByMeChecked(e.target.checked)}
										checked={participatedByMeChecked}
									/>
								</Box>

								<Box mb='8px'>
									<CheckboxCard
										variant='medium'
										title={t('raffle-listings:filters:won-by-me-label')}
										onChange={e => setWonByMe(e.target.checked)}
										checked={wonByMe}
									/>
								</Box>
							</DesktopFiltersSection>
						)}
						<Box sx={{ width: '100%' }}>
							<RaffleGridController
								raffles={infiniteData}
								isLoading={!infiniteData.length && isLoading}
								verifiedCollections={verifiedCollections}
								gridType={Number(gridType)}
								favoriteRaffles={favoriteRaffles}
							/>
							<Flex sx={{ width: '100%', marginTop: '14px' }}>
								{raffles?.data && !!raffles.data?.length && !isLoading && (
									<Button
										disabled={raffles?.page === raffles.pageCount}
										fullWidth
										variant='dark'
										onClick={() => setPage(prev => prev + 1)}
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
