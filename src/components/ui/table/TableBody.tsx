import React from 'react'
import styled from '@emotion/styled'

const StyledTableBody = styled.tbody`
	width: 100%;
`

export const TableBody = ({ children }) => (
	<StyledTableBody>{children}</StyledTableBody>
)

export default TableBody
