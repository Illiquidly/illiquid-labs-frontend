import styled from 'styled-components'
import { Box } from 'reflexbox/styled-components'
import ReactModal from 'react-modal'
import { MainContainer } from '../Container/Container'

export const StyledModal = styled(ReactModal)`
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background-color: transparent;

	& .overlay: {
		background-color: transparent;
	}
`

export const MainModalContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	align-items: center;
`
export const ModalBackdrop = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;

	background: linear-gradient(
		180deg,
		rgba(229, 236, 245, 0.094) 0%,
		rgba(229, 236, 245, 0) 107.14%,
		rgba(0, 0, 0, 0.1) 107.14%
	);
	backdrop-filter: blur(22px);
`
export const ModalContainer = styled(MainContainer).attrs({
	maxWidth: 800,
	margin: [12, 0],
	padding: ['24px 24px'],
})`
	z-index: 9;
	border: 1px solid #89a8cf;
	border-radius: 10px;
	border: 1px solid transparent;
	border-radius: 10px;
	background: linear-gradient(0deg, rgb(39, 53, 75) 0%, rgb(39, 53, 75) 100%),
		linear-gradient(90deg, #01c46c 0%, #3697f0 100%);
	background-clip: padding-box, border-box;
	background-origin: padding-box, border-box;
`

export const ModalHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`

export const ModalHeaderRightActions = styled.div`
	margin-left: auto;
`

export const IconWrapper = styled.div`
	margin-right: -8px;
`

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 0px;
	padding-bottom: 0px;
`

export const ModalTitle = styled(Box).attrs({
	fontSize: [32, 40],
})`
	font-family: 'Pixelade';
	font-style: normal;
	font-weight: 400;
	color: #ffffff;
`
