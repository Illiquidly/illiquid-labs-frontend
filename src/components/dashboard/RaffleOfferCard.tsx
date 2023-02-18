import { VerifiedIcon } from 'assets/icons/16pt'
import { LunaIcon } from 'assets/icons/mixed'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { Link } from 'components/link'
import { RaffleParticipantsTable } from 'components/raffle-listing-details'
import RaffleStateBadge from 'components/shared/raffle/listing-card/RaffleStateBadge'
import { Badge, Button, OverflowTip } from 'components/ui'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Raffle, RAFFLE_STATE } from 'services/api/rafflesService'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'

import {
	AttributeCard,
	AttributeName,
	AttributeValue,
	BottomImageArea,
	CardContainer,
	DescriptionSection,
	Image,
	ImageSection,
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
	Subtitle,
	Title,
} from './RaffleOfferCard.styled'

interface RaffleOfferCardProps extends NFT {
	isSmall?: boolean
	verified?: boolean
	name?: string
	nfts: NFT[]
	href: string
	disabled?: boolean
	lookingForItemsLimit?: number
	previewItemsLimit?: number
	ticketPrice: string
	ticketCurrency: string
	ticketNumber: number
	ticketsSold: number
	endsIn: Date
	raffle: Raffle
	state: RAFFLE_STATE
}

function RaffleOfferCard({
	verified,
	nfts,
	href,
	isSmall,
	disabled,
	previewItemsLimit = 4,
	ticketPrice,
	ticketCurrency,
	ticketNumber,
	ticketsSold,
	endsIn,
	raffle,
	state,
	...NFTProps
}: RaffleOfferCardProps) {
	const { name, collectionName, imageUrl } = NFTProps
	const { t } = useTranslation(['common', 'raffle-listings'])
	const [showingParticipants, setShowingParticipants] = React.useState(false)

	return (
		<Flex sx={{ flexDirection: 'column' }}>
			<Link passHref href={href} disabled={disabled}>
				<a>
					<CardContainer>
						<ImageSection>
							{imageUrl?.every(img => img === '') ? (
								<ImagePlaceholder width='61.56px' height='57.87px' />
							) : (
								<Image src={imageUrl ?? []} />
							)}

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

						<Flex
							sx={{
								flex: [null, 1],
								pb: ['12px', 0],
								pl: ['12px', '18px'],
								pr: ['12px'],
								flexDirection: ['column'],
							}}
						>
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
											<Flex sx={{ ml: '4px', maxHeight: '18px' }}>
												<OverflowTip>
													<Badge bg='primary200'>
														{t('common:more-nfts', { count: nfts.length })}
													</Badge>
												</OverflowTip>
											</Flex>
										)}
									</Flex>
									<RaffleStateBadge raffleState={state} />
								</Flex>
							</DescriptionSection>
							<Flex
								sx={{
									mt: 'auto',
									flexDirection: 'column',
									mb: '12px',
									gap: '6px',
									height: '130px',
								}}
							>
								<AttributeCard>
									<Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
										<Flex sx={{ flexDirection: 'column' }}>
											<AttributeName isSmall={isSmall}>
												{t('raffle-listings:price-ticket')}
											</AttributeName>

											<AttributeValue isSmall={isSmall}>
												<OverflowTip>
													<div>{`${ticketPrice} ${ticketCurrency}`} </div>
												</OverflowTip>

												<Box sx={{ ml: 8 }}>
													<LunaIcon />
												</Box>
											</AttributeValue>
										</Flex>
										<Flex sx={{ flexDirection: 'column' }}>
											<AttributeName isSmall={isSmall}>
												{t('raffle-listings:remaining')}
											</AttributeName>

											<AttributeValue isSmall={isSmall}>
												<OverflowTip>
													<div>{`${ticketsSold} / ${ticketNumber}`}</div>
												</OverflowTip>
											</AttributeValue>
										</Flex>
									</Flex>
								</AttributeCard>
								<AttributeCard>
									<AttributeName isSmall={isSmall}>
										{t(
											`raffle-listings:${moment().isAfter(endsIn) ? 'ended' : 'ends-in'}`
										)}
									</AttributeName>
									<AttributeValue isSmall={isSmall}>
										{moment(endsIn).fromNow()}
									</AttributeValue>
								</AttributeCard>
							</Flex>
						</Flex>
					</CardContainer>
				</a>
			</Link>

			<Flex sx={{ flex: 1, maxHeight: '40px' }}>
				<Button
					fullWidth
					sx={{
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
						...(showingParticipants
							? {
									borderBottomLeftRadius: 0,
									borderBottomRightRadius: 0,
							  }
							: {}),
					}}
					variant={showingParticipants ? 'dark' : 'primary'}
					onClick={() => setShowingParticipants(prev => !prev)}
				>
					{t(
						`dashboard:raffles:${
							showingParticipants ? 'hide-participants' : 'see-participants'
						}`
					)}
				</Button>
			</Flex>
			{showingParticipants && (
				<RaffleParticipantsTable excludeTopBorder raffle={raffle} />
			)}
		</Flex>
	)
}

RaffleOfferCard.defaultProps = {
	verified: false,
	name: '',
	disabled: false,
	lookingForItemsLimit: 4,
	previewItemsLimit: 4,
	isSmall: false,
}

export default RaffleOfferCard
