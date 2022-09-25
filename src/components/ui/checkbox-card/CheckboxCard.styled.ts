import styled from '@emotion/styled'
import { Card } from '../card'

export const ContainerCard = styled(Card)<{ variant?: 'small' | 'medium' }>`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	${props =>
		props.variant === 'small' &&
		`
		padding: 20px 17px;
		gap: 8px;
	`}

	${props =>
		props.variant === 'medium' &&
		`
		padding: 15.5px 18px;
		gap: 16px;
	`}
`

export const Title = styled.div<{ variant?: 'small' | 'medium' }>`
	flex: 1;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;

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
	text-align: end;
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
