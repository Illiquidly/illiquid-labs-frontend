import React, { useRef } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'
import { Global, css } from '@emotion/react'
import { useOnClickOutside } from 'utils/react/useOnClickOutside'
import { ModalContainer, ModalWrapper } from './Modal.styled'

export interface ModalProps {
	isOpen: boolean
	children: React.ReactNode
	isOverHeader?: boolean
	onCloseModal: () => void
	sx?: ThemeUIStyleObject
	disableDismissOnOutsideClick?: boolean
}

const Modal: React.FunctionComponent<ModalProps> = ({
	isOpen = false,
	onCloseModal,
	children,
	isOverHeader,
	disableDismissOnOutsideClick = false,
}) => {
	const containerRef = useRef(null)
	useOnClickOutside(containerRef, () =>
		disableDismissOnOutsideClick ? {} : onCloseModal()
	)

	if (!isOpen) return null

	return (
		<>
			<Global
				styles={css`
					body {
						overflow: hidden;
					}
				`}
			/>
			<ModalWrapper isOpen={isOpen}>
				<ModalContainer ref={containerRef} isOverHeader={isOverHeader}>
					{children}
				</ModalContainer>
			</ModalWrapper>
		</>
	)
}

export default Modal
