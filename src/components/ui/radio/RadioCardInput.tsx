import styled from '@emotion/styled'
import React from 'react'
import withRadioInputGroup from './hoc/withRadioInputGroup'
import { RadioInput } from './Radio'

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

export const Background = styled.div<{ checked?: boolean; disabled?: boolean }>`
	margin: 1px;
	overflow: hidden;
	flex: 1;
	display: flex;
	padding: 13px 12px;
	align-items: center;
	justify-content: flex-start;
	gap: 8px;

	@media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
		gap: 12px;
	}

	background: ${props =>
		props.checked ? props.theme.colors.primary600 : props.theme.colors.dark100};

	border: 1px solid ${props => props.theme.colors.dark500};

	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	border-radius: 8px;

	${props =>
		!props.disabled &&
		`&:hover {
        margin: 0px;
    

        background: ${
									props.checked ? props.theme.colors.primary600 : '#011d2c'
								};

        border: 2px solid ${props.theme.colors.primary100};

        box-shadow: 0px 0px 0px 4px rgba(63, 138, 224, 0.3);
	}`}
`

export const RadioCardText = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
`

type RadioCardProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputGroup?: any
}

const RadioCardInput = React.forwardRef<HTMLInputElement, RadioCardProps>(
	(props, ref) => {
		const inputRef = React.useRef<HTMLInputElement>(null)
		const { children, inputGroup, ...rest } = props

		const { value: inputGroupValue = '' } = inputGroup

		const checked = props.value?.toString() === inputGroupValue?.toString()

		const handleClick = () => inputRef?.current?.click()

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		return (
			<Container disabled={props.disabled} onClick={handleClick}>
				<Background disabled={props.disabled} checked={checked}>
					<RadioInput {...rest} inputGroup={inputGroup} ref={inputRef} />

					{children}
				</Background>
			</Container>
		)
	}
)

RadioCardInput.defaultProps = {
	inputGroup: undefined,
}

export default withRadioInputGroup(RadioCardInput)
