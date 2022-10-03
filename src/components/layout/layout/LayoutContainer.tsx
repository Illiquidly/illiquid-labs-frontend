import React from 'react'
import { Container } from './LayoutContainer.styled'

interface Props {
	children: React.ReactNode
}

export const LayoutContainer = (props: Props) => {
	const { children } = props
	return <Container {...props}>{children}</Container>
}

export default LayoutContainer
