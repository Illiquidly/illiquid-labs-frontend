import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const StyledDiv = styled(Flex)`
	background-color: rgba(45, 115, 255, 0.4);
	border-radius: 8px;
	padding: 8px 0px;
	justify-content: center;
	text-align: center;
	border: 1.62px solid #4a87ff;

	color: #4a87ff;
	font-size: 16px;
	line-height: 32.37px;
	font-weight: 500;
`

function BlueWarning({ children, ...props }) {
	return <StyledDiv {...props}>{children}</StyledDiv>
}

export default BlueWarning
