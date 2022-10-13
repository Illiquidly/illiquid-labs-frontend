import styled from '@emotion/styled'
import { Img } from 'react-image'

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

export const Grid = styled.div`
	display: grid;
	padding: 8px;
	margin-top: 8px;
	grid-template-columns: repeat(auto-fit, minmax(65px, 1fr));
	grid-template-rows: max-content;
	background: ${props => props.theme.colors.dark100};
	border-radius: 8px;
	grid-gap: 8px;
`
export const PreviewImageContainer = styled.div`
	aspect-ratio: 1/1;
	overflow: hidden;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	z-index: ${props => props.theme.zIndices.listingCardImg};
	position: absolute;

	transition: transform 0.2s;

	&:hover {
		transform: scale(1.02);
	}
`

export const PreviewImage = styled(Image)`
	position: unset;
	border-radius: 8px;
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
	font-weight: 600;
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
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	margin: 0;
	margin-bottom: 4px;

	color: ${props => props.theme.colors.gray1000};
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

export const CoinCard = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 4px 6px 4px 4px;
	gap: 8px;

	width: 100%;
	background: ${props => props.theme.colors.dark500};
	border-radius: 6px;

	font-family: 'Heebo';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
`
