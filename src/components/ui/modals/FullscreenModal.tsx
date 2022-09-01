import { useTheme } from '@emotion/react'
import { ModalCloseIcon } from 'assets/icons/modal'
import { ModalContext } from 'context/modalContext'
import { noop } from 'lodash'
import React from 'react'
import { IconButton, Box, Flex } from 'theme-ui'
import { OnlyMobileAndTablet } from '../layout'
import {
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalBody,
	ModalContentHeader,
	ModalTitle,
} from './FullscreenModal.styled'

export interface FullscreenModalProps {
	title?: string
	children?: React.ReactNode
	headerRightActionComponent?: React.ReactNode
	headerExtraContentComponent?: React.ReactNode
}

const FullscreenModal = ({
	title,
	headerRightActionComponent,
	headerExtraContentComponent,
	children,
}: FullscreenModalProps) => {
	const { handleModal } = React.useContext(ModalContext)
	const theme = useTheme()

	return (
		<ModalOverlay>
			<ModalHeader onClick={() => handleModal?.(null)}>
				<ModalContent>
					<Box ml='auto' mr='-12px'>
						<IconButton size='40px' onClick={() => handleModal?.(null)}>
							<ModalCloseIcon />
						</IconButton>
					</Box>
				</ModalContent>
			</ModalHeader>
			<ModalBody>
				<ModalContent>
					<Flex sx={{ flexDirection: 'column' }}>
						<ModalContentHeader>
							<Flex sx={{ width: '100%' }}>
								<ModalTitle>{title}</ModalTitle>
								<Box sx={{ ml: 'auto' }}>{headerRightActionComponent}</Box>
							</Flex>
							<OnlyMobileAndTablet>
								<IconButton size='40px' onClick={() => handleModal?.(null)}>
									<ModalCloseIcon fill={theme.colors.dark500} />
								</IconButton>
							</OnlyMobileAndTablet>
						</ModalContentHeader>
						{headerExtraContentComponent}
					</Flex>
					{children}
				</ModalContent>
			</ModalBody>
		</ModalOverlay>
	)
}

FullscreenModal.defaultProps = {
	title: '',
	onAfterOpen: noop,
	onRequestClose: noop,
	headerRightActionComponent: noop,
	headerExtraContentComponent: noop,
}

export default FullscreenModal
