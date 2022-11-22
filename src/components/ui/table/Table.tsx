import React from 'react'
import styled from '@emotion/styled'

const StyledTable = styled.table`
	caption-side: top;
	background: ${props => props.theme.colors.dark400};
	color: ${props => props.theme.colors.gray1000};
	caption {
		font-weight: bold;
	}
	width: 100%;
	flex: 1;
	border-collapse: collapse;
`

const Container = styled.div`
	width: 100%;
	overflow: hidden;
	overflow-x: scroll;
	position: relative;
	border-radius: 8px;
	border: 1px solid ${props => props.theme.colors.dark500};
`

export interface TableProps {
	caption?: string
	children?: React.ReactNode
	style?: React.CSSProperties
}
export const Table = ({ style, caption, children }: TableProps) => (
	<Container style={style}>
		<StyledTable>
			{caption && <caption>{caption}</caption>}
			{children}
		</StyledTable>
	</Container>
)

export default Table
