import styled from '@emotion/styled'

export const ModalContainer = styled.div`
	display: flex;
	width: 100%;
	min-height: 100%;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.7);
`

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 12px;
	border: 1px solid transparent;
	position: relative;
	overflow: hidden;
	margin-top: 80px;
	background: ${props => props.theme.colors.dark400};
`

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	line-height: 20px;
	height: 59px;
	border-bottom: 1px solid ${props => props.theme.colors.dark500};
	padding: 0 12px;
	background: ${props => props.theme.colors.dark200};
`

export const ModalBody = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 24px 12px;
	overflow: auto;
	gap: 24px;
`

export const Title = styled.p`
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	margin: 0;
	margin-bottom: 4px;
`

export const Subtitle = styled.p`
	font-family: 'Heebo';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	margin: 0;
	color: ${props => props.theme.colors.gray700};
`
