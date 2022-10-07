import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { withForwardRef } from 'hoc'
import React from 'react'
import { Box, ThemeUIStyleObject } from 'theme-ui'

import { Link } from '..'

export interface LinkButtonProps {
	fullWidth?: boolean
	disabled?: boolean
	sx?: ThemeUIStyleObject
	href?: string
	forwardedRef?: React.LegacyRef<HTMLAnchorElement>

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

	children?: React.ReactNode
}

const StyledButton = styled(Box, {
	shouldForwardProp: prop => prop !== 'fullWidth',
})<LinkButtonProps>`
	${props => (props.fullWidth ? 'flex: 1' : '')}
`

export const StartIconContainer = styled.span`
	margin-right: 11px;
`

export const EndIconContainer = styled.span`
	margin-left: 11px;
`
const LinkButton = ({ children, ...props }: LinkButtonProps) => {
	const theme = useTheme()

	const {
		startIcon,
		endIcon,
		size = 'medium',
		href,
		forwardedRef,
		variant = 'primary',
		...attrs
	} = props

	return (
		<Link disabled={props.disabled} href={href} passHref>
			<StyledButton
				ref={forwardedRef as React.Ref<HTMLAnchorElement>}
				{...attrs}
				sx={{
					...theme.buttons.sizes[size],
					...theme.buttons[variant],
					...(theme.buttons[variant]
						? { '&[disabled]': theme.buttons[variant]['&:disabled'] }
						: {}),
					...props.sx,
				}}
			>
				<>
					{startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
					{children}
					{endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
				</>
			</StyledButton>
		</Link>
	)
}

LinkButton.defaultProps = {
	fullWidth: false,
	disabled: false,
	href: undefined,

	// Style variant
	variant: 'primary',

	// Size variants
	size: 'medium',

	sx: {},
}

export default withForwardRef<HTMLAnchorElement, LinkButtonProps>(LinkButton)
