import styled from '@emotion/styled'
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
