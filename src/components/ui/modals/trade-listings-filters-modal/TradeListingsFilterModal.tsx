import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
	CloseIconSmall,
	CollectionsBoxesIcon,
	FilterArrowRightIcon,
	LookingForCompassIcon,
	TargetIcon,
} from 'assets/icons/mixed'
import { Button } from 'components/ui/button'
import { Checkbox } from 'components/ui/checkbox'
import Modal from 'components/ui/modal/Modal'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SupportedCollectionGetResponse } from 'services/api/supportedCollectionsService'
import { Box, IconButton } from 'theme-ui'
import {
	CheckboxesContainer,
	FilterAction,
	FiltersContainer,
	FilterSection,
	FilterText,
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
}

const TradeListingsFilterModal = NiceModal.create(
	({
		statuses: defaultStatuses,
		lookingForCollections: defaultLookingForCollections,
		collections: defaultCollections,
		counteredByMeChecked: defaultCounteredByMeChecked,
		myFavoritesChecked: defaultMyFavoritesChecked,
		lookingForLiquidAssetsChecked: defaultLookingForLiquidAssetsChecked,
	}: TradeListingsFilterModalProps) => {
		const { t } = useTranslation(['common', 'trade-listings'])
		const modal = useModal()

		const [statuses] =
			React.useState<MultiSelectAccordionInputOption[]>(defaultStatuses)
		const [lookingForCollections] = React.useState<
			MultiSelectAccordionInputOption[]
		>(defaultLookingForCollections)
		const [collections] =
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
						<FiltersContainer>
							<FilterSection>
								<TargetIcon />
								<FilterText>{t('trade-listings:filters:status-label')}</FilterText>
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
							<FilterSection>
								<CollectionsBoxesIcon />
								<FilterText>{t('trade-listings:filters:collections-label')}</FilterText>
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
							<FilterSection>
								<LookingForCompassIcon />
								<FilterText>{t('trade-listings:filters:looking-for-label')}</FilterText>
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
								/>
								<FilterText>
									{t('trade-listings:filters:my-favorites-label')}
								</FilterText>
								<Box sx={{ flex: 1 }} />
							</FilterSection>
							<FilterSection>
								<Checkbox
									checked={counteredByMeChecked}
									onChange={e => setCounteredByMeChecked(e.target.checked)}
								/>
								<FilterText>
									{t('trade-listings:filters:countered-by-me-label')}
								</FilterText>
								<Box sx={{ flex: 1 }} />
							</FilterSection>
							<FilterSection>
								<Checkbox
									checked={lookingForLiquidAssetsChecked}
									onChange={e => setLookingForLiquidAssetsChecked(e.target.checked)}
								/>
								<FilterText>
									{t('trade-listings:filters:looking-for-liquid-assets-label')}
								</FilterText>
								<Box sx={{ flex: 1 }} />
							</FilterSection>
						</CheckboxesContainer>
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
