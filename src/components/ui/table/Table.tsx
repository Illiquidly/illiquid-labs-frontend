import React from 'react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from '../button'

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
	buttonProps?: ButtonProps
	children?: React.ReactNode
}
export const Table = ({ caption, buttonProps, children }: TableProps) => (
	<Container>
		<StyledTable>
			{caption && <caption>{caption}</caption>}
			{children}
		</StyledTable>
		<Button
			sx={{
				height: '40px',
				width: '100%',
				borderRadius: 0,
			}}
			variant='dark'
			size='small'
			{...buttonProps}
		>
			{buttonProps?.children}
		</Button>
	</Container>
)

export default Table
