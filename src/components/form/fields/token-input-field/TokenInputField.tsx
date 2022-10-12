import styled from '@emotion/styled'
import { TokenInput } from 'components'
import { TokenInputProps } from 'components/ui/token-input/TokenInput'
import { withForwardRef } from 'hoc'
import React from 'react'

export interface TokenInputFieldProps extends TokenInputProps {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}

const TokenInputFieldContainer = styled.div`
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

const TokenInputField = ({ fieldError, forwardedRef, ...props }) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as HTMLInputElement
	)

	return (
		<TokenInputFieldContainer>
			<TokenInput ref={inputRef} {...props} />
			<StyledError>{fieldError || null}</StyledError>
		</TokenInputFieldContainer>
	)
}

export default withForwardRef<HTMLInputElement, TokenInputFieldProps>(
	TokenInputField
)
