import styled from '@emotion/styled'
import {
	StyledAttributeCard,
	StyledAttributeName,
	StyledAttributeValue,
} from 'components/ui'
import { Flex } from 'theme-ui'

export const AttributeCard = styled(StyledAttributeCard)`
	align-items: flex-start;
`

export const AttributeName = styled(StyledAttributeName)``

export const AttributeValue = styled(StyledAttributeValue)`
	align-items: center;
`

export const SelectNFTsSection = styled(Flex)`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 16px;

	background: ${props => props.theme.colors.dark400};

	border: 1px solid ${props => props.theme.colors.dark500};

	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	border-radius: 8px;
`

export const Title = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 32px;

	text-align: center;

	color: ${props => props.theme.colors.gray1000};
`

export const Subtitle = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	text-align: center;

	color: ${props => props.theme.colors.gray700};
`
