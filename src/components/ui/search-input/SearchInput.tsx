import styled from '@emotion/styled'
import { InputSearchIcon } from 'assets/icons/mixed'
import React from 'react'
import { Flex } from 'theme-ui'
import { TextInput, TextInputProps } from '../text-input'

export type SearchInputProps = TextInputProps

export const IconContainer = styled(Flex)`
	min-width: 20px;
	min-height: 20px;

	&:hover {
		opacity: 0.8;
	}
`

export const SearchIconContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		cursor: pointer;
	}
`

export default function SearchInput(props: SearchInputProps) {
	const inputRef = React.useRef<HTMLInputElement>(null)

	return (
		<TextInput
			ref={inputRef}
			{...props}
			iconLeft={
				<IconContainer onClick={() => inputRef.current?.focus()}>
					<SearchIconContainer>
						<InputSearchIcon />
					</SearchIconContainer>
				</IconContainer>
			}
		/>
	)
}
