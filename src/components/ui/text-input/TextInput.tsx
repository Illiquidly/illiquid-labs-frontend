import React from 'react'
import styled from '@emotion/styled'
import { AlertCircleIcon } from 'assets/icons/16pt'

export interface TextInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
}

interface ContainerProps {
	error?: boolean
	disabled?: boolean
}

const Container = styled.div<ContainerProps>`
	display: inline-flex;
	width: 100%;
	border: 1.5px solid
		${props =>
			props.error ? props.theme.colors.error100 : props.theme.colors.dark500};
	padding-inline: 14px;
	padding-block: 10px;
	background: ${props => props.theme.colors.dark400};
	border-radius: 8px;

	${props =>
		props.disabled &&
		`
		cursor: not-allowed;
		border: 1.5px solid ${props.theme.colors.dark500}
	`}

	&:hover {
		margin: 0;
		outline: none;
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
	}
	&:focus,
	&:focus-within {
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
			0px 0px 0px 4px rgba(63, 138, 224, 0.18);
		outline: 0;
	}
	&:active {
		outline: none;
		margin: 0;
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: rgba(0, 0, 0, 0.8) 0 1px;
	}
`

const TextInputStyled = styled.input<TextInputProps>`
	flex: 1;
	&::placeholder {
		color: ${props => props.theme.colors.gray600};
		opacity: 1;
	}
	background: ${props => props.theme.colors.dark400};
	border: 0;

	&:disabled {
		cursor: not-allowed;
	}

	&:focus {
		outline: none;
	}

	color: ${props => props.theme.colors.natural50};
`

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
	(props, ref) => {
		const { children, ...rest } = props
		const inputRef = React.useRef<HTMLInputElement>(null)

		const handleClick = () => inputRef?.current?.click()

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)
		return (
			<Container
				disabled={props.disabled}
				error={props.error}
				onClick={handleClick}
			>
				<TextInputStyled {...rest} ref={inputRef}>
					{children}
				</TextInputStyled>
				{props.error && <AlertCircleIcon />}
			</Container>
		)
	}
)

export default TextInput
