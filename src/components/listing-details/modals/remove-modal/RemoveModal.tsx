import React from 'react'
import { Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'
import { useRouter } from 'next/router'

import { ModalCloseIcon } from 'assets/icons/modal'

import {
	Button,
	Modal,
	RadioCardInput,
	RadioInputGroupProvider,
} from 'components/ui'

import { CheckLineIcon } from 'assets/icons/24pt'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Text,
	Title,
	RadioText,
} from './RemoveModal.styled'

export interface RemoveModalProps {
	remove: () => void
}

const RemoveModal = NiceModal.create(({ remove }: RemoveModalProps) => {
	const [value, setValue] = React.useState(1)
	const [removed, setRemoved] = React.useState(false)
	const modal = useModal()

	const router = useRouter()
	const { t } = useTranslation(['common', 'trade-listings'])

	const theme = useTheme()

	const onDelete = () => {
		remove()
		setRemoved(true)
	}

	const removeSuggestion = () => (
		<ModalBody>
			<Flex sx={{ justifyContent: 'space-between', gap: '8px' }}>
				<Flex
					sx={{
						borderRadius: '32px',
						backgroundColor: theme.colors.error100,
						minWidth: '32px',
						justifyContent: 'center',
						height: '32px',
						fontSize: '25px',
					}}
				>
					!
				</Flex>
				<Flex sx={{ flexDirection: 'column', gap: '4px' }}>
					<Title>{t('trade-listings:remove-modal.question')}</Title>
					<Text>{t('trade-listings:remove-modal.answer')}</Text>
				</Flex>
			</Flex>
			<RadioInputGroupProvider
				name='radio'
				value={value}
				onChange={e => setValue(Number(e.target.value))}
			>
				<Flex sx={{ height: '56px' }}>
					<RadioCardInput value={0}>
						<RadioText>{t('trade-listings:remove-modal.radio-text')}</RadioText>
					</RadioCardInput>
				</Flex>
			</RadioInputGroupProvider>
			<Flex
				sx={{ justifyContent: 'space-between', gap: '12px', marginTop: '24px' }}
			>
				<Button variant='secondary' sx={{ height: '40px', flex: 1 }}>
					{t('trade-listings:remove-modal.edit-listing')}
				</Button>
				<Button
					sx={{ backgroundColor: theme.colors.error100, height: '40px', flex: 1 }}
					variant='primary'
					disabled={value === 1}
					onClick={onDelete}
				>
					{t('trade-listings:remove-modal.remove-listing')}
				</Button>
			</Flex>
		</ModalBody>
	)

	const onGoToDashboard = () => {
		modal.remove()
		router.push('/')
	}
	const removeApproval = () => (
		<ModalBody>
			<Flex sx={{ justifyContent: 'space-between', gap: '8px' }}>
				<Flex
					sx={{
						borderRadius: '32px',
						backgroundColor: theme.colors.success100,
						minWidth: '32px',
						justifyContent: 'center',
						alignItems: 'center',
						height: '32px',
					}}
				>
					<CheckLineIcon />
				</Flex>
				<Flex sx={{ flexDirection: 'column', gap: '4px' }}>
					<Title>{t('trade-listings:remove-modal.removal-succesful')}</Title>
					<Text>{t('trade-listings:remove-modal.create-listing-suggestion')}</Text>
				</Flex>
			</Flex>
			<Flex
				sx={{ justifyContent: 'space-between', gap: '12px', marginTop: '24px' }}
			>
				<Button variant='secondary' sx={{ height: '40px', flex: 1 }}>
					{t('trade-listings:remove-modal.create-new-listing')}
				</Button>
				<Button
					sx={{ height: '40px', flex: 1, background: theme.colors.primary90 }}
					variant='primary'
					onClick={onGoToDashboard}
				>
					{t('trade-listings:remove-modal.go-to-dashboard')}
				</Button>
			</Flex>
		</ModalBody>
	)

	return (
		<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
			<ModalContainer>
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
					{!removed && removeSuggestion()}
					{removed && removeApproval()}
				</ModalContent>
			</ModalContainer>
		</Modal>
	)
})
export default RemoveModal
