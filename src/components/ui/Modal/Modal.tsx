import ReactModal from 'react-modal'
import styled from '@emotion/styled'
import { Box, Flex, IconButton, ThemeUIStyleObject } from 'theme-ui'
import { ModalCloseIcon } from 'assets/icons/modal'
import React from 'react'
import { noop } from 'lodash'
import { useTheme } from '@emotion/react'
import { OnlyMobileAndTablet } from '../Layout/Layout'

const StyledReactModal = styled(ReactModal)`
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
}

const Modal = ({
	isOpen,
	onAfterOpen,
	onRequestClose,
	title,
	children,
	sx,
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
			<Flex sx={{ flex: 1, flexDirection: 'column', bg: 'rgba(0, 0, 0, 0.7)' }}>
				<Flex
					sx={{
						display: ['none', 'none', 'flex'],
						height: '72px',
						p: '24px 16px',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<IconButton size='40px' onClick={onRequestClose}>
						<ModalCloseIcon />
					</IconButton>
				</Flex>
				<Flex
					sx={{
						bg: 'dark100',
						flexDirection: 'column',
						flex: 1,
						p: ['16px', '25px 33.5px', '32px 112px'],
						borderRadius: [0, 0, '16px 16px 0px 0px'],
						position: 'fixed',
						inset: 0,
						...sx,
					}}
				>
					<Flex sx={{ flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
						<Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
							<ModalTitle>{title}</ModalTitle>
							<OnlyMobileAndTablet>
								<IconButton size='40px' onClick={onRequestClose}>
									<ModalCloseIcon fill={theme.colors.dark500} />
								</IconButton>
							</OnlyMobileAndTablet>
						</Flex>
						{children}
					</Flex>
				</Flex>
			</Flex>
		</StyledReactModal>
	)
}

Modal.defaultProps = {
	title: '',
	onAfterOpen: noop,
	onRequestClose: noop,
	sx: {},
}

export default Modal
