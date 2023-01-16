import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'

export const WatchListCard = styled(Flex)`
	flex: 1;
	background: ${props => props.theme.colors.dark400};
	border-radius: 20px;
	justify-content: space-between;
`

export const Title = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;

	color: ${props => props.theme.colors.gray1000};
`

Title.defaultProps = {
	sx: {
		fontSize: ['20px', '36px'],
		lineHeight: ['32px', '44px'],
	},
}

export const Description = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
`

Description.defaultProps = {
	sx: {
		fontSize: ['14px', '20px'],
		lineHeight: ['20px', '32px'],
		fontWeight: ['400', '500'],
		color: ['gray700', 'gray1000'],
	},
}

export const WatchListEmptyContainer = styled(Flex)``

WatchListEmptyContainer.defaultProps = {
	sx: {
		my: ['48px', '48px', '106px'],
		mx: ['16px', '32px', '82px'],
		flex: 1,
		maxWidth: ['unset', '517px'],
	},
}

export const WatchListAssetImageContainer = styled(Flex)``

WatchListAssetImageContainer.defaultProps = {
	sx: {
		width: ['124px', '164px', '280px'],
		height: '100%',
		mr: ['24px', '48px', '64px'],
	},
}
