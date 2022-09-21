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
} from './TradeListingsFilterModal.styled'

export type TradeListingsFilterModalProps = {
	verifiedCollections?: SupportedCollectionGetResponse[]
	statuses: MultiSelectAccordionInputOption[]
	lookingForCollections: MultiSelectAccordionInputOption[]
	collections: MultiSelectAccordionInputOption[]
	counteredByMeChecked: boolean
	myFavoritesChecked: boolean
	lookingForLiquidAssetsChecked: boolean
	statusOptions: MultiSelectAccordionInputOption[]
}

enum VIEW_TYPES {
	MAIN = 0,
	STATUSES_FILTER = 1,
	COLLECTIONS_FILTER = 2,
	LOOKING_FOR_FILTER = 3,
}

const TradeListingsFilterModal = NiceModal.create(
	({
		statuses: defaultStatuses,
		lookingForCollections: defaultLookingForCollections,
		collections: defaultCollections,
		counteredByMeChecked: defaultCounteredByMeChecked,
		myFavoritesChecked: defaultMyFavoritesChecked,
		lookingForLiquidAssetsChecked: defaultLookingForLiquidAssetsChecked,
		statusOptions,
		verifiedCollections,
	}: TradeListingsFilterModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const [viewType, setViewType] = React.useState<VIEW_TYPES>(VIEW_TYPES.MAIN)

		const [statuses, setStatuses] =
			React.useState<MultiSelectAccordionInputOption[]>(defaultStatuses)
		const [lookingForCollections, setLookingForCollections] = React.useState<
			MultiSelectAccordionInputOption[]
		>(defaultLookingForCollections)
		const [collections, setCollections] =
			React.useState<MultiSelectAccordionInputOption[]>(defaultCollections)

		const [myFavoritesChecked, setMyFavoritesChecked] = React.useState(
			defaultMyFavoritesChecked
		)

		const [counteredByMeChecked, setCounteredByMeChecked] = React.useState(
			defaultCounteredByMeChecked
		)

		const [lookingForLiquidAssetsChecked, setLookingForLiquidAssetsChecked] =
			React.useState(defaultLookingForLiquidAssetsChecked)

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
								onNavigateLookingFor={() => setViewType(VIEW_TYPES.LOOKING_FOR_FILTER)}
								myFavoritesChecked={myFavoritesChecked}
								setMyFavoritesChecked={setMyFavoritesChecked}
								counteredByMeChecked={counteredByMeChecked}
								setCounteredByMeChecked={setCounteredByMeChecked}
								lookingForLiquidAssetsChecked={lookingForLiquidAssetsChecked}
								setLookingForLiquidAssetsChecked={setLookingForLiquidAssetsChecked}
							/>
						)}
						{viewType === VIEW_TYPES.STATUSES_FILTER && (
							<FiltersContainer style={{ flex: 1 }}>
								<MultiSelectAccordionInput
									style={{ padding: 0, border: 0 }}
									dropdownStyle={{ flex: 1, maxHeight: 'unset' }}
									value={statuses}
									onChange={v => setStatuses(v)}
									accordionTitle={t('trade-listings:filters:status-label')}
									options={statusOptions}
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
									accordionTitle={t('trade-listings:filters:collections-label')}
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
							</FiltersContainer>
						)}
						{viewType === VIEW_TYPES.LOOKING_FOR_FILTER && (
							<FiltersContainer style={{ flex: 1 }}>
								<MultiSelectAccordionInput
									style={{ padding: 0, border: 0 }}
									dropdownStyle={{ flex: 1, maxHeight: '400px' }}
									value={lookingForCollections}
									onChange={v => setLookingForCollections(v)}
									accordionTitle={t('trade-listings:filters:looking-for-label')}
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
							</FiltersContainer>
						)}
						<Button
							sx={{
								padding: '12px 0',
							}}
							onClick={() => {
								modal.resolve({
									statuses,
									lookingForCollections,
									collections,
									myFavoritesChecked,
									counteredByMeChecked,
									lookingForLiquidAssetsChecked,
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
export default TradeListingsFilterModal
