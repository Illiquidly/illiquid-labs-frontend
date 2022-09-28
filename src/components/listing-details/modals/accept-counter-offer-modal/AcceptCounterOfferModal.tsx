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

import { CounterOffer } from 'types'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	RadioText,
} from './AcceptCounterOfferModal.styled'

export interface AcceptCounterOfferModalProps {
	acceptCounterOffer: (offer: CounterOffer) => void
	offer: CounterOffer
}

const AcceptCounterOfferModal = NiceModal.create(
	({ acceptCounterOffer, offer }: AcceptCounterOfferModalProps) => {
		const [value, setValue] = React.useState(1)
		const [message, setMessage] = React.useState('')
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		const onAcceptOffer = () => {
			acceptCounterOffer(offer)
			modal.remove()
		}

		const onBacktoListing = () => {
			modal.remove()
		}

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
								<Flex>
									<Title>
										{t('trade-listings:accept-counter-offer-modal.question', {
											username: offer?.user?.username,
										})}
									</Title>
								</Flex>
								<RadioInputGroupProvider
									name='radio'
									value={value}
									onChange={e => setValue(Number(e.target.value))}
								>
									<Flex sx={{ height: '56px' }}>
										<RadioCardInput value={0}>
											<RadioText>
												{t('trade-listings:accept-counter-offer-modal.radio-text')}
											</RadioText>
										</RadioCardInput>
									</Flex>
								</RadioInputGroupProvider>
								<Title>
									{t('trade-listings:accept-counter-offer-modal:send-message')}
								</Title>
								<TextArea
									onChange={e => setMessage(e.target.value)}
									placeholder={t('trade-listings:accept-counter-offer-modal:enter-text')}
									value={message}
								/>
								<Flex
									sx={{
										justifyContent: 'space-between',
										gap: '12px',
										marginTop: '24px',
									}}
								>
									<Button
										onClick={onBacktoListing}
										variant='secondary'
										sx={{ height: '40px', flex: 1 }}
									>
										{t('trade-listings:accept-counter-offer-modal.back-to-listing')}
									</Button>
									<Button
										sx={{ height: '40px', flex: 1, background: theme.colors.primary90 }}
										variant='primary'
										disabled={value === 1}
										onClick={onAcceptOffer}
									>
										{t('trade-listings:accept-counter-offer-modal.accept-offer')}
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
export default AcceptCounterOfferModal
