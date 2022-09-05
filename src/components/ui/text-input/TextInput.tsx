import React from 'react'
import styled from '@emotion/styled'

export interface TextInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
}

const TextInputStyled = styled.input<TextInputProps>`
	border: ${props => (props.error ? 1.5 : 1)}px solid
		${props =>
			props.error ? props.theme.colors.error100 : props.theme.colors.dark500};
	padding-inline: 14px;
	padding-block: 10px;
	background: ${props => props.theme.colors.dark400};
	color: ${props => props.theme.colors.natural50};
	border-radius: 8px;
	margin: ${props => (props.error ? 0 : '0.5px')};
	filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
	&::placeholder {
		color: ${props => props.theme.colors.gray600};
		opacity: 1;
	}

	&:disabled {
		cursor: not-allowed;
		background: ${props => props.theme.colors.primary100};
	}
	&:hover {
		margin: 0;
		outline: none;
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
	}
	&:focus,
	active {
		outline: none;
		margin: 0;
		filter: drop-shadow(0px 0px 2px rgba(63, 138, 224, 0.18));
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: rgba(0, 0, 0, 0.8) 0 1px;
	}
`

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
	(props, ref) => {
		const { children } = props
		return (
			<TextInputStyled {...props} ref={ref}>
				{children}
			</TextInputStyled>
		)
	}
)

export default TextInput
