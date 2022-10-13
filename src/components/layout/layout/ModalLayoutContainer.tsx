import styled from '@emotion/styled'
import { Box } from 'theme-ui'

export const ModalLayoutContainer = styled(Box)`
	position: relative;
	max-width: 668px;
	width: 100%;
	margin: 0 auto;
`

ModalLayoutContainer.defaultProps = {
	sx: {
		px: ['16px', '32px', '32px', '16px'],
		py: ['16px', '32px', '32px', '16px'],
	},
}
