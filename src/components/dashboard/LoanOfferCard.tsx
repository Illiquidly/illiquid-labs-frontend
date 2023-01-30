import { VerifiedIcon } from 'assets/icons/16pt'
import { LunaIcon } from 'assets/icons/mixed'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { Link } from 'components/link'
import { LoanOffersTable } from 'components/loan-listing-details'
import { Button, OverflowTip } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Loan } from 'services/api/loansService'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex } from 'theme-ui'

import {
	AttributeCard,
	AttributeName,
	AttributeValue,
	BottomImageArea,
	CardContainer,
	DefaultedChip,
	DescriptionSection,
	FundedChip,
	Image,
	ImageSection,
	MoreChip,
	PreviewImage,
	PreviewImageContainer,
	PreviewNFTsSection,
	Subtitle,
	Title,
} from './LoanOfferCard.styled'

interface LoanOfferCardProps extends NFT {
	verified?: boolean
	name?: string
	nfts: NFT[]
	href: string
	disabled?: boolean
	previewItemsLimit?: number
	borrowAmount: number
	apr: number
	timeFrame: number
	isSmall?: boolean
	funded?: boolean
	defaulted?: boolean
	ended?: boolean
	published?: boolean
	loan?: Loan
	refetchLoan: () => void
}

function LoanOfferCard({
	verified,
	nfts,
	href,
	disabled,
	previewItemsLimit,
	borrowAmount,
	apr,
	timeFrame,
	isSmall,
	funded,
	defaulted,
	ended,
	published,
	refetchLoan,
	loan,
	...NFTProps
}: LoanOfferCardProps) {
	const { name, collectionName, imageUrl } = NFTProps
	const { t } = useTranslation(['common', 'loan-listings', 'dashboard'])
	const [showingOffers, setShowingOffers] = React.useState(false)

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
											<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
												<OverflowTip>
													<MoreChip>
														{t('common:more-nfts', { count: nfts.length })}
													</MoreChip>
												</OverflowTip>
											</Flex>
										)}
										{Boolean(published) && (
											<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
												<OverflowTip>
													<MoreChip>{t('dashboard:loans.published')}</MoreChip>
												</OverflowTip>
											</Flex>
										)}
										{Boolean(funded) && (
											<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
												<OverflowTip>
													<FundedChip>{t('dashboard:loans.funded')}</FundedChip>
												</OverflowTip>
											</Flex>
										)}
										{Boolean(defaulted) && (
											<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
												<OverflowTip>
													<DefaultedChip>{t('dashboard:loans.defaulted')}</DefaultedChip>
												</OverflowTip>
											</Flex>
										)}
										{Boolean(ended) && (
											<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
												<OverflowTip>
													<DefaultedChip>{t('dashboard:loans.ended')}</DefaultedChip>
												</OverflowTip>
											</Flex>
										)}
									</Flex>
								</Flex>
							</DescriptionSection>
							<Flex
								sx={{
									mt: 'auto',
									mb: '12px',
									height: '64px',
								}}
							>
								<AttributeCard>
									<Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
										<Flex sx={{ flexDirection: 'column' }}>
											<AttributeName isSmall={isSmall}>
												{t('dashboard:loans.borrow')}
											</AttributeName>

											<AttributeValue isSmall={isSmall}>
												<OverflowTip>
													<div>{borrowAmount}</div>
												</OverflowTip>

												<Box sx={{ ml: 8 }}>
													<LunaIcon />
												</Box>
											</AttributeValue>
										</Flex>
										<Flex sx={{ flexDirection: 'column' }}>
											<AttributeName isSmall={isSmall}>
												{t('dashboard:loans.earn')}
											</AttributeName>

											<AttributeValue isSmall={isSmall}>
												<OverflowTip>
													<div>{t('dashboard:loans.apr', { apr })}</div>
												</OverflowTip>
											</AttributeValue>
										</Flex>
										<Flex sx={{ flexDirection: 'column' }}>
											<AttributeName isSmall={isSmall}>
												{t('dashboard:loans.time-frame')}
											</AttributeName>

											<AttributeValue isSmall={isSmall}>
												<OverflowTip>
													<div>{t('dashboard:loans.days', { count: timeFrame })}</div>
												</OverflowTip>
											</AttributeValue>
										</Flex>
									</Flex>
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
						...(showingOffers
							? {
									borderBottomLeftRadius: 0,
									borderBottomRightRadius: 0,
							  }
							: {}),
					}}
					variant={showingOffers ? 'dark' : 'primary'}
					onClick={() => setShowingOffers(prev => !prev)}
				>
					{t(`dashboard:loans:${showingOffers ? 'hide-offers' : 'see-offers'}`)}
				</Button>
			</Flex>
			{showingOffers && (
				<LoanOffersTable excludeTopBorder refetchLoan={refetchLoan} loan={loan} />
			)}
		</Flex>
	)
}

LoanOfferCard.defaultProps = {
	verified: false,
	name: '',
	disabled: false,
	previewItemsLimit: 4,
	isSmall: false,
	funded: false,
	defaulted: false,
	ended: false,
	published: false,
	loan: undefined,
}

export default LoanOfferCard
