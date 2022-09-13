import styled from '@emotion/styled'
import { Img } from 'react-image'
import { Box, Flex, Text } from 'theme-ui'

export const Title = styled(Text)`
	font-style: normal;
	font-weight: 700;
	font-size: 21px;
	line-height: 30px;

	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.natural50};
`

export const Subtitle = styled(Text)`
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 30px;

	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.natural300};
`

Subtitle.defaultProps = {
	sx: {},
}

export const ImageSection = styled(Flex)`
	align-items: center;
	justify-content: center;
	position: relative;
	border-radius: 8px;
	overflow: hidden;

	aspect-ratio: 1 / 1;

	background: ${props => props.theme.colors.neutral900};
`

export const DescriptionSection = styled(Flex)`
	flex-direction: column;
	margin-top: 12px;
	height: 62px;
`

export const LookingForSection = styled(Flex)`
	flex-direction: column;
	margin-top: 12px;
	height: 88.6px;
`

export const LookingForTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 30px;
	text-align: left;

	letter-spacing: -0.02em;
	text-transform: uppercase;

	color: ${props => props.theme.colors.natural300};
`

export const RightTopImageArea = styled.div`
	z-index: ${props => props.theme.zIndices.listingCardImageOverlay};
	position: absolute;
	right: -6px;
	top: -6px;
	padding: 22px;
`

export const LikeIconContainer = styled(Flex)`
	width: 30px;
	height: 30px;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(24px);
	border-radius: 4px;
`

export const BottomImageArea = styled.div`
	z-index: ${props => props.theme.zIndices.listingCardImageOverlay};
	position: absolute;
	bottom: 8px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
`

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

	background: rgba(72, 74, 77, 0.3);

	backdrop-filter: blur(24px);

	border-radius: 4px;

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
`

export const ListingOverlay = styled(Flex)`
	z-index: ${props => props.theme.zIndices.listingCardOverlay};
	background: rgba(7, 21, 29, 0.8);
	backdrop-filter: blur(5px);
	position: absolute;
	inset: 0;
	padding-left: 64px;
	padding-right: 64px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	text-align: center;

	color: ${props => props.theme.colors.gray600};
`

export const Chip = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${props => props.theme.colors.dark400}
	border-radius: 6px;
	height: 24px; 
	padding: 4px 12.8px;

	font-style: normal;
	font-weight: 600;
	font-size: 16px;
  line-height: 24px;

	text-align: center;
	letter-spacing: -0.02em;
	color: ${props => props.theme.colors.gray600}
`

export const StatusIconContainer = styled(Flex)`
	align-items: center;
	justify-content: center;
	width: 29px;
	height: 32px;

	background: ${props => props.theme.colors.dark400};
	border-radius: 8px;
	backdrop-filter: blur(24px);
`
