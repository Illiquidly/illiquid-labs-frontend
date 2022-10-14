import React from 'react'
import styled from '@emotion/styled'
import withRadioInputGroup from '../radio/hoc/withRadioInputGroup'

export const Container = styled.div<{ disabled?: boolean }>`
	${props => (props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;')}
	display: inline-flex;
	flex: 1;
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

const Background = styled.div<{ checked?: boolean; disabled?: boolean }>`
	overflow: hidden;
	flex: 1;
	display: flex;
	padding: 8px;
	align-items: center;
	justify-content: center;

	color: ${props =>
		props.checked ? props.theme.colors.natural50 : props.theme.colors.gray600};

	background: ${props => (props.checked ? '#013957' : 'transparent')};

	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	border-radius: 8px;
`

const TabText = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 24px;
`

type TabProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputGroup?: any
}

const Tab = React.forwardRef<HTMLInputElement, TabProps>((props, ref) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const {
		children,
		disabled: disabledByProps,
		inputGroup,
		value,
		...other
	} = props

	const { name, onChange, value: inputGroupValue = '' } = inputGroup

	const checked = props.value?.toString() === inputGroupValue.toString()

	// We can disable the whole radio group with <RadioInputGroup disabled> or just one input with <RadioInput disabled>
	const disabled = disabledByProps || inputGroup.disabled

	const handleClick = () => inputRef?.current?.click()

	React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

	return (
		<Container disabled={props.disabled} onClick={handleClick}>
			<Background disabled={props.disabled} checked={checked}>
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
				<TabText>{children}</TabText>
			</Background>
		</Container>
	)
})

Tab.defaultProps = {
	inputGroup: undefined,
}

export default withRadioInputGroup(Tab)
