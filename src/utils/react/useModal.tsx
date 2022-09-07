import React, { ReactNode, useState } from 'react'

export const useModal = (initialMode = false) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(initialMode)
	const [modalContent, setModalContent] = useState<ReactNode>(null)
	const [isOverHeader, setIsOverHeader] = useState<boolean>(false)
	const isModalOpenRef = React.useRef(isModalOpen)

	isModalOpenRef.current = isModalOpen

	const handleModal = (content = null, setItOnFullScreen = false) => {
		setIsModalOpen(!isModalOpenRef.current)
		setIsOverHeader(setItOnFullScreen)
		if (content) {
			setModalContent(content)
		}
	}

	return { isModalOpen, handleModal, modalContent, isOverHeader }
}
