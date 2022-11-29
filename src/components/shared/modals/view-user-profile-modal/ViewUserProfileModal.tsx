import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import { ModalLayoutContainer } from 'components/layout'
import { NftInfoResponse } from 'services/blockchain/contracts/nameservice/nameservice'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import { WalletIcon } from 'assets/icons/mixed'
import useAddress from 'hooks/useAddress'
import getShortText from 'utils/js/getShortText'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	SectionCard,
	Image,
	ImageContainer,
	UserTitle,
	WalletAddress,
	SectionTitle,
	SectionText,
} from './ViewUserProfileModal.styled'

export interface ViewUserProfileModalProps {
	user?: NftInfoResponse
}
export interface ViewUserProfileResultProps {
	user?: NftInfoResponse
}

const ViewUserProfileModal = NiceModal.create(
	({ user }: ViewUserProfileModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common'])

		const theme = useTheme()

		const myAddress = useAddress()

		const imageUrl = React.useMemo(
			() => fromIPFSImageURLtoImageURL(user?.extension?.image ?? ''),
			[user]
		)

		const name = React.useMemo(
			() => user?.extension?.publicName ?? user?.extension?.name,
			[user]
		)

		const bio = React.useMemo(() => user?.extension?.publicBio ?? '', [user])

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('common:user-profile-modal.title')}
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
								<SectionCard>
									<Flex
										sx={{
											flexDirection: ['column', 'row'],
											flex: [1],
											alignItems: 'center',
											gap: [0, '17px'],
										}}
									>
										<ImageContainer>
											{imageUrl?.every(img => img === '') ? (
												<ImagePlaceholder width='61.56px' height='57.87px' />
											) : (
												<Image src={imageUrl} />
											)}
										</ImageContainer>
										<Flex
											sx={{
												flexDirection: ['column'],
												gap: '8px',
												alignItems: ['center', 'start'],
												flex: 1,
											}}
										>
											<Box sx={{ mt: '16px' }}>
												<UserTitle>{name ?? t('common:unnamed')}</UserTitle>
											</Box>
											<Flex sx={{ alignItems: 'center' }}>
												<WalletIcon width='13.71px' height='11.43px' />
												<Box sx={{ ml: '8px' }}>
													<WalletAddress>{getShortText(myAddress, 8)}</WalletAddress>
												</Box>
											</Flex>
											<Flex sx={{ flexDirection: ['row'], gap: ['10px'] }}>
												<Button variant='gradient' disabled>
													{t('common:user-profile-modal.view-collection')}
												</Button>

												<Button variant='secondary' disabled>
													{t('common:user-profile-modal.edit-profile')}
												</Button>
											</Flex>
										</Flex>
									</Flex>
								</SectionCard>

								<SectionCard>
									<Flex
										sx={{
											flexDirection: 'column',
											gap: '4px',
										}}
									>
										<SectionTitle>{t('common:user-profile-modal.bio')}</SectionTitle>
										<SectionText>
											{bio ?? t('common:user-profile-modal.no-bio')}
										</SectionText>
									</Flex>
								</SectionCard>
								{/* <Flex
									sx={{
										justifyContent: 'space-between',
										gap: '12px',
										marginTop: '24px',
									}}
								>
									<Button
										variant='secondary'
										fullWidth
										onClick={() => {
											modal.remove()
										}}
									>
										{t('common:user-profile-modal.discard')}
									</Button>
									<Button
										variant='gradient'
										fullWidth
										onClick={() => {
											modal.remove()
										}}
									>
										{t('common:user-profile-modal.update')}
									</Button>
								</Flex> */}
							</ModalBody>
						</ModalContent>
					</ModalLayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default ViewUserProfileModal
