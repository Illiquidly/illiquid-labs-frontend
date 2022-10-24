import { VerifiedIcon } from 'assets/icons/16pt'
import { HeartFilledIcon, HeartIcon } from 'assets/icons/mixed'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { Link } from 'components/link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Collection, NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import { OverflowTip } from '../../../ui/overflow-tip'

import {
	BottomImageArea,
	CardContainer,
	DescriptionSection,
	Image,
	ImageSection,
	LeftCutout,
	LikeIconContainer,
	Line,
	LineSection,
	MoreChip,
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
	RightCutout,
	RightTopImageArea,
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
	lookingForItemsLimit?: number
	previewItemsLimit?: number
	// winner?: string
	// raffleDuration?: string
	// ticketPrice?: string
	// ticketCurrency?: string
	// ticketNumber?: number
	// ticketSupply?: number
	// withdrawn?: boolean
}

function ListingCard({
	liked,
	verified,
	nfts,
	href,
	onLike,
	disabled,
	previewItemsLimit = 4,
	...NFTProps
}: ListingCardProps) {
	const { name, collectionName, imageUrl } = NFTProps
	const { t } = useTranslation('common')

	return (
		<Box sx={{ overflow: 'hidden' }}>
			<Link passHref href={href} disabled={disabled}>
				<a>
					<CardContainer>
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
											<PreviewImageContainer
												key={`${nft.collectionAddress}_${nft.tokenId}`}
											>
												{nft?.imageUrl?.every(img => img === '') ? (
													<ImagePlaceholder width='18px' height='18px' />
												) : (
													<PreviewImage src={nft?.imageUrl ?? []} />
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
						<LineSection>
							<Line />
							<LeftCutout />
							<RightCutout />
						</LineSection>
						<DescriptionSection>
							<Flex>
								<Flex sx={{ flex: 1 }}>
									<OverflowTip>
										<Title>{name}</Title>
									</OverflowTip>
								</Flex>
							</Flex>
							<Flex sx={{ alignItems: 'center' }}>
								<OverflowTip>
									<Subtitle>{collectionName}</Subtitle>
								</OverflowTip>

								{verified && (
									<Box ml={['4px']} mt='6px'>
										<VerifiedIcon width='17.27px' height='17.27px' />
									</Box>
								)}
								<Flex sx={{ ml: 'auto' }}>
									{Boolean(nfts.length > 1) && (
										<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
											<OverflowTip>
												<MoreChip>{t('common:more-nfts', { count: nfts.length })}</MoreChip>
											</OverflowTip>
										</Flex>
									)}
								</Flex>
							</Flex>
						</DescriptionSection>
					</CardContainer>
				</a>
			</Link>
		</Box>
	)
}

ListingCard.defaultProps = {
	liked: false,
	verified: false,
	name: '',
	lookingFor: undefined,
	disabled: false,
	lookingForItemsLimit: 4,
	previewItemsLimit: 4,
}

export default ListingCard
