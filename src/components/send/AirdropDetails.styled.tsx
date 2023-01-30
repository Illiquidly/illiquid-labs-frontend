import styled from '@emotion/styled'
import { Card } from 'components/ui'

import { Box, Flex, Text } from 'theme-ui'

export const ContentCardWrapper = styled.div`
	flex: 1;
	flex-direction: column;
`

export const ContentCard = styled(Card)`
	border-radius: 12px;
`
ContentCard.defaultProps = {
	sx: {
		p: ['16px', '16px', '24px', '24px'],
	},
}

export const ContentCardTitle = styled(Text)``

ContentCardTitle.defaultProps = {
	as: 'h3',
	variant: 'textXlSemibold',
	sx: { lineHeight: '32px' },
	color: 'neutral50',
}

export const ContentCardSubtitle = styled(Text)`
	padding: 2px 0 16px;
`

ContentCardSubtitle.defaultProps = {
	as: 'p',
	variant: 'textSmRegular',
	color: 'gray700',

	sx: { lineHeight: '20px' },
}

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const RadioWrapper = styled(Flex)`
	gap: 8px;
`
RadioWrapper.defaultProps = {
	sx: {
		flexDirection: ['column', 'row'],
		width: ['100%', 'auto'],
	},
}

export const UploadCircle = styled(Flex)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	border-radius: 100%;
	background: rgba(255, 255, 255, 0.1);
`

export const UploadLabel = styled(Flex)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
`

export const UploadMaxSize = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;

	color: ${props => props.theme.colors.gray600};
`

export const UploadContentArea = styled(Flex)`
	flex: 1;
	cursor: pointer;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
`
