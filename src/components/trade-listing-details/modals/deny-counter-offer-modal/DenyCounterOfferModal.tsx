import React from 'react'
import { Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import {
	Button,
	LayoutContainer,
	Modal,
	RadioCardInput,
	RadioInputGroupProvider,
	TextArea,
} from 'components/ui'

import { CounterTrade } from 'services/api/counterTradesService'
import { FormProvider, useForm } from 'react-hook-form'
import getShortText from 'utils/js/getShortText'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Label,
	RadioText,
	Title,
	Subtitle,
} from './DenyCounterOfferModal.styled'

export interface DenyCounterOfferModalProps {
	counterTrade: CounterTrade
}

enum CONFIRM_STATUS_TYPE {
	DEFAULT = '0',
	CONFIRMED = '1',
}

export interface DenyCounterOfferModalResult {
	comment: string
}
export interface DenyCounterOfferModalState {
	confirmStatusType: CONFIRM_STATUS_TYPE
	comment: string
}

const DenyCounterOfferModal = NiceModal.create(
	({ counterTrade }: DenyCounterOfferModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		const formMethods = useForm<DenyCounterOfferModalState>({
			mode: 'all',
			defaultValues: {
				confirmStatusType: CONFIRM_STATUS_TYPE.DEFAULT,
				comment: '',
			},
		})

		const { register, setValue, watch, handleSubmit } = formMethods

		const onSubmit = ({ comment }) => {
			modal.resolve({
				comment,
			} as DenyCounterOfferModalResult)
			modal.remove()
		}

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<LayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('trade-listings:deny-counter-offer-modal.title')}
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
								<FormProvider {...formMethods}>
									<form onSubmit={formMethods.handleSubmit(onSubmit)}>
										<Flex sx={{ flexDirection: 'column', gap: '24px' }}>
											<Flex sx={{ flexDirection: 'column' }}>
												<Title>
													{t('trade-listings:deny-counter-offer-modal.question', {
														username: getShortText(counterTrade?.tradeInfo.owner ?? '', 8),
													})}
												</Title>
												<Subtitle>
													{t('trade-listings:deny-counter-offer-modal.note')}
												</Subtitle>
											</Flex>
											<Flex>
												<RadioInputGroupProvider
													name='confirmStatusType'
													value={watch('confirmStatusType')}
													onChange={e =>
														setValue(
															'confirmStatusType',
															e.target.value as CONFIRM_STATUS_TYPE
														)
													}
												>
													<RadioCardInput value={CONFIRM_STATUS_TYPE.CONFIRMED}>
														<RadioText>
															{t('trade-listings:deny-counter-offer-modal.radio-text')}
														</RadioText>
													</RadioCardInput>
												</RadioInputGroupProvider>
											</Flex>

											<Flex sx={{ flexDirection: 'column' }}>
												<Label htmlFor='comment'>
													{t('trade-listings:deny-counter-offer-modal:send-message')}
												</Label>
												<TextArea
													id='comment'
													style={{ height: '128px' }}
													{...register('comment')}
													placeholder={t(
														'trade-listings:deny-counter-offer-modal:enter-text'
													)}
												/>
											</Flex>
											<Flex
												sx={{
													gap: '12px',
													marginTop: '24px',
												}}
											>
												<Button onClick={modal.remove} variant='secondary' fullWidth>
													{t('trade-listings:deny-counter-offer-modal.back-to-listing')}
												</Button>
												<Button
													variant='gradient'
													fullWidth
													disabled={
														watch('confirmStatusType') === CONFIRM_STATUS_TYPE.DEFAULT
													}
													onClick={handleSubmit}
												>
													{t('trade-listings:deny-counter-offer-modal.deny-offer')}
												</Button>
											</Flex>
										</Flex>
									</form>
								</FormProvider>
							</ModalBody>
						</ModalContent>
					</LayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default DenyCounterOfferModal
