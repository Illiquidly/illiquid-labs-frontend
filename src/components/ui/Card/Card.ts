import styled from 'styled-components'
import { Flex } from 'reflexbox/styled-components'

const Card = styled(Flex)`
	flex: 1;
	flex-direction: column;
	background: ${props => props.theme.colors.dark300};
	border: 1px solid ${props => props.theme.colors.dark500};

	box-shadow: ${props => props.theme.shadows.small};
	border-radius: 12px;
`

export default Card
