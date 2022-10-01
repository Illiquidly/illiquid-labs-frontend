import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import {
	Button,
	Modal,
	RadioCardInput,
	RadioInputGroupProvider,
	MultiSelectInput,
	MultiSelectInputOption,
	SelectChip,
	TextInput,
	TextArea,
	LayoutContainer,
} from 'components/ui'

import { SupportedCollectionsService } from 'services/api'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { LOOKING_FOR_TYPE } from 'components/ui/forms/trade-form-steps'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	RadioText,
	Title,
} from './EditModal.styled'

type LookingFor = {
	amount?: string
	currency?: 'LUNA'
	collectionName?: string
	collectionAddress?: string
}

export interface EditModalProps {
	initialLookingFor?: LookingFor[]
	initialComment?: string
	lookingForItemsLimit?: number
	initialAmount?: string
}

export interface EditModalResult {
	nftsWanted: string[]
	comment: string
	tokenAmount: string
	tokenName: string
	denom: string
	lookingForType: LOOKING_FOR_TYPE
}

const EditModal = NiceModal.create(
	({ initialLookingFor, initialComment }: EditModalProps) => {
		const [selectedLookingFor, setSelectedLookingFor] =
			React.useState<LOOKING_FOR_TYPE>(
				(initialLookingFor ?? []).length
					? LOOKING_FOR_TYPE.SPECIFIC
					: LOOKING_FOR_TYPE.ANY
			)
		const [comment, setComment] = React.useState(initialComment ?? '')

		const initialAmount = (initialLookingFor ?? []).find(x => x.amount)?.amount

		const [amount, setAmount] = React.useState(
			(initialAmount ?? '').replace(',', '.')
		)

		const [selectedCollections, setSelectedCollections] = React.useState<
			MultiSelectInputOption[]
		>(
			(initialLookingFor ?? [])
				.filter(x => x.collectionAddress)
				.map(({ collectionAddress, collectionName }) => ({
					label: collectionName as string,
					value: collectionAddress as string,
				}))
		)

		const wallet = useWallet()

		const { data: verifiedCollections } = useQuery(
			['verifiedCollections'],
			async () =>
				SupportedCollectionsService.getSupportedCollections(wallet.network.name),
			{
				enabled: !!wallet.network,
				retry: true,
			}
		)
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<LayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('trade-listings:edit-modal.title')}
								<IconButton
									sx={{
										borderRadius: '32px',
										backgroundColor: theme.colors.dark500,
									}}
									onClick={modal.remove}
								>
									<ModalCloseIcon />
								</IconButton>
							</ModalHeader>
							<ModalBody>
								<RadioInputGroupProvider
									name='lookingForType'
									value={selectedLookingFor}
									onChange={e =>
										setSelectedLookingFor(e.target.value as LOOKING_FOR_TYPE)
									}
								>
									<Flex sx={{ flexDirection: 'column', gap: '16px', mb: '24px' }}>
										<Flex sx={{ height: '52px' }}>
											<RadioCardInput value={LOOKING_FOR_TYPE.SPECIFIC}>
												<RadioText>
													{t('trade-listings:edit-modal.specific-collections-tokens')}
												</RadioText>
											</RadioCardInput>
										</Flex>
										<Flex sx={{ height: '52px' }}>
											<RadioCardInput value={LOOKING_FOR_TYPE.ANY}>
												<RadioText>
													{t('trade-listings:edit-modal.open-to-any-offers')}
												</RadioText>
											</RadioCardInput>
										</Flex>
									</Flex>
								</RadioInputGroupProvider>

								{selectedLookingFor === LOOKING_FOR_TYPE.SPECIFIC && (
									<Flex sx={{ flexDirection: 'column', gap: '24px', mb: '24px' }}>
										<Box>
											<Box sx={{ mb: '6px' }}>
												<Title>{t('trade-listings:edit-modal:interested-in')}</Title>
											</Box>
											<MultiSelectInput
												value={selectedCollections}
												onChange={v => setSelectedCollections(v)}
												dismissOnOutsideClick
												options={(verifiedCollections ?? [])?.map(
													({ collectionName, collectionAddress }) => ({
														label: collectionName,
														value: collectionAddress,
													})
												)}
												placeholder={t('common:search-collections')}
											/>
											{Boolean(selectedCollections?.length) && (
												<Flex sx={{ mt: '16px', flexWrap: 'wrap', gap: '4.3px' }}>
													{selectedCollections.map(({ label, value }) => (
														<SelectChip
															key={value}
															text={label}
															onRemove={() =>
																setSelectedCollections(prevSelectOptions =>
																	prevSelectOptions.filter(p => p.value !== value)
																)
															}
														/>
													))}
												</Flex>
											)}
										</Box>

										<Box>
											<Box sx={{ mb: '6px' }}>
												<Title>{t('trade-listings:edit-modal:tokens-interested-in')}</Title>
											</Box>
											<TextInput
												value={amount}
												onChange={e => setAmount(e.target.value)}
												placeholder='Enter amount for Luna'
												type='number'
											/>
										</Box>
									</Flex>
								)}
								<Box sx={{ mb: '6px' }}>
									<Title>{t('trade-listings:edit-modal:write-comment')}</Title>
								</Box>
								<TextArea onChange={e => setComment(e.target.value)} value={comment} />
								<Flex
									sx={{
										justifyContent: 'space-between',
										gap: '12px',
										marginTop: '24px',
									}}
								>
									<Button
										variant='secondary'
										sx={{ height: '40px', flex: 1 }}
										onClick={modal.remove}
									>
										{t('trade-listings:edit-modal.discard-changes')}
									</Button>
									<Button
										sx={{ height: '40px', flex: 1, background: theme.colors.primary90 }}
										variant='primary'
										onClick={() => {
											modal.resolve({
												nftsWanted: selectedCollections.map(({ value }) => value),
												comment,
												tokenAmount: amount, // TODO: add multiple tokens in future
												tokenName: 'LUNA',
												lookingForType:
													selectedCollections.length || amount
														? LOOKING_FOR_TYPE.SPECIFIC
														: LOOKING_FOR_TYPE.ANY,
											} as EditModalResult)
											modal.remove()
										}}
									>
										{t('trade-listings:edit-modal.update-listing')}
									</Button>
								</Flex>
							</ModalBody>
						</ModalContent>
					</LayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default EditModal
