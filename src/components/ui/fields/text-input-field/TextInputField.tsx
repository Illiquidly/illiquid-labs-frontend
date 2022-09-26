import styled from '@emotion/styled'
import { TextInput } from 'components'
import React from 'react'

export interface TextInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}

const TextInputFieldContainer = styled.div`
	position: relative;
	margin-bottom: 24px;
`

const StyledError = styled.p`
	position: absolute;
	top: 32px;
	left: 0;
	bottom: 0;
	font-size: 14px;
	color: ${props => props.theme.colors.error100};
`

export const TextInputField = React.forwardRef<
	HTMLInputElement,
	TextInputProps
>((props, ref) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

	return (
		<TextInputFieldContainer>
			<TextInput {...props} />
			<StyledError>{props.fieldError || null}</StyledError>
		</TextInputFieldContainer>
	)
})

export default TextInputField
