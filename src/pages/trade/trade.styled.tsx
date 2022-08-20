import styled from '@emotion/styled'

import { Flex, Text } from 'theme-ui'

export const Container = styled(Flex)`
	flex-direction: column;
	flex: 1;
	overflow: auto;
`

/* Responsive Styles */
Container.defaultProps = {
	sx: {
		p: ['12px 15px', '32px 34.5px', '32px 124px', '32px 248px'],
	},
}

export const Title = styled(Text)`
	color: ${props => props.theme.colors.gray1000};
`

Title.defaultProps = {
	sx: { fontSize: ['24px', '34px'] },
	variant: 'displayXsBold',
}

export const CardTitle = styled(Text)``

CardTitle.defaultProps = {
	as: 'div',
	variant: 'textXlSemibold',
	sx: { lineHeight: '32px', textAlign: 'center' },
	color: 'neutral50',
}

export const CardSubtitle = styled(Text)``

CardSubtitle.defaultProps = {
	as: 'div',
	variant: 'textSmRegular',
	color: 'gray700',
	sx: { lineHeight: '20px', textAlign: 'center' },
}
