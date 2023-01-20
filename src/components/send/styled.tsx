import styled from '@emotion/styled'
import { theme } from 'constants/theme'
import { HEADER_HEIGHT } from 'constants/components'
import { Img } from 'react-image'

import { Box, css, Flex, Text } from 'theme-ui'

export const Container = styled(Flex)`
	flex-direction: column;
	flex: 1;
	width: 100%;
	max-width: 976px; /* 944 width from design + 32px padding */
	margin: auto;
`

Container.defaultProps = {
	sx: {
		py: ['12px', '32px'],
	},
}

const SendBackground = styled(Box)`
	position: absolute;
	z-index: ${theme.zIndices.backgroundImages};
	${() =>
		css({
			display: ['none', null, null, 'block'],
		})}
`

export const SendBackgroundLogoContainer = styled(SendBackground)`
	top: calc(20px + ${HEADER_HEIGHT});
	left: -84px; /* Trying to match design */
`
export const SendBackgroundBlobContainer = styled(SendBackground)`
	top: 0;
	right: -72px; /* Trying to match design */
`

export const HeaderTitle = styled(Text)`
	color: ${props => props.theme.colors.gray1000};
`

HeaderTitle.defaultProps = {
	sx: { fontSize: ['24px', '34px'] },
	variant: 'displayXsBold',
}

export const HeaderSubtitleContainer = styled(Box)``

HeaderSubtitleContainer.defaultProps = {
	ml: 'auto',
	sx: { display: ['block', 'block', 'none'], alignSelf: 'center' },
}

export const StepsWrapper = styled(Flex)``

StepsWrapper.defaultProps = {
	sx: {
		display: ['none', 'none', 'flex'],
		mr: '32px',
		maxWidth: '244px',
		alignItems: 'flex-start',
		flex: 1,
	},
}

export const MobileStepsWrapper = styled(Flex)``

MobileStepsWrapper.defaultProps = {
	sx: { display: ['block', 'block', 'none'], mb: ['12px', '32px'] },
}

export const HeaderContainer = styled(Flex)``

HeaderContainer.defaultProps = {
	mb: ['16px', '16px', '24px'],
	sx: {
		height: ['48px'],
		padding: ['0 0.5px', '0'],
	},
}

export const HeaderTitleContainer = styled(Flex)``

HeaderTitleContainer.defaultProps = {
	sx: { alignItems: ['initial', 'initial', 'center'] },
}

export const BodyContainer = styled(Flex)``

BodyContainer.defaultProps = {
	sx: { flexDirection: ['column', 'column', 'row'], px: '0.5px', pb: '48px' },
}

export const PreviewNFTsSection = styled.div`
	flex: 1;
	display: flex;
	height: 41px;
	align-items: center;
	padding-left: 4px;
	padding-right: 4px;
	overflow: hidden;
	gap: 4px;

	width: 166px;

	font-style: normal;
	font-weight: 700;
	font-size: 12px;
`

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	z-index: ${props => props.theme.zIndices.listingCardImg};
	position: absolute;
`

export const PreviewImage = styled(Image)`
	position: unset;
`

export const PreviewImageContainer = styled.div`
	aspect-ratio: 1/1;
	height: 90px;
	overflow: hidden;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${props => props.theme.colors.neutral900};
	border-radius: 8px;
`

export const NFTDetailsLabel = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
`
