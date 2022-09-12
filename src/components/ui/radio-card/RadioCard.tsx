import { forwardRef, InputHTMLAttributes, ReactElement } from 'react'
import {
	CardItem,
	CardItemInput,
	CardItemSubtitle,
	CardItemTitle,
} from './RadioCard.styled'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	value: string
	title: string
	subtitle?: string
	Image: ReactElement
}

export const RadioCard = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { value, subtitle, title, Image } = props
	return (
		<CardItem>
			<CardItemInput ref={ref} type='radio' {...props} value={value} />
			{Image}
			<CardItemTitle>{title}</CardItemTitle>
			{subtitle && <CardItemSubtitle>{subtitle}</CardItemSubtitle>}
		</CardItem>
	)
})

RadioCard.defaultProps = {
	subtitle: '',
}
