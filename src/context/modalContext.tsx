import { Modal } from 'components/ui/modal'
import React, { useEffect } from 'react'
import { useModal } from 'utils/react/useModal'

type ModalContextProps = {
	isModalOpen: boolean
	handleModal: (content: any, setItOnFullScreen?: boolean) => void
}

const ModalContext = React.createContext<Partial<ModalContextProps>>({})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const { isModalOpen, handleModal, modalContent, isOverHeader } = useModal()

	useEffect(() => {
		if (isModalOpen) {
			document.querySelector('body')?.classList.add('overflow')
		} else {
			document.querySelector('body')?.classList.remove('overflow')
		}
	}, [isModalOpen])

	return (
		<ModalContext.Provider value={{ isModalOpen, handleModal }}>
			{children}
			<Modal
				isOpen={isModalOpen}
				onCloseModal={() => handleModal()}
				isOverHeader={isOverHeader}
			>
				{modalContent}
			</Modal>
		</ModalContext.Provider>
	)
}

export { ModalContext, ModalProvider }
