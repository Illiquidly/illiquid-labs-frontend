import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'components/theme/theme'
import { Img } from 'react-image'
import { Flex, Text } from 'theme-ui'

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

interface CardContainerProps {
	checked?: boolean
	isCover?: boolean
}

export const CardContainer = styled.div<CardContainerProps>`
	width: 100%;
	border-radius: 8px;
	border: 2px solid transparent;
	position: relative;

	${props =>
		props.isCover
			? css`
					& .coverLabel {
						display: block;
					}
			  `
			: css`
					& .coverLabel {
						display: none;
					}
			  `}

	&:hover {
		${props =>
			!props.checked &&
			`
				border: 2px solid rgba(34, 197, 94, 0.2);
			`}

		& .coverLabel {
			display: block;
		}
	}

	${props =>
		props.checked &&
		`
		border: 2px solid ${props.theme.colors.success600};
	`}
`

export const RightImageArea = styled.div`
	z-index: ${props => props.theme.zIndices.imgOverlay};
	position: absolute;
	right: 8px;
	top: 8px;
`

export const CoverLabel = styled.div<{ isCover?: boolean }>`
	z-index: ${props => props.theme.zIndices.imgOverlay};
	position: absolute;
	left: 12px;
	top: 8px;
	padding: 2px 12px;
	min-width: 82px;
	text-align: center;
	cursor: pointer;
	font-family: 'Heebo';
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	border-radius: 42px;
	background-color: ${theme.colors.dark300};
	display: block;

	${props =>
		props.isCover &&
		css`
			background-color: ${theme.colors.success400};
		`}
`

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	z-index: ${props => props.theme.zIndices.img};
	position: absolute;
`
