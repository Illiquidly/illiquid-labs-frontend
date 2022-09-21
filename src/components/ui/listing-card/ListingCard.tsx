import { VerifiedIcon } from 'assets/icons/16pt'
import { HeartFilledIcon, HeartIcon } from 'assets/icons/mixed'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { Link } from 'components/link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Collection, NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import { OverflowTip } from '../overflow-tip'
import { Tooltip } from '../tooltip'

import {
	BottomImageArea,
	CardContainer,
	Chip,
	DescriptionSection,
	Image,
	ImageSection,
	LikeIconContainer,
	ListingOverlay,
	LookingForSection,
	LookingForTitle,
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
	RightTopImageArea,
	StatusIconContainer,
	Subtitle,
	Title,
} from './ListingCard.styled'

interface ListingCardProps extends NFT {
	liked?: boolean
	verified?: boolean
	name?: string
	lookingFor?: (Partial<Collection> & {
		currency?: string
		amount?: string
	})[]
	nfts: NFT[]
	href: string
	onLike: (nft: NFT) => void
	disabled?: boolean
	unavailable?: boolean
	unavailableText?: string
	lookingForItemsLimit?: number
	previewItemsLimit?: number
	isPrivate?: boolean
}

function ListingCard({
	liked,
	verified,
	lookingFor,
	nfts,
	href,
	onLike,
	disabled,
	unavailable,
	unavailableText,
	lookingForItemsLimit = 4,
	previewItemsLimit = 4,
	isPrivate,
	...NFTProps
}: ListingCardProps) {
	const { name, collectionName, imageUrl } = NFTProps
	const { t } = useTranslation('common')
	return (
		<Link href={href} disabled={disabled}>
			<CardContainer unavailable={unavailable}>
				{unavailable && <ListingOverlay>{unavailableText}</ListingOverlay>}
				<ImageSection>
					{imageUrl?.every(img => img === '') ? (
						<ImagePlaceholder width='61.56px' height='57.87px' />
					) : (
						<Image src={imageUrl ?? []} />
					)}
					<RightTopImageArea
						onClick={e => {
							// disable link when clicking on like icon
							e.preventDefault()
							onLike(NFTProps)
						}}
					>
						<LikeIconContainer>
							{liked ? (
								<HeartFilledIcon width='18px' height='15.24px' />
							) : (
								<HeartIcon width='18px' height='15.24px' />
							)}
						</LikeIconContainer>
					</RightTopImageArea>
					{(nfts || []).length ? (
						<BottomImageArea>
							<PreviewNFTsSection>
								{(nfts || []).slice(0, previewItemsLimit).map(nft => (
									<PreviewImageContainer key={`${nft.collectionAddress}${nft.tokenId}`}>
										{imageUrl?.every(img => img === '') ? (
											<ImagePlaceholder width='18px' height='18px' />
										) : (
											<PreviewImage src={imageUrl ?? []} />
										)}
									</PreviewImageContainer>
								))}
								{(nfts || []).slice(previewItemsLimit).length
									? `+${(nfts || []).slice(previewItemsLimit).length}`
									: ''}
							</PreviewNFTsSection>
						</BottomImageArea>
					) : null}
				</ImageSection>
				<DescriptionSection>
					<Flex>
						<Flex sx={{ flex: 1 }}>
							<OverflowTip>
								<Title>{name}</Title>
							</OverflowTip>
						</Flex>
						<Flex sx={{ gap: '4px' }}>
							{isPrivate && (
								<StatusIconContainer>
									<TradeIcon />
								</StatusIconContainer>
							)}
						</Flex>
					</Flex>
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
					<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
						{!lookingFor?.length ? <Chip>Any offer</Chip> : null}
						{(lookingFor || []).map((value, index) =>
							index < lookingForItemsLimit ? (
								<Chip key={JSON.stringify(value)}>
									{value.amount
										? `${value.amount} ${value.currency}`
										: value.collectionName}
								</Chip>
							) : null
						)}
						{lookingFor?.slice(lookingForItemsLimit).length ? (
							<Tooltip
								overlay={
									<div>
										{lookingFor?.slice(lookingForItemsLimit).map(value => (
											<div key={JSON.stringify(value)}>
												{value.amount
													? `${value.amount} ${value.currency}`
													: value.collectionName}
											</div>
										))}
									</div>
								}
							>
								<Chip>+{lookingFor?.slice(lookingForItemsLimit).length}</Chip>
							</Tooltip>
						) : null}
					</Flex>
				</LookingForSection>
			</CardContainer>
		</Link>
	)
}

ListingCard.defaultProps = {
	liked: false,
	verified: false,
	name: '',
	lookingFor: undefined,
	disabled: false,
	unavailable: false,
	unavailableText: '',
	lookingForItemsLimit: 4,
	previewItemsLimit: 4,
	isPrivate: false,
}

export default ListingCard
