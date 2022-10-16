import styled from '@emotion/styled'

import { Flex, Text } from 'theme-ui'

export const FooterWrapper = styled(Flex)`
	background-color: ${props => props.theme.colors.dark200};
	padding: 48px 0 34px;
`

FooterWrapper.defaultProps = {
	sx: {
		display: ['none', 'none', 'block'],
		width: '100%',
		mt: 'auto',
	},
}

export const Content = styled(Flex)`
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

export const LitepaperText = styled(Text)`
	font-size: 14px;
`

export const LeftFooterSection = styled(Flex)`
	flex-direction: column;
	max-width: 414px;
`

export const RightFooterSection = styled(Flex)`
	flex: 1;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
`

export const LinksContainer = styled(Flex)`
	gap: 32px;
	margin-right: 16px;
`

export const SocialActionContainer = styled(Flex)`
	align-items: center;
	margin-top: auto;
	gap: 20px;
`

export const TradeMarkContainer = styled(Flex)`
	margin-bottom: 8px;
`
