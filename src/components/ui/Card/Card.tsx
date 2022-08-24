import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

const Card = styled(Flex)`
	flex: 1;
	flex-direction: column;
	background: ${props => props.theme.colors.dark300};
	border: 1px solid ${props => props.theme.colors.dark500};

	box-shadow: ${props => props.theme.shadows.small};
	border-radius: 8px;
`

export default Card
