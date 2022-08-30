import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const ModalContent = styled(Flex)``

ModalContent.defaultProps = {
	sx: {
		flexDirection: 'column',
		flex: 1,
		maxWidth: '1272px',
	},
}

export const ModalContentHeader = styled(Flex)``

ModalContentHeader.defaultProps = {
	sx: { justifyContent: 'space-between', alignItems: 'center' },
}

export const ModalOverlay = styled(Flex)``

ModalOverlay.defaultProps = {
	sx: {
		position: 'fixed',
		inset: 0,
		flex: 1,
		flexDirection: 'column',
		bg: 'rgba(0, 0, 0, 0.7)',
	},
}

export const ModalHeader = styled(Flex)``

ModalHeader.defaultProps = {
	sx: {
		display: ['none', 'none', 'flex'],
		height: '72px',
		p: '24px 16px',
		justifyContent: 'center',
		alignItems: 'center',
	},
}

export const ModalBody = styled(Flex)``

ModalBody.defaultProps = {
	sx: {
		bg: 'dark100',
		flex: 1,
		p: ['16px', '25px 33.5px', '32px 112px'],
		borderRadius: [0, 0, '16px 16px 0px 0px'],
		overflow: 'hidden',
		justifyContent: 'center',
	},
}
