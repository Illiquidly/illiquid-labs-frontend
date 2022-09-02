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

export const ToggleBackground = styled.div<{ checked?: boolean }>`
	border: 1px solid transparent;
	width: 36px;
	height: 20px;
	border-radius: 15.5px;
	background: ${props =>
		props.checked ? props.theme.colors.primary100 : props.theme.colors.dark300};
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 2px;
	box-sizing: border-box;

	&:hover {
		border: 1px solid ${props => props.theme.colors.primary600};

		box-shadow: 0px 0px 0px 4px rgba(63, 138, 224, 0.3);
	}
`

export const Knob = styled.div<{ checked?: boolean }>`
	width: 16px;
	height: 16px;
	background: ${props =>
		props.checked ? '#FFFFFF' : props.theme.colors.dark500};
	border-radius: 12px;
	transition: 0.4s;
	box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
		0px 1px 2px rgba(16, 24, 40, 0.06);

	transform: ${props => props.checked && 'translateX(15px)'};
`
