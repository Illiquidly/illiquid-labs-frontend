import { VerifiedIcon } from 'assets/icons/16pt'
import CheckedOutlineIcon from 'assets/icons/32pt/CheckedOutlineIcon'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { noop } from 'lodash'
import React, { ReactNode } from 'react'
import { Box, Flex } from 'theme-ui'
import {
	BottomImageArea,
	CardContainer,
	DescriptionSection,
	Image,
	ImageSection,
	LeftImageArea,
	RightImageArea,
	Subtitle,
	Title,
} from './NFTCard.styled'

type SizeVariants = 'small' | 'medium'

interface NFTCardProps {
	checked?: boolean
	verified?: boolean
	onClick?: React.MouseEventHandler<HTMLDivElement>
	name?: string
	collectionName?: string
	size?: SizeVariants
	imageUrl?: string[]
	placeholderImageSize?: SizeVariants
	leftActionComponent?: ReactNode
	bottomActionComponent?: ReactNode
}

const checkedIconSizeBySizeVariant = {
	small: {
		width: '24px',
		height: '24px',
	},
	medium: {
		width: '32px',
		height: '32px',
	},
}

const verifiedMarginTopBySizeVariant = {
	small: 0,
	medium: '6px',
}

const placeholderImageSizesBySizeVariant = {
	small: {
		width: '61.56px',
		height: '57.87px',
	},
	medium: {
		width: '85px',
		height: '80px',
	},
}

function NFTCard({
	checked,
	verified,
	onClick,
	name,
	collectionName,
	size = 'medium',
	leftActionComponent,
	placeholderImageSize = 'medium',
	bottomActionComponent,
	imageUrl,
}: NFTCardProps) {
	return (
		<CardContainer size={size} checked={checked} onClick={onClick}>
			<ImageSection>
				<Image src={imageUrl ?? []} />
				<ImagePlaceholder
					{...placeholderImageSizesBySizeVariant[placeholderImageSize]}
				/>
				{checked && (
					<RightImageArea>
						<CheckedOutlineIcon {...checkedIconSizeBySizeVariant[size]} />
					</RightImageArea>
				)}

				{leftActionComponent && (
					<LeftImageArea>{leftActionComponent}</LeftImageArea>
				)}

				{bottomActionComponent && (
					<BottomImageArea>{bottomActionComponent}</BottomImageArea>
				)}
			</ImageSection>
			<DescriptionSection size={size}>
				<Title size={size}>{name}</Title>
				<Flex>
					<Subtitle size={size}>{collectionName}</Subtitle>
					{verified && (
						<Box ml={['4px']} mt={verifiedMarginTopBySizeVariant[size]}>
							<VerifiedIcon />
						</Box>
					)}
				</Flex>
			</DescriptionSection>
		</CardContainer>
	)
}

NFTCard.defaultProps = {
	leftActionComponent: noop,
	bottomActionComponent: noop,
	checked: false,
	verified: false,
	onClick: noop,
	name: '',
	collectionName: '',
	size: 'medium',
	imageUrl: [],
	placeholderImageSize: 'medium',
}

export default NFTCard
