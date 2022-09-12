import { useTheme } from '@emotion/react'
import { withForwardRef } from 'hoc'
import React from 'react'
import Checkbox from '../checkbox/Checkbox'
import { ContainerCard, Extra, Title } from './CheckboxCard.styled'

interface CheckboxCardProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'title'> {
	forwardedRef?: React.Ref<HTMLInputElement>
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
	const theme = useTheme()
	return (
		<ContainerCard style={style}>
			<Checkbox
				backgroundStyle={{
					...(!inputProps.checked
						? { border: `2px solid ${theme.colors.dark500}` }
						: {}),
				}}
				ref={forwardedRef}
				{...inputProps}
			/>
			{typeof title === 'string' ? (
				<Title variant={variant}>{title}</Title>
			) : (
				title
			)}
			{typeof extra === 'string' ? (
				<Extra variant={variant}>{extra}</Extra>
			) : (
				extra
			)}
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
