import React from 'react'

import { Container, Input, Knob, ToggleBackground } from './Switch.styled'

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
	const { checked, disabled } = props
	const inputRef = React.useRef<HTMLInputElement>(null)

	const handleClick = () => inputRef?.current?.click()

	React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

	return (
		<Container disabled={disabled} onClick={handleClick}>
			<Input {...props} type='checkbox' ref={inputRef} />
			<ToggleBackground checked={checked}>
				<Knob checked={checked} />
			</ToggleBackground>
		</Container>
	)
})

export default Switch
