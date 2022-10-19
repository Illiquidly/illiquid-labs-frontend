import styled from '@emotion/styled'
import TimePicker, {
	TimePickerProps,
} from 'components/ui/time-picker/TimePicker'
import { withForwardRef } from 'hoc'
import React from 'react'
import TimePickerRef from 'react-flatpickr'

export interface TimePickerFieldProps extends TimePickerProps {
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
	forwardedRef?: React.RefObject<TimePickerRef>
}

const TimePickerFieldContainer = styled.div`
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

const TimePickerField = ({
	fieldError,
	forwardedRef,
	...props
}: TimePickerFieldProps) => {
	const inputRef = React.useRef<TimePickerRef>(null)

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as TimePickerRef
	)

	return (
		<TimePickerFieldContainer>
			<TimePicker ref={inputRef} {...props} />
			<StyledError>{fieldError || null}</StyledError>
		</TimePickerFieldContainer>
	)
}

export default withForwardRef<TimePickerRef, TimePickerFieldProps>(
	TimePickerField
)
