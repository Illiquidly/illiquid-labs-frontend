import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

const BlueWarning = styled(Flex)`
	background-color: rgba(45, 115, 255, 0.4);
	border-radius: 8px;
	padding: 8px 0px;
	justify-content: center;
	text-align: center;
	border: 1.62px solid ${props => props.theme.colors.primary200};
	align-items: center;

	color: ${props => props.theme.colors.primary200};
	font-size: 16px;
	line-height: 32.37px;
	font-weight: 500;
`

export default BlueWarning
