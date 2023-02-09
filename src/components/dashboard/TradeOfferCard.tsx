import { VerifiedIcon } from 'assets/icons/16pt'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { Link } from 'components/link'
import { LookingFor, TradeStateBadge } from 'components/shared/trade'
import { CounterOffersTable } from 'components/trade-listing-details'
import { Badge, Button, OverflowTip } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Trade, TRADE_STATE } from 'services/api/tradesService'
import { Collection, NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'

import {
	BottomImageArea,
	CardContainer,
	DescriptionSection,
	Image,
	ImageSection,
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
	StatusIconContainer,
	Subtitle,
	Title,
} from './TradeOfferCard.styled'

interface TradeOfferCardProps extends NFT {
	verified?: boolean
	name?: string
	lookingFor?: (Partial<Collection> & {
		currency?: string
		amount?: string
	})[]
	nfts: NFT[]
	href: string
	disabled?: boolean
	lookingForItemsLimit?: number
	previewItemsLimit?: number
	isPrivate?: boolean
	hasLookingFor?: boolean
	refetchTrade: () => void
	trade: Trade
	state: TRADE_STATE
}

function TradeOfferCard({
	verified,
	lookingFor,
	nfts,
	href,
	disabled,
	lookingForItemsLimit = 3,
	previewItemsLimit = 4,
	isPrivate,
	hasLookingFor = true,
	trade,
	state,
	refetchTrade,
	...NFTProps
}: TradeOfferCardProps) {
	const { name, collectionName, imageUrl } = NFTProps
	const { t } = useTranslation('common')
	const [showingCounterTrades, setShowingCounterTrades] = React.useState(false)

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
						<Box sx={{ flex: [null, 1], pl: ['12px', '18px'], pr: ['12px'] }}>
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
													<Badge bg='primary200'>
														{t('common:more-nfts', { count: nfts.length })}
													</Badge>
												</OverflowTip>
											</Flex>
										)}
										<TradeStateBadge tradeState={state} />
									</Flex>
								</Flex>
							</DescriptionSection>
							<LookingFor
								lookingFor={lookingFor}
								lookingForItemsLimit={lookingForItemsLimit}
								hasLookingFor={hasLookingFor}
							/>
						</Box>
					</CardContainer>
				</a>
			</Link>
			<Flex sx={{ flex: 1, maxHeight: '40px' }}>
				<Button
					fullWidth
					sx={{
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
						...(showingCounterTrades
							? {
									borderBottomLeftRadius: 0,
									borderBottomRightRadius: 0,
							  }
							: {}),
					}}
					variant={showingCounterTrades ? 'dark' : 'primary'}
					onClick={() => setShowingCounterTrades(prev => !prev)}
				>
					{t(
						`dashboard:trades:${showingCounterTrades ? 'hide-offers' : 'see-offers'}`
					)}
				</Button>
			</Flex>
			{showingCounterTrades && (
				<CounterOffersTable
					excludeTopBorder
					refetchTrade={refetchTrade}
					trade={trade}
				/>
			)}
		</Flex>
	)
}

TradeOfferCard.defaultProps = {
	verified: false,
	name: '',
	lookingFor: undefined,
	disabled: false,
	lookingForItemsLimit: 4,
	previewItemsLimit: 4,
	isPrivate: false,
	hasLookingFor: true,
}

export default TradeOfferCard
