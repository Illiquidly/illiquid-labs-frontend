import styled from '@emotion/styled'
import React from 'react'
import { Box, Flex } from 'theme-ui'

const StyledCard = styled(Flex)`
	width: 100%;
	flex-direction: column;
	align-items: center;
	padding: 13px;
	gap: 10px;

	background: ${props => props.theme.colors.dark400};

	border: 1px solid ${props => props.theme.colors.dark500};

	box-shadow: 0px 25px 50px -12px rgba(48, 69, 113, 0.25);
	border-radius: 10px;
`
const StyledHeader = styled(Flex)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	width: 100%;
	height: 36px;
`

const Title = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 18px;
`

interface NotificationCardProps {
	title?: string
}

export default function NotificationCard({ title }: NotificationCardProps) {
	return (
		<StyledCard>
			<StyledHeader>
				<Title>{title}</Title>
			</StyledHeader>
		</StyledCard>
	)
}

NotificationCard.defaultProps = {
	title: '',
}
