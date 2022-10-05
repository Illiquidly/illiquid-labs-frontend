import styled from '@emotion/styled'
import { Box } from 'theme-ui'

export const ModalTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
`

ModalTitle.defaultProps = {
	sx: {
		fontSize: ['26px', '26px', '34px'],
		lineHeight: ['36px', '36px', '48px'],
	},
}
