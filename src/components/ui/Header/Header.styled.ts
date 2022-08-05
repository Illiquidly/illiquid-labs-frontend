import styled from '@emotion/styled'
import { Box, Flex } from 'rebass'
import { withAttrs } from 'hoc/withAttrs'

export const HeaderContainer = withAttrs(
	styled(Flex)`
		display: flex;
		height: 64px;
		background: #18283d;
		margin-bottom: 0px;
		align-items: center;
		box-shadow: 0px 4px 20px 3px rgba(137, 168, 207, 0.35);
	`,
	{
		padding: ['24px 16px', '24px 24px'],
		paddingRight: ['8px', '24px'],
	}
)

export const LogoContainer = withAttrs(
	styled(Flex)`
		display: flex;
		cursor: pointer;
	`,
	{
		width: ['140px', '160px'],
	}
)

export const QuickLinksSection = withAttrs(
	styled(Flex)`
		width: 150px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
	{
		marginLeft: ['0', '64px'],
		marginTop: ['auto', '10px'],
	}
)

export const ContentSection = styled.div`
	margin-left: 84px;
	display: flex;
`

export const LinkText = withAttrs(
	styled(Box)<{ checked?: boolean }>`
		font-style: normal;
		font-weight: 400;
		cursor: pointer;

		color: ${props => (props.checked ? '#fff' : '#A0BFE4')};
	`,
	{
		fontSize: [4, 4, 5],
		marginRight: [0, '48px'],
		marginTop: [4, 5, 0],
		fontFamily: 'Pixelade',
	}
)

export const RightHeaderActionsSection = withAttrs(
	styled(Flex)`
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex: 1;
	`,
	{
		marginLeft: 'auto',
	}
)

export const IconLink = styled.a`
	cursor: pointer;
`

export const ConnectionButtonText = withAttrs(
	styled(Box)`
		font-family: 'Pixelade';
		font-style: normal;
		font-weight: 400;
		color: #e5ecf5;
	`,
	{
		marginLeft: [3, 3],
		fontSize: [4, 4],
	}
)

export const ConnectionButton = styled(Flex)`
	display: flex;
	font-style: normal;
	cursor: pointer;
	font-weight: normal;
	border-radius: 0;
	padding: 0;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	&:hover: {
		background-color: transparent;
	}
`
