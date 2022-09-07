import styled from '@emotion/styled'
import { Img } from 'react-image'
import { Box, Flex, Text } from 'theme-ui'

export const Title = styled(Text)`
	font-style: normal;
	font-weight: 700;
	font-size: 21px;
	line-height: 30px;

	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.natural50};
`

export const Subtitle = styled(Text)`
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 30px;

	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.natural300};
`

Subtitle.defaultProps = {
	sx: {},
}

export const ImageSection = styled(Flex)`
	align-items: center;
	justify-content: center;
	position: relative;
	border-radius: 8px;
	overflow: hidden;
`

ImageSection.defaultProps = {
	sx: {
		bg: 'neutral900',
		aspectRatio: '1 / 1',
	},
}

export const DescriptionSection = styled(Flex)`
	flex-direction: column;
	margin-top: 12px;
	height: 62px;
`

export const LookingForSection = styled(Flex)`
	flex-direction: column;
	margin-top: 12px;
	height: 88.6px;
`

export const LookingForTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 30px;

	letter-spacing: -0.02em;
	text-transform: uppercase;

	color: ${props => props.theme.colors.natural300};
`

export const CardContainer = styled.div`
	width: 100%;
	position: relative;
	padding: 12px;

	background: ${props => props.theme.colors.secondary500};

	border: 1.34px solid ${props => props.theme.colors.dark500};

	box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
		0px 1px 2px rgba(16, 24, 40, 0.06);
	border-radius: 10px;

	&:hover {
		border: 1.34px solid rgba(34, 197, 94, 0.2);
	}
`

export const RightImageArea = styled.div`
	z-index: ${props => props.theme.zIndices.imgOverlay};
	position: absolute;
	right: 8px;
	top: 8px;
`

export const BottomImageArea = styled.div`
	z-index: ${props => props.theme.zIndices.imgOverlay};
	position: absolute;
	bottom: 8px;
	margin-left: auto;
	margin-right: auto;
`

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	z-index: ${props => props.theme.zIndices.img};
	position: absolute;
`
