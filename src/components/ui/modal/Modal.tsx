import React, { useRef } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'
import { useOnClickOutside } from 'utils/react/useOnClickOutside'
import { ModalContainer, ModalWrapper } from './Modal.styled'

export interface ModalProps {
	isActive: boolean
	children: React.ReactNode
	closeModal: () => void
	sx?: ThemeUIStyleObject
}

const Modal: React.FunctionComponent<ModalProps> = ({
	isActive = false,
	closeModal,
	children,
}) => {
	const containerRef = useRef(null)
	useOnClickOutside(containerRef, closeModal)

	if (!isActive) return null

	return (
		<ModalWrapper isActive={isActive}>
			<ModalContainer ref={containerRef}>{children}</ModalContainer>
		</ModalWrapper>
	)
}

export default Modal
