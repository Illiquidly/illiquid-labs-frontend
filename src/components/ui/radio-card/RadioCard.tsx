import { forwardRef } from 'react'
import { CardItem, CardItemInput, CardItemText } from './RadioCard.styled'

interface Props {
	value: string
	title: string
	subtitle?: string
	Image: any
}

export const RadioCard = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { value, subtitle, title, Image } = props
	return (
		<CardItem>
			<CardItemInput ref={ref} type='radio' {...props} value={value} />
			{Image}
			<CardItemText>{title}</CardItemText>
			{subtitle && <CardItemText>{subtitle}</CardItemText>}
		</CardItem>
	)
})

RadioCard.defaultProps = {
	subtitle: '',
}
