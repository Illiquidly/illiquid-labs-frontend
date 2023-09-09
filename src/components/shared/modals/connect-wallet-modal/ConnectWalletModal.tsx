import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useWallet } from '@terra-money/wallet-kit'
import { Button, Modal } from 'components/ui'
import { IconButton } from 'theme-ui'
import { ModalCloseIcon } from 'assets/icons/modal'
import { ModalLayoutContainer } from 'components/layout'
import { useTheme } from '@emotion/react'
import { useTranslation } from 'next-i18next'
import {
	ModalBody,
	ModalContainer,
	ModalContent,
	ModalHeader,
	SectionCard,
} from './ConnectWalletModal.styled'

export const ConnectWalletModal = NiceModal.create(() => {
	const { connect, availableWallets } = useWallet()

	const modal = useModal()

	const theme = useTheme()

	const { t } = useTranslation()

	return (
		<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
			<ModalContainer>
				<ModalLayoutContainer>
					<ModalContent>
						<ModalHeader>
							{t('common:connect-wallet')}
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
								{availableWallets.map(({ id, name, isInstalled }) => (
									<Button
										variant='primary'
										onClick={() => {
											connect(id)
											modal.remove()
										}}
										disabled={!isInstalled}
										key={id}
									>
										Connect {name}
									</Button>
								))}
							</SectionCard>
						</ModalBody>
					</ModalContent>
				</ModalLayoutContainer>
			</ModalContainer>
		</Modal>
	)
})
