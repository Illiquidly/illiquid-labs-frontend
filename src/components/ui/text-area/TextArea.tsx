import React from 'react'
import styled from '@emotion/styled'
import { AlertCircleIcon } from 'assets/icons/16pt'

export interface TextAreaInputProps
	extends React.InputHTMLAttributes<HTMLTextAreaElement> {
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

const TextAreaStyled = styled.textarea`
	&::placeholder {
		color: ${props => props.theme.colors.gray600};
		opacity: 1;
	}
	background: ${props => props.theme.colors.dark400};
	border: 0;

	&:focus {
		outline: none;
	}

	color: ${props => props.theme.colors.natural50};
`

export const TextArea = React.forwardRef<
	HTMLTextAreaElement,
	TextAreaInputProps
>((props, ref) => {
	const { children, ...rest } = props
	const inputRef = React.useRef<HTMLTextAreaElement>(null)

	const handleClick = () => inputRef?.current?.click()

	React.useImperativeHandle(ref, () => inputRef.current as HTMLTextAreaElement)

	return (
		<Container
			disabled={props.disabled}
			error={props.error}
			onClick={handleClick}
		>
			<TextAreaStyled {...rest} ref={ref}>
				{children}
			</TextAreaStyled>
			{props.error && <AlertCircleIcon />}
		</Container>
	)
})

export default TextArea
