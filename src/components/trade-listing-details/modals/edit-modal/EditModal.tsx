import React from 'react'
import { Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import {
	Button,
	Modal,
	RadioInputGroupProvider,
	MultiSelectInput,
	SelectChip,
	TextArea,
} from 'components/ui'

import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'

import { SupportedCollectionsService } from 'services/api'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'

import {
	Controller,
	FormProvider,
	useFieldArray,
	useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { TokenInputField } from 'components/form'
import { ModalLayoutContainer } from 'components/layout'
import { VERIFIED_COLLECTIONS } from 'constants/use-query-keys'
import { TradeDetailsStepSchema } from 'constants/validation-schemas/trade'
import { LOOKING_FOR_TYPE } from 'types'
import { FieldLabel } from 'components/form/components'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	ModalActions,
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

export interface EditModalPropsState {
	lookingForType: LOOKING_FOR_TYPE
	collection: string
	collections: MultiSelectAccordionInputOption[]
	tokenAmount: string
	tokenName: string
	comment: string
}

const EditModal = NiceModal.create(
	({ initialLookingFor, initialComment }: EditModalProps) => {
		const wallet = useWallet()

		const { data: verifiedCollections } = useQuery(
			[VERIFIED_COLLECTIONS],
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

		const formMethods = useForm<EditModalPropsState>({
			mode: 'all',
			resolver: yupResolver(TradeDetailsStepSchema),
			defaultValues: {
				lookingForType: (initialLookingFor ?? []).length
					? LOOKING_FOR_TYPE.SPECIFIC
					: LOOKING_FOR_TYPE.ANY,
				comment: initialComment ?? '',
				collections: (initialLookingFor ?? [])
					.filter(x => x.collectionAddress)
					.map(({ collectionAddress, collectionName }) => ({
						label: collectionName as string,
						value: collectionAddress as string,
					})),
				tokenName: 'Luna',
				tokenAmount: (initialLookingFor ?? []).find(x => x.amount)?.amount ?? '',
			},
		})

		const {
			register,
			setValue,
			getValues,
			watch,
			control,
			formState: { errors },
		} = formMethods

		const { remove } = useFieldArray({
			control,
			name: 'collections',
		})

		const onSubmit = ({
			lookingForType,
			collections,
			comment,
			tokenAmount,
			tokenName,
		}) => {
			modal.resolve({
				nftsWanted: collections.map(({ value }) => value),
				comment,
				tokenAmount,
				tokenName,
				lookingForType,
			} as EditModalResult)
			modal.remove()
		}

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
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
							<FormProvider {...formMethods}>
								<form onSubmit={formMethods.handleSubmit(onSubmit)}>
									<ModalBody>
										<RadioInputGroupProvider
											value={watch('lookingForType')}
											name={register('lookingForType').name}
											onChange={e =>
												setValue('lookingForType', e.target.value as LOOKING_FOR_TYPE)
											}
										>
											<Flex sx={{ flexDirection: 'column', gap: '16px', mb: '24px' }}>
												<RadioCard value={LOOKING_FOR_TYPE.SPECIFIC}>
													<RadioCardText>
														{t('trade-listings:edit-modal.specific-collections-tokens')}
													</RadioCardText>
												</RadioCard>
												<RadioCard value={LOOKING_FOR_TYPE.ANY}>
													<RadioCardText>
														{t('trade-listings:edit-modal.open-to-any-offers')}
													</RadioCardText>
												</RadioCard>
											</Flex>
										</RadioInputGroupProvider>

										{watch('lookingForType') === LOOKING_FOR_TYPE.SPECIFIC && (
											<Flex sx={{ flexDirection: 'column', gap: '24px' }}>
												<Flex sx={{ flexDirection: 'column' }}>
													<FieldLabel htmlFor='collections'>
														{t('trade-listings:edit-modal:interested-in')}
													</FieldLabel>
													<Controller
														name='collections'
														control={control}
														render={({ field: { value, onChange, onBlur } }) => (
															<Flex sx={{ maxHeight: '42px', flex: 1 }}>
																<MultiSelectInput
																	error={!!errors.collections}
																	placeholder={t('trade-listings:edit-modal:interested-in')}
																	dropdownTitle={t('trade-listings:edit-modal:nft-name')}
																	value={value}
																	onBlur={onBlur}
																	onChange={onChange}
																	dismissOnOutsideClick
																	options={(verifiedCollections ?? []).map(collection => ({
																		label: collection.collectionName,
																		value: collection.collectionAddress,
																	}))}
																/>
															</Flex>
														)}
													/>
													{Boolean(watch('collections')?.length) && (
														<Flex sx={{ mt: '16px', flexWrap: 'wrap', gap: '4.3px' }}>
															{watch('collections').map(({ label, value }, index) => (
																<SelectChip
																	key={value}
																	text={label}
																	onRemove={() => remove(index)}
																/>
															))}
														</Flex>
													)}
												</Flex>

												<TokenInputField
													label={t('trade-listings:edit-modal:tokens-interested-in')}
													id='tokenAmount'
													{...register('tokenAmount')}
													fieldError={
														errors.tokenAmount &&
														t(`common:errors.${errors.tokenAmount.message}`)
													}
													error={!!errors.tokenAmount}
													placeholder={t(
														'trade-listings:edit-modal:enter-amount-placeholder',
														{
															tokenName: getValues('tokenName'),
														}
													)}
													tokenName={getValues('tokenName')}
												/>
											</Flex>
										)}
										<FieldLabel htmlFor='comment'>
											{t('trade-listings:edit-modal:write-comment')}
										</FieldLabel>
										<TextArea
											id='comment'
											style={{ height: '128px' }}
											{...register('comment')}
											placeholder={t('trade-listings:edit-modal:write-comment')}
										/>
										<ModalActions>
											<Button variant='secondary' fullWidth onClick={modal.remove}>
												{t('trade-listings:edit-modal.discard-changes')}
											</Button>
											<Button variant='gradient' fullWidth type='submit'>
												{t('trade-listings:edit-modal.update-listing')}
											</Button>
										</ModalActions>
									</ModalBody>
								</form>
							</FormProvider>
						</ModalContent>
					</ModalLayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default EditModal
