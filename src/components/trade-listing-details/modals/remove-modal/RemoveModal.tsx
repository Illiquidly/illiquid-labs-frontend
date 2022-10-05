import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon, ModalErrorCircleIcon } from 'assets/icons/modal'

import {
	Button,
	Modal,
	RadioCardInput as RadioCard,
	RadioInputGroupProvider,
} from 'components/ui'

import { ModalLayoutContainer } from 'components/layout'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Subtitle,
	RadioText,
} from './RemoveModal.styled'

export interface RemoveModalProps {
	tradeId: string
}

enum CONFIRM_STATUS_TYPE {
	DEFAULT = '0',
	CONFIRMED = '1',
}

const RemoveModal = NiceModal.create(({ tradeId }: RemoveModalProps) => {
	const [confirmStatus, setConfirmStatus] = React.useState(
		CONFIRM_STATUS_TYPE.DEFAULT
	)
	const modal = useModal()

	const { t } = useTranslation(['common', 'trade-listings'])

	const theme = useTheme()

	const onRemove = () => {
		modal.resolve({ tradeId })
		modal.remove()
	}

	return (
		<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
			<ModalContainer>
				<ModalLayoutContainer>
					<ModalContent>
						<ModalHeader>
							{t('trade-listings:remove-modal.title')}
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
							<ModalBody>
								<Flex sx={{ gap: '8px' }}>
									<Box sx={{ width: '32px', height: '32px' }}>
										<ModalErrorCircleIcon />
									</Box>
									<Flex sx={{ flex: 1, flexDirection: 'column' }}>
										<Title>{t('trade-listings:remove-modal.question')}</Title>
										<Subtitle>{t('trade-listings:remove-modal.answer')}</Subtitle>
									</Flex>
								</Flex>
								<RadioInputGroupProvider
									name='confirmStatus'
									value={confirmStatus}
									onChange={e => setConfirmStatus(e.target.value as CONFIRM_STATUS_TYPE)}
								>
									<RadioCard value={CONFIRM_STATUS_TYPE.CONFIRMED}>
										<RadioText>{t('trade-listings:remove-modal.radio-text')}</RadioText>
									</RadioCard>
								</RadioInputGroupProvider>
								<Flex
									sx={{
										justifyContent: 'space-between',
										gap: '12px',
										marginTop: '24px',
									}}
								>
									<Button variant='secondary' fullWidth onClick={modal.remove}>
										{t('trade-listings:remove-modal.back-to-listing')}
									</Button>
									<Button
										variant='destructive'
										fullWidth
										disabled={confirmStatus === CONFIRM_STATUS_TYPE.DEFAULT}
										onClick={onRemove}
									>
										{t('trade-listings:remove-modal.remove-listing')}
									</Button>
								</Flex>
							</ModalBody>
						</ModalBody>
					</ModalContent>
				</ModalLayoutContainer>
			</ModalContainer>
		</Modal>
	)
})
export default RemoveModal
