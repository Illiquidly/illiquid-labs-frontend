import styled from '@emotion/styled'
import { Box } from 'theme-ui'
import { Container } from './LayoutContainer.styled'

export const ModalLayoutContainer = styled(Box)`
	position: relative;
	max-width: 842px;
	width: 100%;
	margin: 0 auto;
`

Container.defaultProps = {
	sx: {
		px: ['16px', '32px', '32px', '16px'],
	},
}
