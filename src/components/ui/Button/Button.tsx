import { Button as RebassButton } from 'rebass'
import styled from '@emotion/styled'

export const Button = styled(RebassButton)<{
	fullWidth?: boolean
	disabled?: boolean
}>`
	${props => (props.fullWidth ? 'flex: 1 !important;' : '')}
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	padding: 6px 24px !important;
	font-size: 22px !important;
	font-family: 'Pixelade';
	font-style: normal;
	font-weight: 400;
	border-radius: 4px;
	background: linear-gradient(
		89.97deg,
		#88a1c1 -77.6%,
		#3f608c 56.9%,
		#2e5180 88.51%,
		#0b59c4 114.84%
	);
	flex-shrink: 0;
	box-sizing: border-box;
	color: #a0bfe4 !important;

	&:hover {
		cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
		background: linear-gradient(
			89.97deg,
			#88a1c1 -77.6%,
			#3f608c 56.9%,
			#2e5180 88.51%,
			#0b59c4 114.84%
		);
		transform: ${props => (props.disabled ? 'scale(1)' : 'scale(0.99)')};
		/* Scaling button to 0.98 to its original size */
		box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
		/* Lowering the shadow */
	}

	&:active {
		transform: ${props => (props.disabled ? 'scale(1)' : 'scale(0.97)')};
		/* Scaling button to 0.98 to its original size */
		box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
		/* Lowering the shadow */
	}

	${props =>
		props.disabled
			? `
            opacity: 0.8;
            color: #88a1c1 !important;
`
			: ''}
`
