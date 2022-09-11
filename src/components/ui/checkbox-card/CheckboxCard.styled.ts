import styled from '@emotion/styled'
import { Card } from '../card'

export const ContainerCard = styled(Card)`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 20px 17px;
	gap: 8px;
`

export const Title = styled.div`
	flex: 1;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 24px;
	pointer-events: none;
`

export const Extra = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;
	pointer-events: none;

	color: ${props => props.theme.colors.secondary300};
`
