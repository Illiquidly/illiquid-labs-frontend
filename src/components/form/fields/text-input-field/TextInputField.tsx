import { TextInput } from 'components'
import { FieldContainer, FieldError } from 'components/form/components'
import React from 'react'

export interface TextInputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}

const TextInputField = React.forwardRef<HTMLInputElement, TextInputFieldProps>(
	(props, ref) => {
		const inputRef = React.useRef<HTMLInputElement>(null)

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		return (
			<FieldContainer>
				<TextInput ref={ref} {...props} />
				<FieldError>{props.fieldError || null}</FieldError>
			</FieldContainer>
		)
	}
)

export default TextInputField
