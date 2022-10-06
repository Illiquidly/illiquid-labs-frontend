import styled from '@emotion/styled'
import { Box } from 'theme-ui'

interface Props {
	name: string
	value: string
}

export const StyledAttributeCard = styled(Box)`
	flex-direction: column;
	padding: 11px;
	background: ${props => props.theme.colors.dark400};
	border: 1px solid transparent;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 4px;
`

export const StyledAttributeName = styled.p`
	margin: 0;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: -0.02;
	margin-bottom: 3px;
	color: ${props => props.theme.colors.gray700};
	display: flex;
	align-items: top;
	text-transform: uppercase;
	text-align: left;
`

export const StyledAttributeValue = styled.p`
	margin: 0;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	font-size: 12px;
	line-height: 16px;
	color: ${props => props.theme.colors.gray1000};
	display: flex;
	align-items: top;
	text-align: left;
`

export const AttributeCard = ({ name, value }: Props) => {
	return (
		<StyledAttributeCard>
			<StyledAttributeName>{name}</StyledAttributeName>
			<StyledAttributeValue>{value}</StyledAttributeValue>
		</StyledAttributeCard>
	)
}

export default AttributeCard
