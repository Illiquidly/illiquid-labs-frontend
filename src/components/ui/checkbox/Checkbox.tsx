import React from 'react'
import { CheckboxCheckedIcon, CheckboxDisabledIcon } from 'assets/icons/mixed'
import { Background, Container, Input } from './Checkbox.styled'

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	(props, ref) => {
		const { checked, disabled } = props
		const inputRef = React.useRef<HTMLInputElement>(null)

		const handleClick = () => inputRef?.current?.click()

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		const renderIcon = React.useCallback(() => {
			if (disabled) {
				return <CheckboxDisabledIcon />
			}
			if (checked) {
				return <CheckboxCheckedIcon />
			}

			return null
		}, [checked, disabled])

		return (
			<Container disabled={disabled} onClick={handleClick}>
				<Input {...props} type='checkbox' ref={inputRef} />
				<Background checked={checked}>{renderIcon()}</Background>
			</Container>
		)
	}
)

export default Checkbox
