import {
	TargetIcon,
	FilterArrowRightIcon,
	CollectionsBoxesIcon,
	LookingForCompassIcon,
} from 'assets/icons/mixed'
import { Checkbox } from 'components/ui/checkbox'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Box, IconButton } from 'theme-ui'

import {
	FiltersContainer,
	FilterSection,
	FilterText,
	FilterAction,
	CheckboxesContainer,
} from '../../TradeListingsFilterModal.styled'

interface MainViewProps {
	counteredByMeChecked: boolean
	setCounteredByMeChecked: (v: boolean) => void
	myFavoritesChecked: boolean
	setMyFavoritesChecked: (v: boolean) => void
	lookingForLiquidAssetsChecked: boolean
	setLookingForLiquidAssetsChecked: (v: boolean) => void
	onNavigateStatuses: () => void
	onNavigateCollections: () => void
	onNavigateLookingFor: () => void
}

function MainView({
	counteredByMeChecked,
	setCounteredByMeChecked,
	myFavoritesChecked,
	setMyFavoritesChecked,
	lookingForLiquidAssetsChecked,
	setLookingForLiquidAssetsChecked,
	onNavigateStatuses,
	onNavigateCollections,
	onNavigateLookingFor,
}: MainViewProps) {
	const { t } = useTranslation(['common', 'trade-listings'])

	return (
		<>
			<FiltersContainer>
				<FilterSection>
					<TargetIcon />
					<FilterText>{t('trade-listings:filters:status-label')}</FilterText>
					<FilterAction>
						<IconButton
							sx={{
								padding: '5.59px 8.30px',
							}}
							onClick={onNavigateStatuses}
							size='24px'
						>
							<FilterArrowRightIcon width='100%' height='100%' />
						</IconButton>
					</FilterAction>
				</FilterSection>
				<FilterSection>
					<CollectionsBoxesIcon />
					<FilterText>{t('trade-listings:filters:collections-label')}</FilterText>
					<FilterAction>
						<IconButton
							sx={{
								padding: '5.59px 8.30px',
							}}
							onClick={onNavigateCollections}
							size='24px'
						>
							<FilterArrowRightIcon width='100%' height='100%' />
						</IconButton>
					</FilterAction>
				</FilterSection>
				<FilterSection>
					<LookingForCompassIcon />
					<FilterText>{t('trade-listings:filters:looking-for-label')}</FilterText>
					<FilterAction>
						<IconButton
							sx={{
								padding: '5.59px 8.30px',
							}}
							size='24px'
							onClick={onNavigateLookingFor}
						>
							<FilterArrowRightIcon width='100%' height='100%' />
						</IconButton>
					</FilterAction>
				</FilterSection>
			</FiltersContainer>
			<CheckboxesContainer>
				<FilterSection>
					<Checkbox
						checked={myFavoritesChecked}
						onChange={e => setMyFavoritesChecked(e.target.checked)}
						label={
							<FilterText>{t('trade-listings:filters:my-favorites-label')}</FilterText>
						}
					/>

					<Box sx={{ flex: 1 }} />
				</FilterSection>
				<FilterSection>
					<Checkbox
						checked={counteredByMeChecked}
						onChange={e => setCounteredByMeChecked(e.target.checked)}
						label={
							<FilterText>
								{t('trade-listings:filters:countered-by-me-label')}
							</FilterText>
						}
					/>

					<Box sx={{ flex: 1 }} />
				</FilterSection>
				<FilterSection>
					<Checkbox
						checked={lookingForLiquidAssetsChecked}
						onChange={e => setLookingForLiquidAssetsChecked(e.target.checked)}
						label={
							<FilterText>
								{t('trade-listings:filters:looking-for-liquid-assets-label')}
							</FilterText>
						}
					/>
					<Box sx={{ flex: 1 }} />
				</FilterSection>
			</CheckboxesContainer>
		</>
	)
}

export default MainView
