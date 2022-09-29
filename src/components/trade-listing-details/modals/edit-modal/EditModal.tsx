import React from 'react'
import { Flex, IconButton } from 'theme-ui'
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
	Select,
	TextArea,
	LayoutContainer,
} from 'components/ui'

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
	denom?: string
	collectionName?: string
}

export interface EditModalProps {
	lookingFor: LookingFor[]
	lookingForItemsLimit?: number
	removeLookingFor: (l: LookingFor) => void
}

const EditModal = NiceModal.create(
	({ lookingFor, removeLookingFor }: EditModalProps) => {
		const [value, setValue] = React.useState(1)
		const [comment, setComment] = React.useState('')
		const [selectedToken, setSelectedToken] = React.useState(1)
		const [selectedOptions, setSelectedOptions] = React.useState<
			MultiSelectInputOption[]
		>([])
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		const TokenDropdown = () => {
			return (
				<Flex sx={{ flexWrap: 'wrap' }}>
					<Select
						selected={selectedToken}
						options={[
							{
								value: 'Luna',
								element: 'Luna',
							},
						]}
						handleSelect={setSelectedToken}
					/>
				</Flex>
			)
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
								<RadioInputGroupProvider
									name='radio'
									value={value}
									onChange={e => setValue(Number(e.target.value))}
								>
									<Flex sx={{ height: '56px' }}>
										<RadioCardInput value={0}>
											<RadioText>
												{t('trade-listings:edit-modal.specific-collections-tokens')}
											</RadioText>
										</RadioCardInput>
									</Flex>
									<Flex sx={{ height: '56px' }}>
										<RadioCardInput value={0}>
											<RadioText>
												{t('trade-listings:edit-modal.open-to-any-offers')}
											</RadioText>
										</RadioCardInput>
									</Flex>
								</RadioInputGroupProvider>
								<Title>{t('trade-listings:edit-modal:interested-in')}</Title>
								<MultiSelectInput
									value={selectedOptions}
									onChange={v => setSelectedOptions(v)}
									dismissOnOutsideClick
									options={[
										{
											label: 'DeGods',
											value: 'terrra1asjdkasdkajhsdkahskd',
										},
										{
											label: 'JustApe',
											value: 'terrra1asjdkasdkajhsdskahskd',
										},
										{
											label: 'Transcendental Fox Collection',
											value: 'terrra1assjdkasdkajhsdkahskd',
										},
										{
											label: 'Hasbulla the God',
											value: 'terrra1assjdkaadkajhsdkahskd',
										},
									]}
									placeholder={t('common:search-collections')}
								/>
								{lookingFor?.length && (
									<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
										{lookingFor.map(item => (
											<SelectChip
												key={JSON.stringify(value)}
												item={item.denom || item.collectionName || ''}
												onRemove={() => removeLookingFor(item)}
											/>
										))}
									</Flex>
								)}
								<Title>{t('trade-listings:edit-modal:tokens-interested-in')}</Title>
								<TextInput
									style={{ fontSize: '16px', lineHeight: '20px' }}
									placeholder='Enter amount for Luna'
									iconRight={<TokenDropdown />}
								/>
								<Title>{t('trade-listings:edit-modal:write-comment')}</Title>
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
