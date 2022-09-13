import styled from '@emotion/styled'
import { Box } from 'theme-ui'

interface Props {
	name: string
	value: string
}

const StyledAttributeCard = styled(Box)`
	flex-direction: column;
	padding: 11px;
	background: ${props => props.theme.colors.dark400};
	border: 1px solid transparent;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 4px;
`

const AttributeName = styled.p`
	margin: 0;
	font-weight: 300;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: -0.02;
	margin-bottom: 3px;
	color: ${props => props.theme.colors.gray600};
	display: flex;
	align-items: top;
	text-transform: uppercase;
	text-align: left;
`

const AttributeValue = styled.p`
	margin: 0;
	font-weight: bold;
	font-size: 14px;
	line-height: 14px;
	color: ${props => props.theme.colors.gray1000};
	display: flex;
	align-items: top;
	text-align: left;
`

export const AttributeCard = ({ name, value }: Props) => {
	return (
		<StyledAttributeCard>
			<AttributeName>{name}</AttributeName>
			<AttributeValue>{value}</AttributeValue>
		</StyledAttributeCard>
	)
}

export default AttributeCard
