import { Text } from 'theme-ui'
import styled from '@emotion/styled'
import { Card } from 'components/ui'

export const ContentCardWrapper = styled.div`
	flex: 1;
	flex-direction: column;
`

export const ContentCard = styled(Card)`
	border-radius: 12px;
`
ContentCard.defaultProps = {
	sx: {
		p: ['16px', '16px', '24px', '24px'],
	},
}

export const ContentCardTitle = styled(Text)``

ContentCardTitle.defaultProps = {
	as: 'h3',
	variant: 'textXlSemibold',
	sx: { lineHeight: '32px' },
	color: 'neutral50',
}

export const ContentCardSubtitle = styled(Text)`
	padding: 2px 0 16px;
`

ContentCardSubtitle.defaultProps = {
	as: 'p',
	variant: 'textSmRegular',
	color: 'gray700',

	sx: { lineHeight: '20px' },
}

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const Label = styled.label`
	color: ${props => props.theme.colors.gray1000};
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	display: block;
	padding-bottom: 6px;
`
