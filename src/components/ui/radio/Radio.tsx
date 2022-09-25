import styled from '@emotion/styled'
import React from 'react'
import withRadioInputGroup from './hoc/withRadioInputGroup'

export const Container = styled.div<{ disabled?: boolean }>`
	${props => (props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;')}
	display: inline-flex;
`

export const Input = styled.input`
	height: 0;
	margin: 0;
	opacity: 0;
	padding: 0;
	position: absolute;
	width: 0;
	z-index: -9999;
`

export const Background = styled.div<{ checked?: boolean; disabled?: boolean }>`
	overflow: hidden;
	border: 2px solid
		${props =>
			props.checked ? props.theme.colors.primary200 : props.theme.colors.dark500};
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background: ${props => props.theme.colors.dark300};
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	&:hover {
		border: ${props =>
			!props.disabled &&
			`2px solid ${props.theme.colors.primary200};
            `}

		box-shadow: ${props =>
			!props.disabled && '0px 0px 0px 4px rgba(63, 138, 224, 0.3);'}
    }

    ${props => props.disabled && `background: ${props.theme.colors.dark200};`}
    ${props => props.disabled && `border: 2px solid transparent;`}
    ${props => props.disabled && `box-shadow: none;`}
`

export const Knob = styled.div`
	width: 8px;
	height: 8px;

	border-radius: 100%;

	background: ${props => props.theme.colors.primary100};
`

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputGroup?: any
}

export const RadioInput = React.forwardRef<HTMLInputElement, RadioProps>(
	(props, ref) => {
		const { disabled: disabledByProps, inputGroup, value, ...other } = props

		const { name, onChange, value: inputGroupValue = '' } = inputGroup

		const checked = value?.toString() === inputGroupValue?.toString()

		// We can disable the whole radio group with <RadioInputGroup disabled> or just one input with <RadioInput disabled>
		const disabled = disabledByProps || inputGroup.disabled

		const inputRef = React.useRef<HTMLInputElement>(null)

		const handleClick = () => inputRef?.current?.click()

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		return (
			<Container disabled={disabled} onClick={handleClick}>
				<Input
					{...other}
					type='radio'
					ref={inputRef}
					checked={checked}
					disabled={disabled}
					name={name}
					onChange={onChange}
					value={value}
				/>
				<Background disabled={disabled} checked={checked}>
					{checked && <Knob />}
				</Background>
			</Container>
		)
	}
)

RadioInput.defaultProps = {
	inputGroup: undefined,
}

export default withRadioInputGroup(RadioInput)
