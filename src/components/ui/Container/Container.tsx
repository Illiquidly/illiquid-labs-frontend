import styled from '@emotion/styled'
import { withAttrs } from 'hoc/withAttrs'
import { Flex } from 'rebass'

export const MainContainer = withAttrs(
	styled(Flex)`
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		flex: 1;
	`,
	{
		padding: ['24px 24px', '24px 24px', '48px 84px'],
		flex: 1,
		maxWidth: ['1311px', '1511px'],
	}
)

export const MainLayoutContainer = styled(Flex)`
	display: flex;
	flex: 1;
	flex-direction: column;
	position: fixed;
	inset: 0px;
	z-index: 0;
`

export const MainContentContainer = styled(Flex)`
	flex: 1;
	justify-content: center;
	overflow: auto;
`
