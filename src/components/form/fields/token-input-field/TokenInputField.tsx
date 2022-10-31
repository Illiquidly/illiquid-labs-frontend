import { TokenInput } from 'components'
import {
	FieldContainer,
	FieldError,
	FieldLabel,
} from 'components/form/components'
import { TokenInputProps } from 'components/ui/token-input/TokenInput'
import { withForwardRef } from 'hoc'
import React from 'react'

export interface TokenInputFieldProps extends TokenInputProps {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	label: string
}

const TokenInputField = ({ fieldError, label, forwardedRef, ...props }) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as HTMLInputElement
	)

	return (
		<FieldContainer>
			<FieldLabel>{label}</FieldLabel>
			<TokenInput ref={inputRef} {...props} />
			<FieldError>{fieldError || null}</FieldError>
		</FieldContainer>
	)
}

export default withForwardRef<HTMLInputElement, TokenInputFieldProps>(
	TokenInputField
)
