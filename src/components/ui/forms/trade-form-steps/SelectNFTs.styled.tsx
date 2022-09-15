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

export const ContentCardTitle = styled(Text)`
	font-weight: 600;
	font-size: 20px;
	line-height: 32px;
	margin: 0;
	padding-bottom: 2px;

	& span {
		margin-left: 4px;
		padding: 2px 12px;
		background-color: rgba(45, 115, 255, 0.4);
		color: ${props => props.theme.colors.natural50};
		border-radius: 42px;
	}
`

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

export const ListOfSelectedNFTsCard = styled(Card)``

ListOfSelectedNFTsCard.defaultProps = {
	sx: {
		p: ['16px 12px', '24px 16px', '24px'],
	},
}

export const NFTCardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
	padding-top: 24px;
`
