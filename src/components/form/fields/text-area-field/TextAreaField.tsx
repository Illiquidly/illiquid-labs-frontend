import {
	FieldContainer,
	FieldError,
	FieldLabel,
} from 'components/form/components'
import { TextArea } from 'components/ui'
import { TextAreaInputProps } from 'components/ui/text-area/TextArea'

import { withForwardRef } from 'hoc'
import React from 'react'

export interface TextAreaFieldProps extends TextAreaInputProps {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	label: string
	forwardedRef?: React.RefObject<HTMLTextAreaElement>
}

const TextAreaField = ({ fieldError, forwardedRef, label, ...props }) => {
	const inputRef = React.useRef<HTMLTextAreaElement>(null)

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as HTMLTextAreaElement
	)

	return (
		<FieldContainer>
			<FieldLabel htmlFor={props.name}>{label}</FieldLabel>
			<TextArea ref={inputRef} {...props} />
			<FieldError>{fieldError || null}</FieldError>
		</FieldContainer>
	)
}

export default withForwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
	TextAreaField
)
