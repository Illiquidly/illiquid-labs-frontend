import styled from '@emotion/styled'

import { Flex, Text } from 'theme-ui'

export const FooterWrapper = styled(Flex)``

FooterWrapper.defaultProps = {
	sx: {
		height: ['0', '0', '244.89px', '244.89px', '286.89px'],
		width: '100%',
	},
}

export const Container = styled(Flex)`
	background-color: ${props => props.theme.colors.dark200};
	flex: 1;
	width: 100%;
`

Container.defaultProps = {
	sx: {
		p: ['0', '0', '24px 100px', '24px 100px', '34px 100px'],
	},
}

export const LightText = styled(Text)`
	color: ${props => props.theme.colors.gray600};

	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
`

export const LinkText = styled(Text)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;

	&:hover {
		cursor: pointer;
	}
`
