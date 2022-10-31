import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { ChevronLeftIcon, CloseIconSmall } from 'assets/icons/mixed'
import { Button } from 'components/ui/button'

import Modal from 'components/ui/modal/Modal'
import MultiSelectAccordionInput, {
	MultiSelectAccordionInputOption,
} from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionGetResponse } from 'services/api/supportedCollectionsService'
import { Flex, IconButton } from 'theme-ui'
import MainView from './components/main-view/MainView'
import {
	FiltersContainer,
	ModalBody,
	ModalContainer,
	ModalHeader,
} from './RaffleListingsFilterModal.styled'

export type RaffleListingsFilterModalProps = {
	verifiedCollections?: SupportedCollectionGetResponse[]
	statuses: MultiSelectAccordionInputOption[]
	lookingForCollections: MultiSelectAccordionInputOption[]
	collections: MultiSelectAccordionInputOption[]
	myFavoritesChecked: boolean
	statusOptions: MultiSelectAccordionInputOption[]
	participatedByMeChecked: boolean
	wonByMeChecked: boolean
}

enum VIEW_TYPES {
	MAIN = 0,
	STATUSES_FILTER = 1,
	COLLECTIONS_FILTER = 2,
}

const RaffleListingsFilterModal = NiceModal.create(
	({
		statuses: defaultStatuses,
		collections: defaultCollections,
		wonByMeChecked: defaultWonByMe,
		myFavoritesChecked: defaultMyFavoritesChecked,
		participatedByMeChecked: defaultParticipatedByMeChecked,
		statusOptions,
		verifiedCollections,
	}: RaffleListingsFilterModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'raffle-listings'])

		const [viewType, setViewType] = React.useState<VIEW_TYPES>(VIEW_TYPES.MAIN)

		const [statuses, setStatuses] =
			React.useState<MultiSelectAccordionInputOption[]>(defaultStatuses)

		const [collections, setCollections] =
			React.useState<MultiSelectAccordionInputOption[]>(defaultCollections)

		const [myFavoritesChecked, setMyFavoritesChecked] = React.useState(
			defaultMyFavoritesChecked
		)

		const [wonByMeChecked, setWonByMeChecked] = React.useState(defaultWonByMe)

		const [participatedByMeChecked, setParticipatedByMeChecked] = React.useState(
			defaultParticipatedByMeChecked
		)

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalHeader>
						{viewType !== VIEW_TYPES.MAIN && (
							<Flex sx={{ flex: 1 }}>
								<IconButton
									sx={{
										padding: '4px',
									}}
									size='24px'
									onClick={() => setViewType(VIEW_TYPES.MAIN)}
								>
									<ChevronLeftIcon width='100%' height='100%' />
								</IconButton>
							</Flex>
						)}
						<IconButton
							sx={{
								padding: '4px',
							}}
							size='24px'
							onClick={modal.remove}
						>
							<CloseIconSmall width='100%' height='100%' />
						</IconButton>
					</ModalHeader>
					<ModalBody>
						{viewType === VIEW_TYPES.MAIN && (
							<MainView
								onNavigateStatuses={() => setViewType(VIEW_TYPES.STATUSES_FILTER)}
								onNavigateCollections={() => setViewType(VIEW_TYPES.COLLECTIONS_FILTER)}
								myFavoritesChecked={myFavoritesChecked}
								setMyFavoritesChecked={setMyFavoritesChecked}
								participatedByMeChecked={participatedByMeChecked}
								setParticipatedByMeChecked={setParticipatedByMeChecked}
								wonByMeChecked={wonByMeChecked}
								setWonByMeChecked={setWonByMeChecked}
							/>
						)}
						{viewType === VIEW_TYPES.STATUSES_FILTER && (
							<FiltersContainer style={{ flex: 1 }}>
								<MultiSelectAccordionInput
									style={{ padding: 0, border: 0 }}
									dropdownStyle={{ flex: 1, maxHeight: '400px' }}
									value={statuses}
									onChange={v => setStatuses(v)}
									accordionTitle={t('raffle-listings:filters:status-label')}
									options={statusOptions}
									placeholder={t('raffle-listings:filters:search-status-placeholder')}
								/>
							</FiltersContainer>
						)}
						{viewType === VIEW_TYPES.COLLECTIONS_FILTER && (
							<FiltersContainer style={{ flex: 1 }}>
								<MultiSelectAccordionInput
									style={{ padding: 0, border: 0 }}
									dropdownStyle={{ flex: 1, maxHeight: '400px' }}
									value={collections}
									onChange={v => setCollections(v)}
									accordionTitle={t('raffle-listings:filters:collections-label')}
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
							</FiltersContainer>
						)}

						<Button
							sx={{
								padding: '12px 0',
							}}
							onClick={() => {
								modal.resolve({
									statuses,
									collections,
									myFavoritesChecked,
									wonByMeChecked,
									participatedByMeChecked,
								})
								modal.hide()
							}}
						>
							{t('common:apply')}
						</Button>
					</ModalBody>
				</ModalContainer>
			</Modal>
		)
	}
)
export default RaffleListingsFilterModal
