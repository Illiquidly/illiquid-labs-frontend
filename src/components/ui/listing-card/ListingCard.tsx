import { VerifiedIcon } from 'assets/icons/16pt'
import CheckedOutlineIcon from 'assets/icons/32pt/CheckedOutlineIcon'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { noop } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import { OverflowTip } from '../overflow-tip'

import {
	BottomImageArea,
	CardContainer,
	DescriptionSection,
	Image,
	ImageSection,
	LookingForSection,
	LookingForTitle,
	RightImageArea,
	Subtitle,
	Title,
} from './ListingCard.styled'

interface ListingCardProps {
	liked?: boolean
	verified?: boolean
	onCardClick?: React.MouseEventHandler<HTMLDivElement>
	name?: string
	collectionName?: string
	imageUrl?: string[]
	lookingFor?: string[]
	nfts: NFT[]
}

function ListingCard({
	liked,
	verified,
	onCardClick,
	name,
	collectionName,
	imageUrl,
	lookingFor,
	nfts,
}: ListingCardProps) {
	const { t } = useTranslation('common')
	return (
		<CardContainer onClick={onCardClick}>
			<ImageSection>
				{imageUrl?.every(img => img === '') ? (
					<ImagePlaceholder width='61.56px' height='57.87px' />
				) : (
					<Image src={imageUrl ?? []} />
				)}
				{liked && (
					<RightImageArea>
						<CheckedOutlineIcon width='32px' height='32px' />
					</RightImageArea>
				)}
				<BottomImageArea>
					{/* TODO */}
					{(nfts || []).map(nft => (
						<div key={`${nft.collectionAddress}${nft.tokenId}`}>{nft.name}</div>
					))}
				</BottomImageArea>
			</ImageSection>
			<DescriptionSection>
				<OverflowTip>
					<Title>{name}</Title>
				</OverflowTip>
				<Flex>
					<OverflowTip>
						<Subtitle>{collectionName}</Subtitle>
					</OverflowTip>
					{verified && (
						<Box ml={['4px']} mt='6px'>
							<VerifiedIcon width='17.27px' height='17.27px' />
						</Box>
					)}
				</Flex>
			</DescriptionSection>
			<LookingForSection>
				<LookingForTitle>{t('common:looking-for')}</LookingForTitle>
				{/* TODO */}
				{(lookingFor || []).map(value => (
					<div key={value}>{value}</div>
				))}
			</LookingForSection>
		</CardContainer>
	)
}

ListingCard.defaultProps = {
	liked: false,
	verified: false,
	onCardClick: noop,
	name: '',
	collectionName: '',
	imageUrl: [],
	lookingFor: undefined,
}

export default ListingCard
