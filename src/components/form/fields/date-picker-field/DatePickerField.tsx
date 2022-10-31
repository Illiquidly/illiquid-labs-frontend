import {
	FieldContainer,
	FieldError,
	FieldLabel,
} from 'components/form/components'
import { DatePicker, DatePickerProps } from 'components/ui'

import { withForwardRef } from 'hoc'
import React from 'react'
import DatePickerRef from 'react-flatpickr'
import { Flex } from 'theme-ui'

export interface DatePickerFieldProps extends DatePickerProps {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	label: string
}

const DatePickerField = ({ fieldError, forwardedRef, label, ...props }) => {
	const inputRef = React.useRef<DatePickerRef>(null)

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as DatePickerRef
	)

	return (
		<FieldContainer>
			<FieldLabel htmlFor={props.name}>{label}</FieldLabel>
			<Flex sx={{ height: '42px' }}>
				<DatePicker ref={inputRef} {...props} />
			</Flex>
			<FieldError>{fieldError || null}</FieldError>
		</FieldContainer>
	)
}

export default withForwardRef<DatePickerRef, DatePickerFieldProps>(
	DatePickerField
)
