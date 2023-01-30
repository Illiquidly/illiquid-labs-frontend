import React from 'react'
import { Flex } from 'theme-ui'
import { TokenInput } from 'components/ui'
import {
	FieldContainer,
	FieldError,
	FieldLabel,
} from 'components/form/components'
import { TokenInputProps } from 'components/ui/token-input/TokenInput'
import { withForwardRef } from 'hoc'

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
			<Flex sx={{ height: '42px' }}>
				<TokenInput ref={inputRef} {...props} />
			</Flex>
			<FieldError>{fieldError || null}</FieldError>
		</FieldContainer>
	)
}

export default withForwardRef<HTMLInputElement, TokenInputFieldProps>(
	TokenInputField
)
