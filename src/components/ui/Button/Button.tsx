import React, { ForwardedRef } from 'react'
import styled from '@emotion/styled'
import { Button as ThemeUIButton, ThemeUIStyleObject } from 'theme-ui'
import { noop } from 'lodash'

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
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;

	${props =>
		(props.size === 'medium' || !props.size) &&
		`
		height: 44px;
		padding: 10px 18px;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
	`}

	${props =>
		props.size === 'small' &&
		`
		height: 36px;
		padding: 8px 16px;
		font-weight: 600;
		font-size: 14px;
		line-height: 20px;
	`}

	${props =>
		props.size === 'large' &&
		`
		height: 44px;
		padding: 7px 20px;
		font-weight: 500;
		font-size: 18px;
		line-height: 30px;
	`}

	${props =>
		props.size === 'extraLarge' &&
		`
		height: 56px;
		padding: 13px 24px;
		font-weight: 600;
		font-size: 18px;
		line-height: 30px;
	`}

	${props => props.fullWidth && 'flex: 1;'}

	${props =>
		(props.variant === 'primary' || !props.variant) &&
		`
			color: ${props.theme.colors.primary500};
			background: ${props.theme.colors.primary100};
			box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15);
		`}

	${props =>
		props.variant === 'secondary' &&
		`
			color: ${props.theme.colors.dark100};
			background: ${props.theme.colors.gray1000};
			box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15);
			border: 1px solid rgba(26, 26, 26, 0.1);
	`}

	${props =>
		props.variant === 'ghost' &&
		`
			color: ${props.theme.colors.primary200};
			background: ${props.theme.colors.dark400};
			border: 2px solid ${props.theme.colors.primary200};
	`}

	${props =>
		props.variant === 'destructive' &&
		`
			color: ${props.theme.colors.gray1000};
			background: ${props.theme.colors.error100};
			border: 1px solid rgba(255, 255, 255, 0.2);
			box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15);
	`}

	${props =>
		props.variant === 'dark' &&
		`
			color: ${props.theme.colors.gray1000};
			background: ${props.theme.colors.dark500};
			box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15);
	`}

	${props =>
		props.variant === 'gradient' &&
		`
			color: ${props.theme.colors.gray1000};
			background: ${props.theme.colors.primary90};
			box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15);
	`}

	&:hover {
		cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};

		${props =>
			props.variant === 'primary' &&
			`
			color: ${props.theme.colors.primary500};
			background: ${props.theme.colors.primary200};
			box-shadow: inset 0px -1px 0px 1px rgba(15, 58, 81, 0.3);
		`}

		${props =>
			props.variant === 'secondary' &&
			`
			color: ${props.theme.colors.dark100};
			background: ${props.theme.colors.gray900};
			box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15);
		`}
	}

	&:active {
		${props =>
			props.variant === 'primary' &&
			`
			color: ${props.theme.colors.primary500};
			background: ${props.theme.colors.primary100};
			box-shadow: inset 0px -1px 0px 1px rgba(15, 58, 81, 0.3);
		`}

		${props =>
			props.variant === 'secondary' &&
			`
			color: ${props.theme.colors.dark500};
			background: ${props.theme.colors.gray1000};
			border: 1px solid ${props.theme.colors.primary100};
			box-shadow: 0px 0px 0px 4px rgba(63, 138, 224, 0.2);
		`}
	}

	&:disabled {
		${props =>
			props.variant === 'primary' &&
			`
			color: ${props.theme.colors.dark500};
			background: ${props.theme.colors.dark400};
			box-shadow: inset 0px -1px 0px 1px rgba(15, 58, 81, 0.3);
		`}

		${props =>
			props.variant === 'secondary' &&
			`
			color: ${props.theme.colors.gray600};
			background: ${props.theme.colors.gray1000};
			border: 1px solid ${props.theme.colors.gray1000};
			box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15);
		`}
	}
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
		const {
			startIcon,
			endIcon,
			// loading,
			...attrs
		} = props

		return (
			<StyledButton {...attrs} ref={ref}>
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
