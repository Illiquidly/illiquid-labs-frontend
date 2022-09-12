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

export const Title = styled.div<{ variant?: 'small' | 'medium' }>`
	flex: 1;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;

	pointer-events: none;

	${props =>
		props.variant === 'small' &&
		`
		font-size: 14px;
		line-height: 24px;
	`}

	${props =>
		props.variant === 'medium' &&
		`
		font-size: 16px;
		line-height: 27px;
	`}
`

export const Extra = styled.div<{ variant?: 'small' | 'medium' }>`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	pointer-events: none;

	${props =>
		props.variant === 'small' &&
		`
		font-size: 14px;
		line-height: 24px;
	`}

	${props =>
		props.variant === 'medium' &&
		`
		font-size: 16px;
		line-height: 27px;
	`}

	color: ${props => props.theme.colors.secondary300};
`
