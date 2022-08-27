import styled from '@emotion/styled'
import { Card } from 'components/ui/card'

import { Box, css, Flex, Text } from 'theme-ui'

export const Container = styled(Flex)`
	flex-direction: column;
	flex: 1;
	width: 100%;
	max-width: 976px; /* 944 width from design + 32px padding */
	margin: auto;
`

/* Responsive Styles */
Container.defaultProps = {
	sx: {
		p: ['12px 16px', '32px', '32px 16px'],
	},
}

const TradeBackground = styled(Box)`
	position: absolute;
	z-index: -1;
	${() =>
		css({
			display: ['none', null, null, 'block'],
		})}
`

export const TradeBackgroundLogoContainer = styled(TradeBackground)`
	top: 100px;
`
export const TradeBackgroundBlobContainer = styled(TradeBackground)`
	top: 0;
	right: 0;
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

export const ContentCardTitle = styled(Text)``

ContentCardTitle.defaultProps = {
	as: 'div',
	variant: 'textXlSemibold',
	sx: { lineHeight: '32px', textAlign: 'center' },
	color: 'neutral50',
}

export const ContentCardSubtitle = styled(Text)``

ContentCardSubtitle.defaultProps = {
	as: 'div',
	variant: 'textSmRegular',
	color: 'gray700',
	sx: { lineHeight: '20px', textAlign: 'center' },
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

export const ContentCard = styled(Card)`
	border-radius: 12px;
`

ContentCard.defaultProps = {
	sx: {
		p: ['32px 28px', '52px 58px', '32px 28px', '52px 84px'],
		alignItems: 'center',
	},
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

export const TradeAssetImageContainer = styled(Box)``

TradeAssetImageContainer.defaultProps = {
	sx: { mb: '7px' },
}

export const BodyContainer = styled(Flex)``

BodyContainer.defaultProps = {
	sx: { flexDirection: ['column', 'column', 'row'], px: '0.5px' },
}
