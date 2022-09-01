import styled from '@emotion/styled'
import { HEADER_HEIGHT } from 'constants/components'
import { Box } from 'theme-ui'

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
	display: ${props => (props.isOpen ? 'block' : 'none')};
	z-index: ${props => props.theme.zIndices.modal};
	width: 100%;
	height: 100%;
	position: fixed;
`

export const ModalContainer = styled(Box)`
	position: absolute;
	top: ${HEADER_HEIGHT};
	left: 50%;
	transform: translateX(-50%);
	min-width: 310px;
	overflow: auto;
	max-height: calc(100vh - ${HEADER_HEIGHT});
`

ModalContainer.defaultProps = {
	sx: {},
}
