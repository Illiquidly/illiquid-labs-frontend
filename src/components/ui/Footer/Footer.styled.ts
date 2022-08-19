import styled from '@emotion/styled'

import { Flex, Text } from 'theme-ui'

export const Container = styled(Flex)`
	background-color: ${props => props.theme.colors.dark200};
	flex: 1;
	width: 100%;
`

export const LightText = styled(Text)`
	color: ${props => props.theme.colors.gray600};

	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
`

export const MenuLinkText = styled(Text)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;

	&:hover {
		cursor: pointer;
	}
`
