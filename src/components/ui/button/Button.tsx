import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { withForwardRef } from 'hoc'
import { noop } from 'lodash'
import React from 'react'
import { Button as ThemeUIButton, NavLink, ThemeUIStyleObject } from 'theme-ui'

import { Link } from '../../link'

export interface ButtonProps {
	fullWidth?: boolean
	disabled?: boolean
	sx?: ThemeUIStyleObject
	href?: string
	forwardedRef?: React.LegacyRef<HTMLButtonElement | HTMLAnchorElement>

	// Style variants
	variant?:
		| 'primary'
		| 'secondary'
		| 'ghost'
		| 'destructive'
		| 'dark'
		| 'gradient'
		| 'select'

	// Size variants
	size?: 'small' | 'medium' | 'large' | 'extraLarge'

	// Icons
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode

	children: React.ReactNode
	onClick?: (e: any) => void
}

const StyledButton = styled(ThemeUIButton, {
	shouldForwardProp: prop => prop !== 'fullWidth',
})<ButtonProps>`
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
		forwardedRef,
		...attrs
	} = props

	if (href) {
		return (
			<Link href={href} passHref>
				<StyledNavLink
					href={href}
					ref={forwardedRef as React.Ref<HTMLAnchorElement>}
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
			ref={forwardedRef as React.Ref<HTMLButtonElement>}
			sx={{
				...theme.buttons.sizes[size],
				...props.sx,
			}}
		>
			{/* {loading ? <LoadingCircular size={16} /> : icon} */}
			<>
				{startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
				{children}
				{endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
			</>
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

	onClick: noop,
	sx: {},
}

export default withForwardRef<HTMLButtonElement, ButtonProps>(Button)
