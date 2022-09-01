import React, { ReactNode, useState } from 'react'

export const useModal = (initialMode = false) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(initialMode)
	const [modalContent, setModalContent] = useState<ReactNode>(null)
	const isModalOpenRef = React.useRef(isModalOpen)

	isModalOpenRef.current = isModalOpen

	const handleModal = (content = null) => {
		setIsModalOpen(!isModalOpenRef.current)
		if (content) {
			setModalContent(content)
		}
	}

	return { isModalOpen, handleModal, modalContent }
}
