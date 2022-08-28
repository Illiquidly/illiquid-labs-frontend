import styled from '@emotion/styled'

import { Flex } from 'theme-ui'

export const HeaderWrapper = styled(Flex)`
	background-color: ${props => props.theme.colors.dark200};
	padding: 48px 0 34px;
`

HeaderWrapper.defaultProps = {
	sx: {
		display: ['none', 'none', 'block'],
		width: '100%',
		mt: 'auto',
	},
}
