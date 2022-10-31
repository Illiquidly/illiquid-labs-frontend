import 'flatpickr/dist/flatpickr.min.css'
import React from 'react'
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr'

import styled from '@emotion/styled'
import { AlertCircleIcon } from 'assets/icons/16pt'
import { Flex } from 'theme-ui'
import { RecentOutline18pt } from 'assets/icons/mixed'

export interface TimePickerProps extends DateTimePickerProps {
	disabled?: boolean
	error?: boolean
	fieldError?: string
	iconLeft?: React.ReactNode
}

interface ContainerProps {
	error?: boolean
	disabled?: boolean
}

const Container = styled.div<ContainerProps>`
	min-height: 42px;
	display: inline-flex;
	align-items: center;
	position: relative;
	width: 100%;
	border: 1.5px solid
		${props =>
			props.error ? props.theme.colors.error100 : props.theme.colors.dark500};
	padding-inline: 14px;
	background: ${props => props.theme.colors.dark400};
	border-radius: 8px;

	${props =>
		props.disabled &&
		`
		cursor: not-allowed;
		border: 1.5px solid ${props.theme.colors.dark500}
	`}

	&:hover {
		margin: 0;
		outline: none;
		cursor: pointer;
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
	}
	&:focus,
	&:focus-within {
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
			0px 0px 0px 4px rgba(63, 138, 224, 0.18);
		outline: 0;
	}
	&:active {
		outline: none;
		margin: 0;
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: rgba(0, 0, 0, 0.8) 0 1px;
	}
`

const TextInputStyled = styled(Flatpickr)<TimePickerProps>`
	flex: 1;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	padding-block: 10px;

	&::placeholder {
		color: ${props => props.theme.colors.gray600};
		opacity: 1;
	}
	background: ${props => props.theme.colors.dark400};
	border: 0;

	&:disabled {
		cursor: not-allowed;
	}

	&:focus {
		outline: none;
	}

	color: ${props => props.theme.colors.natural50};
`

export const TimePicker = React.forwardRef<Flatpickr, TimePickerProps>(
	(props, ref) => {
		const { iconLeft, ...rest } = props
		const inputRef = React.useRef<Flatpickr>(null)

		const handleClick = () => inputRef?.current?.flatpickr?.open()

		React.useImperativeHandle(ref, () => inputRef.current as Flatpickr)

		return (
			<Container
				disabled={props.disabled}
				error={props.error}
				onClick={handleClick}
			>
				{iconLeft ? <Flex sx={{ paddingRight: '8px' }}>{iconLeft}</Flex> : null}
				<TextInputStyled
					{...rest}
					ref={inputRef}
					disabled={props.disabled}
					options={{
						enableTime: true,
						noCalendar: true,
						dateFormat: 'h:i K',
						disableMobile: true,
					}}
				/>
				{props.error ? (
					<AlertCircleIcon />
				) : (
					<RecentOutline18pt width='15px' height='15px' />
				)}
			</Container>
		)
	}
)

export default TimePicker
