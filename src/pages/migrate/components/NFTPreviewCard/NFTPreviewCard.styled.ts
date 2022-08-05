import { Img } from 'react-image'
import styled from '@emotion/styled'

export const CloseContainer = styled.div`
	position: absolute;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding: 5px;
`

export const LongText = styled.div`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

export const Card = styled.div<{ disabled?: boolean }>`
	position: relative;
	display: flex;
	flex-direction: column;
	background: #23354d;
	border-radius: 8px;
	overflow: hidden;

	box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
	transition: all 0.5s ease-in-out;

	&:hover {
		box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
		transform: translate3d(0px, -2px, 0px);
	}

	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export const ImageContainer = styled.div``

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
`

export const DividerLine = styled.div`
	margin: 7px 0px;
	border: 1px solid #89a8cf;
`

export const IconSection = styled.div`
	width: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const TitleSection = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const DescriptionSection = styled.div`
	display: flex;
	padding: 4px 0;
	padding-bottom: 6px;
`

export const Description = styled.div`
	font-family: Biryani;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	text-align: center;
	color: #e5ecf5;
	flex: 1;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`
