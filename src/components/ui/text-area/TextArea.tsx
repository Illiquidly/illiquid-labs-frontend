import React from 'react'
import styled from '@emotion/styled'

const TextAreaStyled = styled.textarea`
	border: ${props => `1px solid ${props.theme.colors.secondary400}`};
	padding-inline: 14px;
	padding-block: 10px;
	background: ${props => props.theme.colors.secondary700};
	color: ${props => props.theme.colors.secondary100};
	border-radius: 8px;
	margin: 1px;

	&:disabled {
		background: ${props => props.theme.colors.primary100};
		cursor: not-allowed;
	}

	&:hover {
		outline: none;
		background: ${props => props.theme.colors.secondary600};
	}
	&:focus,
	active {
		margin: 0;
		outline: none;
		background: linear-gradient(${props => props.theme.colors.secondary500} 0 0)
				padding-box,
			linear-gradient(to left, #467ee3, #62cefd) border-box;
		border: 2px solid transparent;
		color: ${props => props.theme.colors.natural50};
		color: ${props => props.theme.colors.natural50};
	}
`

type TextAreaInputProps = React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = React.forwardRef<
	HTMLTextAreaElement,
	TextAreaInputProps
>((props, ref) => {
	return (
		<TextAreaStyled {...props} ref={ref}>
			{props.children}
		</TextAreaStyled>
	)
})

export default TextArea
