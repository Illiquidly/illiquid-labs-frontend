import styled from '@emotion/styled'
import { theme } from 'constants/theme'
import { HEADER_HEIGHT } from 'constants/components'

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

const TradeBackground = styled(Box)`
	position: absolute;
	z-index: ${theme.zIndices.backgroundImages};
	${() =>
		css({
			display: ['none', null, null, 'block'],
		})}
`

export const TradeBackgroundLogoContainer = styled(TradeBackground)`
	top: calc(20px + ${HEADER_HEIGHT});
	left: -84px; /* Trying to match design */
`
export const TradeBackgroundBlobContainer = styled(TradeBackground)`
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
