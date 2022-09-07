import React from 'react'
import styled from '@emotion/styled'

const StyledTableHead = styled.thead`
	width: 100%;
`

export const TableHead = ({ children }) => (
	<StyledTableHead>{children}</StyledTableHead>
)

export default TableHead
