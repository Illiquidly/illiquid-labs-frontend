import React from 'react'
import { ThemeUIStyleObject } from 'theme-ui'
import { Container } from './LayoutContainer.styled'

interface Props {
	children: React.ReactNode
	sx?: ThemeUIStyleObject
}

export const LayoutContainer = ({ children, sx }: Props) => {
	return <Container sx={sx}>{children}</Container>
}

LayoutContainer.defaultProps = {
	sx: {},
}

export default LayoutContainer
