import styled from '@emotion/styled'
import {
	Button,
	StyledAttributeCard,
	StyledAttributeName,
	StyledAttributeValue,
} from 'components/ui'
import { Img } from 'react-image'
import { Box, Flex, Text } from 'theme-ui'

export const Row = styled(Flex)`
	padding: 8px 0px;
`

export const IconButton = props => {
	const { children, ...buttonProps } = props
	return <Button {...buttonProps}>{children}</Button>
}

IconButton.defaultProps = {
	sx: { minWidth: '44px', height: '40px', padding: '13px' },
	variant: 'secondary',
}

export const Title = styled(Text)`
	font-style: normal;
	font-weight: 700;

	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.natural50};
`

Title.defaultProps = {
	sx: {
		fontSize: ['30px', '50px'],
		lineHeight: ['36px', '66.7px'],
	},
}

export const Subtitle = styled(Text)`
	font-style: normal;
	font-weight: 500;

	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.natural300};
`

Subtitle.defaultProps = {
	sx: {
		fontSize: ['14px', '14px', '14px'],
		lineHeight: ['30px', '14px', '28px'],
	},
}

export const TokenChip = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	padding: 4px 6px 4px 4px;
	gap: 8px;
	min-width: 54px;

	height: 32px;

	background: ${props => props.theme.colors.dark500};
	border-radius: 6px;

	font-family: 'Heebo';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
`

export const ImageSection = styled(Flex)`
	align-items: center;
	justify-content: center;
	position: relative;
	border-radius: 8px;
	overflow: hidden;

	border-radius: 12px;

	aspect-ratio: 1 / 1;

	background: ${props => props.theme.colors.dark400};
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

	&:hover {
		cursor: pointer;
	}
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

export const Chip = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${props => props.theme.colors.dark400};
	border-radius: 6px;
	height: 24px;
	padding: 4px 12.8px;

	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;

	text-align: center;
	letter-spacing: -0.02em;
	color: ${props => props.theme.colors.gray600};
`

export const StatusIconContainer = styled(Flex)`
	align-items: center;
	justify-content: center;
	width: 29px;
	height: 32px;
	color: ${props => props.theme.colors.gray1000};

	background: ${props => props.theme.colors.dark400};
	border-radius: 8px;
	backdrop-filter: blur(24px);
`

export const AttributesCard = styled(Box)`
	flex: 1;
	background: ${props => props.theme.colors.dark300};
	padding: 10px;
	border-radius: 8px;
`

AttributesCard.defaultProps = {
	sx: {
		display: 'grid',
		gridTemplateColumns: ['1fr', '1fr 1fr 1fr', '1fr 1fr 1fr'],
		gap: '8px',
	},
}

export const AttributeCard = styled(StyledAttributeCard)`
	align-items: flex-start;
	width: 100%;
`

export const AttributeName = styled(StyledAttributeName)`
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	color: ${props => props.theme.colors.gray600};
	text-transform: none;
`

export const AttributeValue = styled(StyledAttributeValue)`
	align-items: center;
	overflow: hidden;
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
`

export const OwnerName = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 16px;

	text-align: center;
	letter-spacing: -0.02em;

	color: ${props => props.theme.colors.gray1000};
`

export const OwnerAvatarImg = styled(Img)`
	width: 100%;
	height: 100%;
`

export const ParticipantsTitle = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;

	text-align: left;
	color: ${props => props.theme.colors.gray1000};
`

export const NameLabel = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 20px;

	color: ${props => props.theme.colors.gray1000};
`

export const ImagePlaceholder = styled.div`
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
