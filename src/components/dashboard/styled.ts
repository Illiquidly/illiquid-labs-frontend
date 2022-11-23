import styled from '@emotion/styled'
import { Card } from 'components/ui'
import { Box, Flex } from 'theme-ui'

export const Title = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	font-size: 34px;
	line-height: 48px;
`

export const SectionTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 26px;
	line-height: 24px;
`

export const ActivityCard = styled(Card)`
	border: none;
	background: ${props => props.theme.colors.dark400};
	border-radius: 20px;
`

ActivityCard.defaultProps = {
	sx: {
		px: ['32px', '18px'],
	},
}

export const ActivityCardEmptyContainer = styled(Flex)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

ActivityCardEmptyContainer.defaultProps = {
	sx: {
		height: ['448px', '472px'],
		gap: ['16px', '24px'],
	},
}

export const ActivityLoadingContainer = styled(Flex)`
	align-items: center;
	justify-content: center;
	min-height: 1003px;
`

ActivityLoadingContainer.defaultProps = {
	sx: {
		height: ['448px', '472px'],
		gap: ['16px', '24px'],
	},
}

export const ActivityCardEmptyTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;

	display: flex;
	align-items: center;
	text-align: center;

	color: ${props => props.theme.colors.gray1000};
`
ActivityCardEmptyTitle.defaultProps = {
	sx: {
		fontWeight: ['400'],
		fontSize: ['16px', '24px'],
		lineHeight: ['24px', '32px'],
	},
}

export const AccordionContentWrapper = styled.div`
	flex: 1;
	margin-bottom: 8px;
`
