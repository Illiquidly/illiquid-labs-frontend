import {
	TargetIcon,
	FilterArrowRightIcon,
	CollectionsBoxesIcon,
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
} from '../../RaffleListingsFilterModal.styled'

interface MainViewProps {
	participatedByMeChecked: boolean
	setParticipatedByMeChecked: (v: boolean) => void
	wonByMeChecked: boolean
	setWonByMeChecked: (v: boolean) => void
	myFavoritesChecked: boolean
	setMyFavoritesChecked: (v: boolean) => void
	onNavigateStatuses: () => void
	onNavigateCollections: () => void
}

function MainView({
	participatedByMeChecked,
	setParticipatedByMeChecked,
	myFavoritesChecked,
	setMyFavoritesChecked,
	wonByMeChecked,
	setWonByMeChecked,
	onNavigateStatuses,
	onNavigateCollections,
}: MainViewProps) {
	const { t } = useTranslation(['common', 'raffle-listings'])

	return (
		<>
			<FiltersContainer>
				<FilterSection onClick={onNavigateStatuses}>
					<TargetIcon />
					<FilterText>{t('raffle-listings:filters:status-label')}</FilterText>
					<FilterAction>
						<IconButton
							sx={{
								padding: '5.59px 8.30px',
							}}
							size='24px'
						>
							<FilterArrowRightIcon width='100%' height='100%' />
						</IconButton>
					</FilterAction>
				</FilterSection>
				<FilterSection onClick={onNavigateCollections}>
					<CollectionsBoxesIcon />
					<FilterText>{t('raffle-listings:filters:collections-label')}</FilterText>
					<FilterAction>
						<IconButton
							sx={{
								padding: '5.59px 8.30px',
							}}
							size='24px'
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
							<FilterText>
								{t('raffle-listings:filters:my-favorites-label')}
							</FilterText>
						}
					/>

					<Box sx={{ flex: 1 }} />
				</FilterSection>
				<FilterSection>
					<Checkbox
						checked={participatedByMeChecked}
						onChange={e => setParticipatedByMeChecked(e.target.checked)}
						label={
							<FilterText>
								{t('raffle-listings:filters:participated-by-me-label')}
							</FilterText>
						}
					/>

					<Box sx={{ flex: 1 }} />
				</FilterSection>
				<FilterSection>
					<Checkbox
						checked={wonByMeChecked}
						onChange={e => setWonByMeChecked(e.target.checked)}
						label={
							<FilterText>{t('raffle-listings:filters:won-by-me-label')}</FilterText>
						}
					/>
					<Box sx={{ flex: 1 }} />
				</FilterSection>
			</CheckboxesContainer>
		</>
	)
}

export default MainView
