import styled from '@emotion/styled'

import { Flex, Text, Box } from 'theme-ui'

export const FooterWrapper = styled(Flex)``

FooterWrapper.defaultProps = {
	sx: {
		height: ['0', '0', '244.89px', '244.89px', '286.89px'],
		width: '100%',
	},
}

export const Content = styled(Flex)`
	background-color: ${props => props.theme.colors.dark200};
	flex: 1;
	width: 100%;
`

Content.defaultProps = {
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

export const LitepaperText = styled(Text)`
	font-size: 14px;
`

export const RightFooterSection = styled(Flex)`
	flex: 1;
	flex-direction: column;
	align-items: flex-end;
	margin-top: 14px;
`

export const LeftFooterSection = styled(Flex)`
	flex-direction: column;
	flex: 1;
	max-width: 399px;
	margin-top: '12px';
`

export const LinksContainer = styled(Flex)`
	gap: 32px;
	margin-right: 17px;
`

export const SocialActionContainer = styled(Flex)`
	align-items: center;
	margin-top: auto;
	gap: 20px;
`

export const TradeMarkContainer = styled(Flex)`
	margin-top: auto;
	margin-bottom: 8px;
`

export const ProductDescriptionContainer = styled(Box)`
	margin-top: 16px;
`
