import { Modal } from 'components/ui/modal'
import React, { useEffect } from 'react'
import { useModal } from 'utils/react/useModal'

type ContextProps = {
	isModalOpen: boolean
	handleModal: (content: any) => void
}

const ModalContext = React.createContext<Partial<ContextProps>>({})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const { isModalOpen, handleModal, modalContent } = useModal()

	useEffect(() => {
		if (isModalOpen) {
			document.querySelector('body')?.classList.add('overflow')
		} else {
			document.querySelector('body')?.classList.remove('overflow')
		}
	}, [isModalOpen])

	return (
		<ModalContext.Provider value={{ isModalOpen, handleModal }}>
			<Modal isActive={isModalOpen} closeModal={() => handleModal()}>
				{modalContent}
			</Modal>
			{children}
		</ModalContext.Provider>
	)
}

export { ModalContext, ModalProvider }
