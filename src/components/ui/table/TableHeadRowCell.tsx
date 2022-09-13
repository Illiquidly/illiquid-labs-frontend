import styled from '@emotion/styled'

const TableHeadRowCell = styled.td`
	text-align: left;
	padding: 16px 12px;
	vertical-align: middle;
	text-transform: uppercase;
	font-size: 12px;
	line-height: 20px;
	color: ${props => props.theme.colors.gray1000};
`

export default TableHeadRowCell
