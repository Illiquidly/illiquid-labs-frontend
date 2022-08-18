import styled from '@emotion/styled'

import { Flex, Text } from 'theme-ui'

export const Container = styled(Flex)`
	flex-direction: column;
	flex: 1;
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

export const Circle = styled(Flex)`
	align-items: center;
	justify-content: center;

	background-color: ${props => props.theme.colors.dark100};
	border-radius: 100%;
	padding: 4px;

	width: 32px;
	height: 32px;
`
