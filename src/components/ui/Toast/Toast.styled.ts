import { ToastContainer as ToastifyContainer } from 'react-toastify'
import styled from '@emotion/styled'

export const ToastContainer = styled(ToastifyContainer)`
	.Toastify__toast {
		font-family: 'Pixelade';
		cursor: inherit;
		background: rgba(255, 255, 255, 0);
		color: #89a8cf;
		box-shadow: none;
		padding: 12px 24px;
		margin-bottom: 0.75em;
		min-height: 10px;

		border: 1px solid transparent;
		border-radius: 10px;
		background: linear-gradient(0deg, #18283d 0%, #18283d 100%),
			linear-gradient(90deg, #01c46c 0%, #3697f0 100%);
		background-clip: padding-box, border-box;
		background-origin: padding-box, border-box;
	}
	.Toastify__toast-body {
		padding: 0;
		margin: 0;
	}
	.Toastify__close-button {
		color: #fff;
	}
`
