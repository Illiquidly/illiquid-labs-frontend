import styled from '@emotion/styled'
import React from 'react'
import { Flex } from 'theme-ui'

const Container = styled(Flex)`
	background: ${props => props.theme.colors.dark500};
	background-color: ${props => props.theme.colors.dark500};
	border: 1px solid transparent;
	border-radius: 8px;
	flex: 1;
	overflow: hidden;
`

const StyledSelect = styled.select`
	background: ${props => props.theme.colors.dark500};
	font-size: 14px;
	font-family: 'Heebo';
	line-height: 20px;
	color: white;
	width: 100%;
	padding: 3px 10px;
	cursor: pointer;
`

const Option = styled.option``

export const Select = ({ sx = {}, selected, options, handleSelect }) => {
	return (
		<Container sx={sx}>
			<StyledSelect onChange={e => handleSelect(e.target.value)} value={selected}>
				{options.map(option => (
					<Option value={option.value}>{option.element}</Option>
				))}
			</StyledSelect>
		</Container>
	)
}

export default Select
