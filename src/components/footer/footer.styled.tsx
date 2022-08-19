import styled from '@emotion/styled'

import { Flex, Text, Box } from 'theme-ui'
import Button from 'components/ui/Button/Button'


export const Container = styled(Flex)`
	flex-direction: column;
	flex: 1;
`

export const FooterContainer = styled(Container)`
	background-color: ${props => props.theme.colors.dark200};
	height:287px;
`

export const FooterSubContainer = styled(Flex)`
	justify-content: space-between;
	padding-top: 20px;
`

export const CenteredFlex = styled(Flex)`
	align-items: center;
	gap:20px;
	padding: 10px 0px
`
export const LightText = styled(Text)`
	color: ${props => props.theme.colors.gray600};

	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
`

export const IlliquidlyText = styled(LightText)`
	width: 414px;
`

export const LogoContainer = styled(Container)` 
	display: flex;
	gap: 15px;
	padding-bottom: 10px;
`

export const MenuContainer = styled(Flex)`
	justify-content: end;
	display: flex;
	padding: 0px;
	gap: 8px;
	flex: none;
	order: 1;
	flex-grow: 0;

`

export const MenuBox = styled(Box)`
	height: 36px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 8px 16px;
	gap: 6px;
`

export const MenuBoxText = styled(Text)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	/* identical to box height, or 150% */
`

export const LitePaperButton = styled(Button)`

font-size: 14px;

`


/* Responsive Styles */
Container.defaultProps = {
	sx: {
		p: ['12px 15px', '32px 34.5px', '32px 124px', '16px 0px'],
	},
}

/* Responsive Styles */
FooterContainer.defaultProps = {
	sx: {
		p: ['12px 15px', '32px 34.5px', '32px 124px', '26px 100px 24px 100px'],
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
