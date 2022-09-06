import styled from '@emotion/styled'
import { Card } from 'components'

import { Box, Text } from 'theme-ui'

export const ContentCard = styled(Card)`
	border-radius: 12px;
`

ContentCard.defaultProps = {
	sx: {
		p: ['32px 28px', '52px 58px', '32px 28px', '52px 84px'],
		alignItems: 'center',
	},
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

export const TradeAssetImageContainer = styled(Box)``

TradeAssetImageContainer.defaultProps = {
	sx: { mb: '7px' },
}
