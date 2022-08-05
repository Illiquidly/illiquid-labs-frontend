import styled from '@emotion/styled'
import { Button } from 'rebass'

export const IconButton = styled(Button)<{ disabled?: boolean }>`
	background: transparent !important;

	&:hover {
		cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};

		transform: ${props => (props.disabled ? 'scale(1)' : 'scale(0.99)')};
		/* Scaling button to 0.98 to its original size */
	}
`
