import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const StyledDescriptionCard = styled(Flex)`
	border-radius: 8px;
	flex-direction: column;
	gap: 2px;
	width: 100%;
	position: relative;
`

export const StyledDescriptionCardItem = styled(Flex)`
	overflow: hidden;
	gap: 4px;
	background: ${props => props.theme.colors.dark300};
	width: 100%;
	min-height: 40px;
	align-items: center;
	padding: 8px;
	font-size: 14px;
	line-height: 16px;
	color: ${props => props.theme.colors.gray600};

	&:first-of-type {
		border-radius: 4px 4px 0 0;
	}

	&:last-of-type {
		border-radius: 0 0 4px 4px;
	}
`

export function DescriptionCard({ children, ...props }) {
	return <StyledDescriptionCard {...props}>{children}</StyledDescriptionCard>
}

export function DescriptionCardItem({ children, ...props }) {
	return (
		<StyledDescriptionCardItem {...props}>
			<Flex sx={{ width: '100%', overflow: 'hidden', alignItems: 'center' }}>
				{children}
			</Flex>
		</StyledDescriptionCardItem>
	)
}
