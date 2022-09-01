import { ModalContext } from 'context/modalContext'
import { useContext } from 'react'
import { Container } from './TestModal.styled'

const TestModal = () => {
	const { handleModal } = useContext(ModalContext)

	return (
		<Container>
			<button type='button' onClick={() => handleModal?.(null)}>
				Close modal
			</button>
		</Container>
	)
}

export default TestModal
