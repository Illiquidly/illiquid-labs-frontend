import styled from '@emotion/styled'
import { DatePicker, DatePickerProps } from 'components/ui'

import { withForwardRef } from 'hoc'
import React from 'react'
import DatePickerRef from 'react-flatpickr'

export interface DatePickerFieldProps extends DatePickerProps {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
}

const DatePickerFieldContainer = styled.div`
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

const DatePickerField = ({ fieldError, forwardedRef, ...props }) => {
	const inputRef = React.useRef<DatePickerRef>(null)

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as DatePickerRef
	)

	return (
		<DatePickerFieldContainer>
			<DatePicker ref={inputRef} {...props} />
			<StyledError>{fieldError || null}</StyledError>
		</DatePickerFieldContainer>
	)
}

export default withForwardRef<DatePickerRef, DatePickerFieldProps>(
	DatePickerField
)
