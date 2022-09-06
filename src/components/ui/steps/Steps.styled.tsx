import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

interface CircleProps {
	isHighlighted?: boolean
}

export const StepsContainer = styled(Flex)`
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	border-radius: 8px;

	border: ${props => props.theme.colors.dark500} solid 1px;
`

export const Circle = styled.div<CircleProps>`
	align-items: center;
	justify-content: center;

	background-color: ${props =>
		props.isHighlighted
			? props.theme.colors.primary100
			: props.theme.colors.dark100};
	border-radius: 100%;
	padding: 4px;

	width: 32px;
	height: 32px;
`

export const Card = styled(Flex)`
	display: flex;
	align-items: center;
	background: ${props => props.theme.colors.secondary500};
	padding: 16px 12px;

	margin-bottom: 2px;
	&:last-child {
		margin-bottom: 0px;
	}
`
