import { noop } from 'lodash'
import React from 'react'
import {
	MainModalContainer,
	ModalBackdrop,
	ModalContainer,
	ModalContent,
	ModalHeader,
	ModalTitle,
	StyledModal,
} from './Modal.styled'

type ModalProps = {
	onClose?: () => void
	open: boolean
	title: string
	children: React.ReactChild | React.ReactChild[]
}

function Modal({ onClose, open, title, children }: ModalProps) {
	return (
		<StyledModal
			overlayClassName='overlay'
			isOpen={open}
			onRequestClose={onClose}
		>
			<MainModalContainer>
				<ModalBackdrop onClick={() => onClose?.()} />
				<ModalContainer>
					<ModalHeader>
						<ModalTitle>{title}</ModalTitle>
					</ModalHeader>

					<ModalContent>{children}</ModalContent>
				</ModalContainer>
			</MainModalContainer>
		</StyledModal>
	)
}

Modal.defaultProps = {
	onClose: noop,
}
export default Modal
