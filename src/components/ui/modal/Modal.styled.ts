import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { HEADER_HEIGHT } from 'constants/components'

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
	display: ${props => (props.isOpen ? 'block' : 'none')};
	z-index: ${props => props.theme.zIndices.modal};
	width: 100%;
	height: 100%;
	position: fixed;
	inset: 0;
`

export const ModalContainer = styled.div<{ isOverHeader?: boolean }>`
	position: absolute;
	top: ${HEADER_HEIGHT};
	width: 100%;
	height: 100%;
	left: 50%;
	transform: translateX(-50%);
	min-width: 310px;
	overflow: auto;
	max-height: calc(100vh - ${HEADER_HEIGHT});

	${props =>
		props.isOverHeader &&
		css`
			max-height: 100vh;
			top: 0;
		`}
`
