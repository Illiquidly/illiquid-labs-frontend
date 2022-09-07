import React from 'react'
import styled from '@emotion/styled'

const StyledTableBodyRowCell = styled.td`
	text-align: left;
	vertical-align: top;
	font-size: 14px;
	line-height: 20px;
	color: ${props => props.theme.colors.gray1000};
`

export const TableBodyRowCell = ({ children }) => (
	<StyledTableBodyRowCell>{children}</StyledTableBodyRowCell>
)

export default TableBodyRowCell
