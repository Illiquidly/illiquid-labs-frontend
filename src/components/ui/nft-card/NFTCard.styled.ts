import styled from '@emotion/styled'
import { Img } from 'react-image'
import { Text, Flex, Box } from 'theme-ui'

export const Title = styled(Text)<{ size?: string }>`
	font-weight: 700;
	font-size: 20px;
	line-height: 28px;
	letter-spacing: -0.02em;
	color: ${props => props.theme.colors.natural50};

	${props =>
		props.size === 'small' &&
		`
		font-style: normal;
		font-weight: 700;
		font-size: 16px;
		line-height: 24px;
	`}

	${props =>
		props.size === 'medium' &&
		`
		font-weight: 700;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: -0.02em;
	`}
`

export const Subtitle = styled(Text)<{ size?: string }>`
	font-weight: 300;
	font-size: 14px;
	line-height: 28px;
	color: ${props => props.theme.colors.natural300};
	${props =>
		props.size === 'small' &&
		`
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		color: ${props.theme.colors.natural500};
	`}

	${props =>
		props.size === 'medium' &&
		`
		font-weight: 300;
		font-size: 14px;
		line-height: 28px;
		color: ${props.theme.colors.natural300};
	`}
`

Subtitle.defaultProps = {
	sx: {},
}

export const ImageSection = styled(Flex)`
	align-items: center;
	justify-content: center;
	position: relative;

	overflow: hidden;
	border-radius: 8px 8px 0px 0px;
`

ImageSection.defaultProps = {
	sx: {
		bg: 'neutral900',
		borderRadius: '8px 8px 0px 0px',
		aspectRatio: '1 / 1',
	},
}

export const DescriptionSection = styled(Flex)<{ size?: string }>`
	height: 80px;
	padding: 12px;
	border-radius: 0px 0px 8px 8px;

	${props =>
		props.size === 'small' &&
		`
		padding: 8px 12px 12px 15px;
		height: 60px;
	`}

	${props =>
		props.size === 'medium' &&
		`
		height: 80px;
		padding: 12px;
	`}
`

DescriptionSection.defaultProps = {
	sx: {
		bg: 'secondary500',

		flexDirection: 'column',
	},
}

export const CardContainer = styled(Box)<{
	checked?: boolean
}>`
	width: 100%;

	border-radius: 8px;

	border: 2px solid transparent;

	&:hover {
		${props =>
			!props.checked &&
			`
				border: 2px solid rgba(34, 197, 94, 0.2);
			`}
	}

	${props =>
		props.checked &&
		`
		border: 2px solid ${props.theme.colors.success600};
	`}
`

export const RightImageArea = styled(Box)`
	z-index: ${props => props.theme.zIndices.imgOverlay};
	position: absolute;
	right: 8px;
	top: 8px;
`

export const LeftImageArea = styled(Box)`
	z-index: ${props => props.theme.zIndices.imgOverlay};
	position: absolute;
	left: 8px;
	top: 8px;
`

export const BottomImageArea = styled(Box)`
	z-index: ${props => props.theme.zIndices.imgOverlay};
	position: absolute;
	bottom: 0px;
	left: auto;
	right: auto;
`

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	z-index: ${props => props.theme.zIndices.img};
	position: absolute;
`
