import React from 'react'
import { useTranslation } from 'next-i18next'
import { useDebounce } from 'react-use'
import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { Box, Flex } from 'theme-ui'

import { makeStaticPaths, makeStaticProps } from 'lib'
import useHeaderActions from 'hooks/useHeaderActions'
import CreateRaffleListing from 'components/shared/header-actions/create-raffle-listing/CreateRaffleListing'
import {
	FAVORITES_RAFFLES,
	RAFFLES,
	VERIFIED_COLLECTIONS,
} from 'constants/useQueryKeys'

import useAddress from 'hooks/useAddress'
import {
	Raffle,
	RafflesService,
	RAFFLE_STATE,
} from 'services/api/rafflesService'
import { FavoriteRafflesService } from 'services/api/favoriteRafflesService'
import { GRID_TYPE } from 'components/shared/raffle/GridController'
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
import { RaffleGridController } from 'components/shared/raffle'
import {
	RaffleListingsFilterModal,
	RaffleListingsFilterModalProps,
} from 'components/raffle-listings/modals'
import { asyncAction } from 'utils/js/asyncAction'
import { LayoutContainer, Page } from 'components/layout'
import {
	Accordion,
	AccordionTitle,
	Button,
	CheckboxCard,
	GridSwitch,
	MultiSelectAccordionInput,
	MultiSelectAccordionInputOption,
	SearchInput,
	Tab,
	Tabs,
} from 'components/ui'
import { getNetworkName } from 'utils/blockchain/terraUtils'

const getStaticProps = makeStaticProps(['common', 'raffle-listings'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function RaffleListings() {
	useHeaderActions(<CreateRaffleListing />)

	const { t } = useTranslation(['common', 'raffle-listings'])
	const networkName = getNetworkName()

	const isTablet = useIsTablet()
	const [filtersExpanded, setFiltersExpanded] = React.useState(false)
	const { data: verifiedCollections, isFetched: verifiedCollectionsFetched } =
		useQuery(
			[VERIFIED_COLLECTIONS, networkName],
			async () => SupportedCollectionsService.getSupportedCollections(networkName),
			{
				retry: true,
			}
		)

	const [
		startedStatusLabel,
		closedStatusLabel,
		finishedStatusLabel,
		cancelledStatusLabel,
		claimedStatusLabel,
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
		{
			label: claimedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Claimed]),
		},
	]

	const [defaultStatusOption] = statusOptions

	const [gridType, setGridType] = React.useState(Boolean(GRID_TYPE.SMALL))

	const [search, setSearch] = React.useState('')

	const [sort, setSort] = React.useState<'ASC' | 'DESC'>('ASC')

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

	const [wonByMeChecked, setWonByMeChecked] = React.useState(false)

	const myAddress = useAddress()

	const { data: favoriteRaffles } = useQuery(
		[FAVORITES_RAFFLES, networkName, myAddress],
		async () =>
			FavoriteRafflesService.getFavoriteRaffles(
				{ network: networkName },
				{
					users: [myAddress],
				}
			),
		{
			enabled: !!myAddress,
			retry: true,
		}
	)

	// TODO extract this into hook, along with useQuery part.
	const [infiniteData, setInfiniteData] = React.useState<Raffle[]>([])
	React.useEffect(() => {
		setInfiniteData([])
		setPage(1)
	}, [
		networkName,
		listingsType,
		statuses,
		collections,
		myFavoritesChecked,
		participatedByMeChecked,
		debouncedSearch,
		wonByMeChecked,
		myAddress,
	])

	const { data: raffles, isLoading } = useQuery(
		[
			RAFFLES,
			networkName,
			listingsType,
			statuses,
			collections,
			myFavoritesChecked,
			participatedByMeChecked,
			debouncedSearch,
			wonByMeChecked,
			page,
			myAddress,
		],
		async () =>
			RafflesService.getAllRaffles(
				networkName,
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
					wonByMe: wonByMeChecked,
				},
				{
					page,
					limit: 28,
				},
				sort
			),
		{
			enabled: !!favoriteRaffles,
			retry: true,
		}
	)

	React.useEffect(() => {
		// eslint-disable-next-line security/detect-object-injection
		const fnc = {
			[RAFFLE_LISTINGS_TYPE.MY_LISTINGS]: () => {
				setSort('ASC')
				setStatuses([])
			},
			[RAFFLE_LISTINGS_TYPE.PAST_LISTINGS]: () => {
				setSort('DESC')
				setStatuses([
					{
						label: closedStatusLabel,
						value: JSON.stringify([RAFFLE_STATE.Closed]),
					},
					{
						label: finishedStatusLabel,
						value: JSON.stringify([RAFFLE_STATE.Finished]),
					},
					{
						label: claimedStatusLabel,
						value: JSON.stringify([RAFFLE_STATE.Claimed]),
					},
				])
			},
			[RAFFLE_LISTINGS_TYPE.ALL_LISTINGS]: () => {
				setSort('ASC')
				setStatuses([
					{
						label: startedStatusLabel,
						value: JSON.stringify([RAFFLE_STATE.Started]),
					},
				])
			},
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
			return
		}

		const [, filters] = await asyncAction<RaffleListingsFilterModalProps>(
			NiceModal.show(RaffleListingsFilterModal, {
				statusOptions,
				verifiedCollections,
				statuses,
				collections,
				myFavoritesChecked,
				wonByMeChecked,
				participatedByMeChecked,
			} as RaffleListingsFilterModalProps)
		)

		if (filters) {
			setStatuses(filters.statuses)
			setCollections(filters.collections)
			setMyFavoritesChecked(filters.myFavoritesChecked)
			setParticipatedByMeChecked(filters.participatedByMeChecked)
			setWonByMeChecked(filters.wonByMeChecked)
		}
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
										onChange={e => setWonByMeChecked(e.target.checked)}
										checked={wonByMeChecked}
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
