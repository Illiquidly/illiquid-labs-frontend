import styled from '@emotion/styled'

const TableBodyRow = styled.tr`
	border-bottom: 1px solid ${props => props.theme.colors.dark500};
	height: 80px;
	width: 100%;

	&:hover {
		background: ${props => props.theme.colors.dark300};
		cursor: pointer;
	}

	&:last-child {
		border-bottom: none;
	}
`

export default TableBodyRow
