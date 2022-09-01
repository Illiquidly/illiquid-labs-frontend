import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'

export const ModalContent = styled(Flex)`
	flex-direction: column;
	flex: 1;
	max-width: 1272px;
`

export const ModalContentHeader = styled(Flex)`
	justify-content: space-between;
	align-items: center;
`

export const ModalOverlay = styled(Flex)`
	position: fixed;
	inset: 0;
	flex: 1;
	flex-direction: column;
	background: rgba(0, 0, 0, 0.7);
`

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

export const ModalTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
`

ModalTitle.defaultProps = {
	sx: {
		fontSize: ['26px', '26px', '34px'],
		lineHeight: ['36px', '36px', '48px'],
	},
}
