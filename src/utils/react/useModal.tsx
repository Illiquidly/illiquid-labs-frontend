import { ReactNode, useState } from 'react'

export const useModal = (initialMode = false) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(initialMode)
	const [modalContent, setModalContent] = useState<ReactNode>(null)

	const handleModal = (content = null) => {
		setIsModalOpen(!isModalOpen)
		if (content) {
			setModalContent(content)
		}
	}

	return { isModalOpen, handleModal, modalContent }
}
