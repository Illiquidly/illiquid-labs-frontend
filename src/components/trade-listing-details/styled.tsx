import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import { Button } from 'components/ui'
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
	width: 100%;
	height: 100%;
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

export const HorizontalDividerLine = styled.div`
	flex: 1;
	height: 1px;
	background: ${props => props.theme.colors.dark500};
`

export const VerticalDividerLine = styled.div`
	flex: 1;
	width: 1px;
	background: ${props => props.theme.colors.dark500};
`

export const HorizontalTradeLine = () => {
	const theme = useTheme()
	return (
		<Flex sx={{ mt: '10px', gap: '2px', mb: '10px', alignItems: 'center' }}>
			<HorizontalDividerLine />
			<Flex
				sx={{
					width: '20px',
					height: '20px',
					background: 'primary100',
					borderWidth: '2px',
					borderStyle: 'solid',
					borderColor: 'dark400',
					borderRadius: '6px',
					alignItems: 'center',
					justifyContent: 'center',
					transform: 'rotate(90deg)',
				}}
			>
				<TradeIcon color={theme.colors.dark400} width='12px' height='12px' />
			</Flex>
			<HorizontalDividerLine />
		</Flex>
	)
}

export const VerticalTradeLine = () => {
	const theme = useTheme()
	return (
		<Flex
			sx={{
				height: '100%',
				flexDirection: 'column',
				ml: '10px',
				gap: '2px',
				mr: '10px',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<VerticalDividerLine />
			<Flex
				sx={{
					width: '20px',
					height: '20px',
					background: 'primary100',
					borderWidth: '2px',
					borderStyle: 'solid',
					borderColor: 'dark400',
					borderRadius: '6px',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<TradeIcon color={theme.colors.dark400} width='12px' height='12px' />
			</Flex>
			<VerticalDividerLine />
		</Flex>
	)
}

export const CounterOffersTableTitle = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;

	text-align: left;
	color: ${props => props.theme.colors.gray1000};
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
