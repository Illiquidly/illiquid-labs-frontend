import styled from '@emotion/styled'
import { Card } from 'components/ui'
import { Img } from 'react-image'
import { Flex } from 'theme-ui'

export const PreviewNFTsSection = styled.div`
	flex: 1;
	display: flex;
	height: 41px;
	align-items: center;
	padding-left: 4px;
	padding-right: 4px;
	overflow: hidden;
	gap: 4px;

	width: 166px;

	font-style: normal;
	font-weight: 700;
	font-size: 12px;
`

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	z-index: ${props => props.theme.zIndices.listingCardImg};
	position: absolute;
`

export const PreviewImage = styled(Image)`
	position: unset;
`

export const PreviewImageContainer = styled.div`
	aspect-ratio: 1/1;
	height: 31px;
	overflow: hidden;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const Title = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 28px;

	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.gray1000};
`

export const TabsSection = styled(Flex)``

TabsSection.defaultProps = {
	sx: {
		marginBottom: ['12px'],
		display: ['flex', 'flex', 'flex'],
		maxWidth: [null, null, '356px'],
	},
}

export const SendingCard = styled(Card)`
	background: ${props => props.theme.colors.dark200};
	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	border-radius: 12px;
	align-items: center;
	justify-content: center;
	text-align: center;
`

SendingCard.defaultProps = {
	sx: {
		minHeight: ['412px'],
		px: ['12px', '24px', '64px'],
	},
}

export const CardSubtitle = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;

	color: ${props => props.theme.colors.gray700};
`

export const NameServiceImagePlaceholder = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0px;

	width: 52px;
	height: 52px;

	background: ${props => props.theme.colors.dark100};
	border-radius: 8px;

	overflow: hidden;
`

export const NameServiceImage = styled(Img)`
	min-width: 100%;
	min-height: 100%;
`

export const NameLabel = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 20px;

	color: ${props => props.theme.colors.gray1000};
`
