import React from 'react'
import styled from '@emotion/styled'

const TextAreaStyled = styled.textarea`
	border: ${props => `1px solid ${props.theme.colors.secondary400}`};
	padding-inline: 14px;
	padding-block: 10px;
	background: ${props => props.theme.colors.secondary700};
	color: ${props => props.theme.colors.secondary100};

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
		outline: none;
		border: 2px solid;
		border-image-source: linear-gradient(to left, #467ee3, #62cefd);
		border-image-slice: 1;
		background: ${props => props.theme.colors.secondary500};
		color: ${props => props.theme.colors.natural50};
	}
`

type TextAreaInputProps = React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = ({ children, ...props }: TextAreaInputProps) => {
	return <TextAreaStyled {...props}>{children}</TextAreaStyled>
}

export default TextArea
