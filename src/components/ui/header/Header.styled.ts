import styled from '@emotion/styled'
import { HEADER_HEIGHT } from 'constants/components'

import { Flex } from 'theme-ui'

export const HeaderWrapper = styled(Flex)`
	background-color: ${props => props.theme.colors.dark200};
	position: fixed;
	top: 0;
	z-index: 1;

	& + * {
		padding-top: ${HEADER_HEIGHT}; /* ensure that element below header has padding of a header height */
	}
`

HeaderWrapper.defaultProps = {
	sx: {
		display: ['none', 'none', 'block'],
		width: '100%',
		py: ['18px'],
		minHeight: HEADER_HEIGHT,
	},
}
