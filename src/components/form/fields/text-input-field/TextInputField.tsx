import { TextInput } from 'components'
import {
	FieldContainer,
	FieldError,
	FieldLabel,
} from 'components/form/components'
import React from 'react'
import { Flex } from 'theme-ui'

export interface TextInputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	label: string
}

const TextInputField = React.forwardRef<HTMLInputElement, TextInputFieldProps>(
	({ label, ...props }, ref) => {
		const inputRef = React.useRef<HTMLInputElement>(null)

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		return (
			<FieldContainer>
				<FieldLabel htmlFor={props.name}>{label}</FieldLabel>
				<Flex sx={{ height: '42px' }}>
					<TextInput ref={ref} {...props} />
				</Flex>
				<FieldError>{props.fieldError || null}</FieldError>
			</FieldContainer>
		)
	}
)

export default TextInputField
