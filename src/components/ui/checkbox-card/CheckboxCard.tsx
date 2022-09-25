import { withForwardRef } from 'hoc'
import React from 'react'
import { Flex } from 'theme-ui'
import Checkbox from '../checkbox/Checkbox'
import { ContainerCard, Extra, Title } from './CheckboxCard.styled'

interface CheckboxCardProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'title'> {
	forwardedRef?: React.RefObject<HTMLInputElement>
	title?: string | React.ReactNode
	extra?: string | React.ReactNode
	variant?: 'small' | 'medium'
}

function CheckboxCard({
	title,
	extra,
	style,
	forwardedRef,
	variant,
	...inputProps
}: CheckboxCardProps) {
	const inputRef = React.useRef<HTMLInputElement>(null)

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as HTMLInputElement
	)
	return (
		<ContainerCard variant={variant} style={style}>
			<Checkbox ref={inputRef} {...inputProps} />
			<Flex
				style={{ cursor: 'pointer' }}
				onClick={() => inputRef?.current?.click()}
			>
				{typeof title === 'string' ? (
					<Title variant={variant}>{title}</Title>
				) : (
					title
				)}
			</Flex>
			<Flex sx={{ flex: 1, justifyContent: 'flex-end' }}>
				{typeof extra === 'string' ? (
					<Extra variant={variant}>{extra}</Extra>
				) : (
					extra
				)}
			</Flex>
		</ContainerCard>
	)
}

CheckboxCard.defaultProps = {
	forwardedRef: undefined,
	title: '',
	extra: '',
	variant: 'small',
}

export default withForwardRef<HTMLInputElement, CheckboxCardProps>(CheckboxCard)
