import React from 'react'
import styled from '@emotion/styled'

const StyledTableBodyRow = styled.tr`
	border-bottom: 1px solid ${props => props.theme.colors.dark500};
	height: 80px;
	width: 100%;
`

export const TableBodyRow = ({ children }) => (
	<StyledTableBodyRow>{children}</StyledTableBodyRow>
)

export default TableBodyRow
