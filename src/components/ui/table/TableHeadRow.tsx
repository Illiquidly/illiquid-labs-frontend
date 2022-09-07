import React from 'react'
import styled from '@emotion/styled'

const StyledTableHeadRow = styled.tr`
	border-bottom: 1px solid ${props => props.theme.colors.dark500};
	height: 44px;
	width: 100%;
`

export const TableHeadRow = ({ children }) => (
	<StyledTableHeadRow>{children}</StyledTableHeadRow>
)

export default TableHeadRow
