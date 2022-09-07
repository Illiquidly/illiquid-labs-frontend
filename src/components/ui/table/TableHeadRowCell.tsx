import React from 'react'
import styled from '@emotion/styled'

const StyledTableHeadRowCell = styled.td`
	text-align: center;
	vertical-align: middle;
	text-transform: uppercase;
	font-size: 12px;
	line-height: 20px;
	color: ${props => props.theme.colors.gray1000};
`

export const TableHeadRowCell = ({ children }) => (
	<StyledTableHeadRowCell>{children}</StyledTableHeadRowCell>
)

export default TableHeadRowCell
