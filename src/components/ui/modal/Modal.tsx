import ReactModal from 'react-modal'
import styled from '@emotion/styled'
import { Box, Flex, IconButton, ThemeUIStyleObject } from 'theme-ui'
import { ModalCloseIcon } from 'assets/icons/modal'
import React from 'react'
import { noop } from 'lodash'
import { useTheme } from '@emotion/react'
import { OnlyMobileAndTablet } from '../layout/Layout'
import {
	ModalBody,
	ModalContent,
	ModalContentHeader,
	ModalHeader,
	ModalOverlay,
} from './Modal.styled'

const StyledReactModal = styled(ReactModal)`
	z-index: ${props => props.theme.zIndices.modal};
	flex-direction: column;
	display: flex;
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background-color: transparent;

	& .overlay: {
		background-color: transparent;
	}
`

const ModalTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
`

ModalTitle.defaultProps = {
	sx: {
		fontSize: ['26px', '26px', '34px'],
		lineHeight: ['36px', '36px', '48px'],
	},
}

export interface ModalProps {
	title?: string
	isOpen: boolean
	onAfterOpen?: () => void
	onRequestClose?: () => void
	children?: React.ReactNode
	sx?: ThemeUIStyleObject
	headerRightActionComponent?: React.ReactNode
	headerExtraContentComponent?: React.ReactNode
}

const Modal = ({
	isOpen,
	onAfterOpen,
	onRequestClose,
	title,
	children,
	headerRightActionComponent,
	headerExtraContentComponent,
}: ModalProps) => {
	const theme = useTheme()
	return (
		<StyledReactModal
			{...{
				isOpen,
				onAfterOpen,
				onRequestClose,
			}}
			overlayClassName='overlay'
		>
			<ModalOverlay>
				<ModalHeader onClick={onRequestClose}>
					<ModalContent>
						<Box ml='auto' mr='-12px'>
							<IconButton size='40px'>
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
									<IconButton size='40px' onClick={onRequestClose}>
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
		</StyledReactModal>
	)
}

Modal.defaultProps = {
	title: '',
	onAfterOpen: noop,
	onRequestClose: noop,
	headerRightActionComponent: noop,
	headerExtraContentComponent: noop,
}

export default Modal
