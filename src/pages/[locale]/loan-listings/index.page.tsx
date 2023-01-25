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
import NiceModal from '@ebay/nice-modal-react'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { useWallet } from '@terra-money/use-wallet'
import useHeaderActions from 'hooks/useHeaderActions'
import { useQuery } from '@tanstack/react-query'

import useAddress from 'hooks/useAddress'
import { NetworkName } from 'types'
import { GRID_TYPE } from 'components/shared/loan/GridController'
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
} from 'components/loan-listings'
import {
	CollectionsBoxesIcon,
	FilterIcon,
	TargetIcon,
} from 'assets/icons/mixed'
import useIsTablet from 'hooks/react/useIsTablet'
import { SupportedCollectionsService } from 'services/api'
import { useDebounce } from 'react-use'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'

import CreateLoanListing from 'components/shared/header-actions/create-loan-listing/CreateLoanListings'
import {
	FAVORITES_LOANS,
	LOANS,
	VERIFIED_COLLECTIONS,
} from 'constants/useQueryKeys'
import { FavoriteLoansService } from 'services/api/favoriteLoansService'
import { Loan, LoansService, LOAN_STATE } from 'services/api/loansService'
import { LoansGridController } from 'components/shared/loan'
import { LOAN_LISTINGS_TYPE } from 'constants/listings'
import {
	LoanListingsFilterModal,
	LoanListingsFilterModalProps,
} from 'components/loan-listings/modals/loan-listings-filters-modal'
import { asyncAction } from 'utils/js/asyncAction'

const getStaticProps = makeStaticProps(['common', 'loan-listings'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function LoanListings() {
	const { t } = useTranslation(['common', 'loan-listings'])
	const wallet = useWallet()

	useHeaderActions(<CreateLoanListing />)

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
		activeStatusLabel,
		inactiveStatusLabel,
		publishedStatusLabel,
		startedStatusLabel,
		defaultedStatusLabel,
		endedStatusLabel,
		withdrawnLabel,
	]: Array<string> = t('loan-listings:statuses', {
		returnObjects: true,
	})

	const statusOptions = [
		{
			label: activeStatusLabel,
			value: JSON.stringify([
				LOAN_STATE.Published,
				LOAN_STATE.Started,
				LOAN_STATE.Defaulted,
			]),
		},
		{
			label: inactiveStatusLabel,
			value: JSON.stringify([LOAN_STATE.Ended, LOAN_STATE.Withdrawn]),
		},
		{
			label: publishedStatusLabel,
			value: JSON.stringify([LOAN_STATE.Published]),
		},
		{
			label: startedStatusLabel,
			value: JSON.stringify([LOAN_STATE.Started]),
		},
		{
			label: defaultedStatusLabel,
			value: JSON.stringify([LOAN_STATE.Defaulted]),
		},
		{
			label: endedStatusLabel,
			value: JSON.stringify([LOAN_STATE.Ended]),
		},
		{
			label: withdrawnLabel,
			value: JSON.stringify([LOAN_STATE.Withdrawn]),
		},
	]

	const [defaultStatusOption] = statusOptions

	const [gridType, setGridType] = React.useState(Boolean(GRID_TYPE.SMALL))

	const [search, setSearch] = React.useState('')

	const [debouncedSearch, setDebouncedSearch] = React.useState('')

	useDebounce(() => setDebouncedSearch(search), 800, [search])

	const [listingsType, setListingsType] = React.useState(
		LOAN_LISTINGS_TYPE.ALL_LISTINGS
	)

	const [page, setPage] = React.useState(1)

	const [statuses, setStatuses] = React.useState<
		MultiSelectAccordionInputOption[]
	>([defaultStatusOption])

	const [collections, setCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const [myFavoritesChecked, setMyFavoritesChecked] = React.useState(false)

	const myAddress = useAddress()

	const { data: favoriteLoans } = useQuery(
		[FAVORITES_LOANS, wallet.network, myAddress],
		async () =>
			FavoriteLoansService.getFavoriteLoans(
				{ network: wallet.network.name as NetworkName },
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
	const [infiniteData, setInfiniteData] = React.useState<Loan[]>([])
	React.useEffect(() => {
		setInfiniteData([])
		setPage(1)
	}, [
		wallet.network,
		listingsType,
		statuses,
		collections,
		myFavoritesChecked,
		debouncedSearch,
		myAddress,
	])

	const { data: loans, isLoading } = useQuery(
		[
			LOANS,
			wallet.network,
			listingsType,
			statuses,
			collections,
			myFavoritesChecked,
			debouncedSearch,
			page,
			myAddress,
		],
		async () =>
			LoansService.getAllLoans(
				wallet.network.name,
				{
					search: debouncedSearch,
					myAddress,
					borrowers:
						listingsType === LOAN_LISTINGS_TYPE.MY_LISTINGS ? [myAddress] : undefined,
					states: statuses.flatMap(({ value }) => JSON.parse(value)),
					collections: collections.map(({ value }) => value),
					favoritesOf: myFavoritesChecked ? myAddress : undefined,
					fundedByMe: listingsType === LOAN_LISTINGS_TYPE.FUNDED_BY_ME,
				},
				{
					page,
					limit: 28,
				}
			),
		{
			enabled: !!wallet.network && !!favoriteLoans,
			retry: true,
		}
	)

	React.useEffect(
		() => loans && setInfiniteData(prev => [...prev, ...loans.data]),
		[loans]
	)

	const onFiltersClick = async () => {
		if (!isTablet) {
			setFiltersExpanded(prevFiltersExpanded => !prevFiltersExpanded)
			return
		}
		if (!verifiedCollectionsFetched) {
			return
		}

		const [, filters] = await asyncAction<LoanListingsFilterModalProps>(
			NiceModal.show(LoanListingsFilterModal, {
				statusOptions,
				verifiedCollections,
				statuses,
				collections,
				myFavoritesChecked,
			} as LoanListingsFilterModalProps)
		)

		if (filters) {
			setStatuses(filters.statuses)
			setCollections(filters.collections)
			setMyFavoritesChecked(filters.myFavoritesChecked)
		}
	}

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<Box sx={{ minHeight: '1248px' }}>
					<TabsSection>
						<Tabs
							onChange={e => setListingsType(e.target.value as LOAN_LISTINGS_TYPE)}
							value={listingsType}
							name='listings'
						>
							<Tab value={LOAN_LISTINGS_TYPE.ALL_LISTINGS}>
								{t('loan-listings:tabs:all-listings')}
							</Tab>
							<Tab value={LOAN_LISTINGS_TYPE.MY_LISTINGS}>
								{t('loan-listings:tabs:my-listings')}
							</Tab>
							<Tab value={LOAN_LISTINGS_TYPE.FUNDED_BY_ME}>
								{t('loan-listings:tabs:funded-by-me')}
							</Tab>
						</Tabs>
					</TabsSection>
					<FiltersSection>
						<SearchInputContainer>
							<SearchInput
								onChange={e => setSearch(e.target.value)}
								value={search}
								placeholder={t('loan-listings:filters:search-placeholder')}
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
												{t('loan-listings:filters:status-label')}
											</AccordionTitle>
										}
									>
										<AccordionContentWrapper>
											<MultiSelectAccordionInput
												value={statuses}
												onChange={v => setStatuses(v)}
												accordionTitle={t('loan-listings:filters:status-label')}
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
												{t('loan-listings:filters:collections-label')}
											</AccordionTitle>
										}
									>
										<AccordionContentWrapper>
											<MultiSelectAccordionInput
												value={collections}
												onChange={v => setCollections(v)}
												accordionTitle={t(
													'loan-listings:filters:nft-collections-search-label'
												)}
												options={(verifiedCollections ?? [])?.map(
													({ collectionAddress, collectionName }) => ({
														label: collectionName,
														value: collectionAddress,
													})
												)}
												placeholder={t(
													'loan-listings:filters:search-collections-placeholder'
												)}
											/>
										</AccordionContentWrapper>
									</Accordion>
								</Box>

								<Box mb='8px'>
									<CheckboxCard
										variant='medium'
										title={t('loan-listings:filters:my-favorites-label')}
										onChange={e => setMyFavoritesChecked(e.target.checked)}
										checked={myFavoritesChecked}
									/>
								</Box>
							</DesktopFiltersSection>
						)}
						<Box sx={{ width: '100%' }}>
							<LoansGridController
								loans={infiniteData}
								isLoading={!infiniteData.length && isLoading}
								verifiedCollections={verifiedCollections}
								gridType={Number(gridType)}
								favoriteLoans={favoriteLoans}
							/>
							<Flex sx={{ width: '100%', marginTop: '14px' }}>
								{loans?.data && !!loans.data?.length && !isLoading && (
									<Button
										disabled={loans?.page === loans.pageCount}
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
