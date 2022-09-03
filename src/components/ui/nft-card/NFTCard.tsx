import { VerifiedIcon } from 'assets/icons/16pt'
import CheckedOutlineIcon from 'assets/icons/32pt/CheckedOutlineIcon'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { noop } from 'lodash'
import React, { ReactNode } from 'react'
import { Box, Flex } from 'theme-ui'
import { OverflowTip } from '../overflow-tip'
import {
	BottomImageArea,
	CardContainer,
	CoverLabel,
	DescriptionSection,
	Image,
	ImageSection,
	RightImageArea,
	Subtitle,
	Title,
} from './NFTCard.styled'

type SizeVariants = 'small' | 'medium'

interface NFTCardProps {
	checked?: boolean
	verified?: boolean
	onCardClick?: React.MouseEventHandler<HTMLDivElement>
	onCoverClick?: React.MouseEventHandler<HTMLDivElement>
	name?: string
	collectionName?: string
	size?: SizeVariants
	imageUrl?: string[]
	isCover?: boolean
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

function NFTCard({
	checked,
	verified,
	onCardClick,
	onCoverClick,
	name,
	collectionName,
	size = 'medium',
	isCover,
	bottomActionComponent,
	imageUrl,
}: NFTCardProps) {
	return (
		<CardContainer checked={checked} onClick={onCardClick} isCover={isCover}>
			<ImageSection>
				{imageUrl?.every(img => img === '') ? (
					<ImagePlaceholder width='85px' height='80px' />
				) : (
					<Image src={imageUrl ?? []} />
				)}
				{checked && (
					<RightImageArea>
						<CheckedOutlineIcon {...checkedIconSizeBySizeVariant[size]} />
					</RightImageArea>
				)}

				<CoverLabel className='coverLabel' isCover={isCover} onClick={onCoverClick}>
					{isCover ? 'cover' : 'set as cover'}
				</CoverLabel>

				{bottomActionComponent && (
					<BottomImageArea>{bottomActionComponent}</BottomImageArea>
				)}
			</ImageSection>
			<DescriptionSection size={size}>
				<OverflowTip>
					<Title size={size}>{name}</Title>
				</OverflowTip>
				<Flex>
					<OverflowTip>
						<Subtitle size={size}>{collectionName}</Subtitle>
					</OverflowTip>
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
	isCover: false,
	bottomActionComponent: noop,
	checked: false,
	verified: false,
	onCardClick: noop,
	onCoverClick: noop,
	name: '',
	collectionName: '',
	size: 'medium',
	imageUrl: [],
}

export default NFTCard
