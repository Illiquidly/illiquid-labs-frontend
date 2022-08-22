import React, { ForwardedRef } from 'react'
import styled from '@emotion/styled'
import { Button as ThemeUIButton, ThemeUIStyleObject } from 'theme-ui'
import { noop } from 'lodash'
import { useTheme } from '@emotion/react'

interface ButtonProps {
	fullWidth?: boolean
	disabled?: boolean
	sx?: ThemeUIStyleObject

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
	${props => props.fullWidth && 'flex: 1;'}
`

export const StartIconContainer = styled.span`
	margin-right: 11px;
`

export const EndIconContainer = styled.span`
	margin-left: 11px;
`

const Button = React.forwardRef(
	(
		{ children, ...props }: ButtonProps,
		ref?: ForwardedRef<HTMLButtonElement>
	) => {
		const theme = useTheme()

		const {
			startIcon,
			endIcon,
			// loading,
			size = 'medium',
			...attrs
		} = props

		return (
			<StyledButton
				{...attrs}
				sx={{
					...theme.buttons.sizes[size],
					...props.sx,
				}}
				ref={ref}
			>
				{/* {loading ? <LoadingCircular size={16} /> : icon} */}
				{startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
				{children}
				{endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
			</StyledButton>
		)
	}
)

Button.defaultProps = {
	fullWidth: false,
	disabled: false,

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
