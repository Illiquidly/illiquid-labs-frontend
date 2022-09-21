import React from 'react'
import { CheckboxCheckedIcon, CheckboxDisabledIcon } from 'assets/icons/mixed'
import { Box, Flex } from 'theme-ui'
import { withForwardRef } from 'hoc'
import { Background, Container, Input } from './Checkbox.styled'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	backgroundStyle?: React.CSSProperties
	label?: React.ReactNode
	forwardedRef?: React.RefObject<HTMLInputElement>
}

const Checkbox = (props: CheckboxProps) => {
	const { checked, disabled, backgroundStyle = {}, forwardedRef, label } = props
	const inputRef = React.useRef<HTMLInputElement>(null)

	const handleClick = () => inputRef?.current?.click()

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as HTMLInputElement
	)

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
		<Flex>
			<Container disabled={disabled} onClick={handleClick}>
				<Input {...props} type='checkbox' ref={inputRef} />
				<Background style={backgroundStyle} checked={checked}>
					{renderIcon()}
				</Background>
			</Container>
			<Box onClick={() => inputRef?.current?.click()}>{label}</Box>
		</Flex>
	)
}

Checkbox.defaultProps = {
	backgroundStyle: undefined,
	label: undefined,
	forwardedRef: undefined,
}

export default withForwardRef<HTMLInputElement, CheckboxProps>(Checkbox)
