import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { noop } from 'lodash'
import Link from 'next/link'
import React from 'react'
import { Button as ThemeUIButton, NavLink, ThemeUIStyleObject } from 'theme-ui'

interface ButtonProps {
	fullWidth?: boolean
	disabled?: boolean
	sx?: ThemeUIStyleObject
	href?: string

	// Style variants
	variant?:
		| 'primary'
		| 'secondary'
		| 'ghost'
		| 'destructive'
		| 'dark'
		| 'gradient'

	// Size variants
	size?: 'small' | 'medium' | 'large' | 'extraLarge'

	// Icons
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode

	children: React.ReactNode
	onClick?: (e: any) => void
}

const StyledButton = styled(ThemeUIButton)<ButtonProps>`
	${props => (props.fullWidth ? 'flex: 1' : '')}
`

const StyledNavLink = styled(NavLink)<ButtonProps>`
	${props => (props.fullWidth ? 'flex: 1' : '')}
`

export const StartIconContainer = styled.span`
	margin-right: 11px;
`

export const EndIconContainer = styled.span`
	margin-left: 11px;
`

const Button = ({ children, ...props }: ButtonProps) => {
	const theme = useTheme()

	const {
		startIcon,
		endIcon,
		// loading,
		size = 'medium',
		href,
		...attrs
	} = props

	if (href) {
		return (
			<Link href={href} passHref>
				<StyledNavLink
					href={href}
					{...attrs}
					sx={{
						...theme.links.sizes[size],
						...props.sx,
					}}
				>
					<>
						{startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
						{children}
						{endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
					</>
				</StyledNavLink>
			</Link>
		)
	}

	return (
		<StyledButton
			{...attrs}
			sx={{
				...theme.buttons.sizes[size],
				...props.sx,
			}}
		>
			{/* {loading ? <LoadingCircular size={16} /> : icon} */}
			{startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
			{children}
			{endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
		</StyledButton>
	)
}

Button.defaultProps = {
	fullWidth: false,
	disabled: false,
	href: undefined,

	// Style variant
	variant: 'primary',

	// Size variants
	size: 'medium',

	// Icons
	startIcon: undefined,
	endIcon: undefined,
	onClick: noop,
	sx: {},
}

export default Button