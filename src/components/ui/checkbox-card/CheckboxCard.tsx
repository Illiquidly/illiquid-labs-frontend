import { useTheme } from '@emotion/react'
import { withForwardRef } from 'hoc'
import React from 'react'
import Checkbox from '../checkbox/Checkbox'
import { ContainerCard, Extra, Title } from './CheckboxCard.styled'

interface CheckboxCardProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	forwardedRef?: React.Ref<HTMLInputElement>
	title?: string
	extra?: string
}

function CheckboxCard({
	title,
	extra,
	forwardedRef,
	...inputProps
}: CheckboxCardProps) {
	const theme = useTheme()
	return (
		<ContainerCard>
			<Checkbox
				backgroundStyle={{
					...(!inputProps.checked
						? { border: `2px solid ${theme.colors.dark500}` }
						: {}),
				}}
				ref={forwardedRef}
				{...inputProps}
			/>
			<Title>{title}</Title>
			<Extra>{extra}</Extra>
		</ContainerCard>
	)
}

CheckboxCard.defaultProps = {
	forwardedRef: undefined,
	title: '',
	extra: '',
}

export default withForwardRef<HTMLInputElement, CheckboxCardProps>(CheckboxCard)
