import styled from '@emotion/styled'

export const Container = styled.div<{ disabled?: boolean }>`
	${props => (props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;')}
	display: inline-flex;
`

export const Input = styled.input`
	height: 0;
	margin: 0;
	opacity: 0;
	padding: 0;
	position: absolute;
	width: 0;
	z-index: -9999;
`

export const Background = styled.div<{ checked?: boolean }>`
	overflow: hidden;
	border: 2px solid
		${props =>
			props.checked ? props.theme.colors.primary200 : props.theme.colors.dark500};
	width: 20px;
	height: 20px;
	border-radius: 6px;
	background: ${props =>
		props.checked ? props.theme.colors.primary100 : props.theme.colors.dark300};
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	&:disabled {
		background: ${props => props.theme.colors.primary100};
	}

	&:hover {
		border: 2px solid ${props => props.theme.colors.primary200};

		box-shadow: 0px 0px 0px 4px rgba(63, 138, 224, 0.3);
	}
`
