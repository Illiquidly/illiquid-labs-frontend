import styled from '@emotion/styled'
import { Box } from 'theme-ui'

export const Container = styled(Box)`
	/* To be defined -> there are too many of them */
	position: relative;
	max-width: 1272px; /* 1240 width from design + 32px padding */
	width: 100%;
	margin: 0 auto;
`

Container.defaultProps = {
	sx: {
		px: ['16px', '32px', '32px', '16px'],
	},
}
