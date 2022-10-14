import styled from '@emotion/styled'
import { LunaIcon } from 'assets/icons/mixed'
import { withForwardRef } from 'hoc'
import React from 'react'
import { Flex } from 'theme-ui'
import { TextInput, TextInputProps } from '../text-input'

export interface TokenInputProps extends TextInputProps {
	forwardedRef?: React.Ref<HTMLInputElement>
	tokenName?: string
}

export const IconContainer = styled(Flex)`
	min-width: 20px;
	min-height: 20px;

	&:hover {
		opacity: 0.8;
	}
`

export const TokenChipContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 68px;
	margin-top: -5px;
	margin-right: -10px;
	margin-bottom: -5px;
	border-radius: 6px;
	padding: 4px;
	padding-right: 8px;

	background: ${props => props.theme.colors.dark500};
`

const TokenText = styled.div`
	font-family: 'Heebo';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
`

function TokenInput(props: TokenInputProps) {
	const { forwardedRef, tokenName, ...inputProps } = props

	return (
		<TextInput
			{...inputProps}
			ref={forwardedRef}
			iconRight={
				<IconContainer>
					<TokenChipContainer>
						<LunaIcon />
						<TokenText>{tokenName}</TokenText>
					</TokenChipContainer>
				</IconContainer>
			}
		/>
	)
}

export default withForwardRef<HTMLInputElement, TokenInputProps>(TokenInput)
