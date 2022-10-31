import { VerifiedIcon } from 'assets/icons/16pt'
import {
	AvatarIcon,
	HeartFilledIcon,
	HeartIcon,
	LunaIcon,
} from 'assets/icons/mixed'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { Link } from 'components/link'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Collection, NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'
import getShortText from 'utils/js/getShortText'
import { OverflowTip } from '../../../ui/overflow-tip'

import {
	AttributeCard,
	AttributeName,
	AttributeValue,
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
	RaffleWinner,
	RaffleWinnerAddress,
	RaffleWinnerBadge,
	RaffleWinnerSection,
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
	winner?: string
	ticketPrice: string
	ticketCurrency: string
	ticketNumber: number
	ticketsSold: number
	endsIn: Date
}

function ListingCard({
	winner,
	liked,
	verified,
	nfts,
	href,
	onLike,
	disabled,
	previewItemsLimit = 4,
	ticketPrice,
	ticketCurrency,
	ticketNumber,
	ticketsSold,
	endsIn,
	...NFTProps
}: ListingCardProps) {
	const { name, collectionName, imageUrl } = NFTProps
	const { t } = useTranslation(['common', 'raffle-listings'])

	return (
		<Box sx={{ overflow: 'hidden' }}>
			<Link passHref href={href} disabled={disabled}>
				<a>
					<CardContainer hasNoBottomRadius={!!winner}>
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
						{!winner && (
							<Flex sx={{ flexDirection: 'column', gap: '6px', height: '130px' }}>
								<AttributeCard>
									<Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
										<Flex sx={{ flexDirection: 'column' }}>
											<AttributeName>{t('raffle-listings:price-ticket')}</AttributeName>
											<AttributeValue>
												{`${ticketPrice} ${ticketCurrency}`}{' '}
												<Box sx={{ ml: 8 }}>
													<LunaIcon />
												</Box>
											</AttributeValue>
										</Flex>
										<Flex sx={{ flexDirection: 'column' }}>
											<AttributeName>{t('raffle-listings:remaining')}</AttributeName>
											<AttributeValue>{`${ticketsSold} / ${ticketNumber}`}</AttributeValue>
										</Flex>
									</Flex>
								</AttributeCard>
								<AttributeCard>
									<AttributeName>
										{t(
											`raffle-listings:${moment().isAfter(endsIn) ? 'ended' : 'ends-in'}`
										)}
									</AttributeName>
									<AttributeValue>{moment(endsIn).fromNow()}</AttributeValue>
								</AttributeCard>
							</Flex>
						)}
					</CardContainer>
					{winner && (
						<RaffleWinnerSection>
							<RaffleWinnerBadge>
								<Box>🎊</Box>
								<Box>🥳</Box>
								<RaffleWinner>{t('raffle-listings:raffle-winner')}</RaffleWinner>
								<Box>🥳</Box>
								<Box>🎊</Box>
							</RaffleWinnerBadge>
							<Flex sx={{ gap: '10px', alignItems: 'flex-end' }}>
								<AvatarIcon width='34px' height='34px' />
								<RaffleWinnerAddress>{getShortText(winner, 10)}</RaffleWinnerAddress>
							</Flex>
						</RaffleWinnerSection>
					)}
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
	winner: '',
}

export default ListingCard
