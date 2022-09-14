import React from 'react'
import { useTranslation } from 'next-i18next'

import {
	AttributeCard,
	BlueWarning,
	Button,
	LayoutContainer,
	OverflowTip,
	Page,
	Tooltip,
	Wallet,
	WalletItem,
} from 'components/ui'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { Box, Flex } from 'theme-ui'

import {
	RightTopImageArea,
	LikeIconContainer,
	PreviewNFTsSection,
	PreviewImageContainer,
	PreviewImage,
	StatusIconContainer,
	ImageSection,
	BottomImageArea,
	DescriptionSection,
	Title,
	Subtitle,
	Image,
	Chip,
	LookingForSection,
	LookingForTitle,
	CounterOffers,
} from 'components/listing-details'

import { VerifiedIcon } from 'assets/icons/16pt'
import {
	HeartFilledIcon,
	HeartIcon,
	DeleteOutlineIcon,
	PenOutlineIcon,
	ShareOutlineIcon,
	ArrowLeftIcon,
} from 'assets/icons/mixed'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
/** todo: generate the static paths to tids */
const getStaticPaths = makeStaticPaths({ tid: Number(1).toString() })
export { getStaticPaths, getStaticProps }

/** todo remove */
const attributes = [
	{
		traitType: 'gang',
		value: 'The Firest',
	},
	{
		traitType: 'background',
		value: 'SnowDrift',
	},
	{
		traitType: 'splatter',
		value: 'Flesh Wound',
	},
	{
		traitType: 'body',
		value: 'Standard',
	},
	{
		traitType: 'weapon',
		value: 'Standard',
	},
	{
		traitType: 'weapon 2',
		value: 'Standard',
	},
]

const lookingFor = [
	{
		amount: '10',
		denom: 'Luna',
	},
	{
		collectionName: 'DeGods',
		collectionAddress: '1',
	},
	{
		collectionName: 'Galactic Punks',
		collectionAddress: '2',
	},
	{
		collectionName: 'Skeleton Punks',
		collectionAddress: '3',
	},
	{
		collectionName: 'Lovely Punks',
		collectionAddress: '4',
	},
	{
		collectionName: 'Scary Punks',
		collectionAddress: '5',
	},
	{
		denom: 'yLuna',
		amount: '20',
	},
]

/** todo remove */

const nfts = [
	{
		collectionAddress: '1',
		collectionName: '1',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '1',
		description: 'test',
	},
	{
		collectionAddress: '2',
		collectionName: '2',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '2',
		description: 'test',
	},
	{
		collectionAddress: '3',
		collectionName: '3',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '3',
		description: 'test',
	},
	{
		collectionAddress: '4',
		collectionName: '4',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '4',
		description: 'test',
	},
	{
		collectionAddress: '5',
		collectionName: '5',
		attributes: [],
		imageUrl: [
			'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		],
		tokenId: '5',
		description: 'test',
	},
]

const liked = false
const previewItemsLimit = 4
const isPrivate = false
const verified = true
const onLike = n => console.warn(n)
const lookingForItemsLimit = 4
const NFTProps = {}

const imageUrl = [
	'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
]
const name = 'Fox #7561'
const collectionName = 'Mutant Ape Yacht Club'

export default function ListingDetails() {
	const { t } = useTranslation(['common', 'trade-listings'])
	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<Flex
					sx={{
						padding: '16px 0px',
						justifyContent: 'space-between',
					}}
				>
					<Flex
						sx={{
							justifyContent: 'flex-start',
						}}
					>
						<Button
							sx={{ height: '40px', padding: '13px' }}
							variant='secondary'
							startIcon={<ArrowLeftIcon />}
						>
							{t('trade-listings:back-to-listings')}
						</Button>
					</Flex>
					<Flex
						sx={{
							gap: '6px',
							justifyContent: 'flex-end',
						}}
					>
						<Button
							sx={{
								width: '44px',
								height: '40px',
								padding: '13px',
							}}
							variant='secondary'
						>
							<PenOutlineIcon />
						</Button>
						<Button
							sx={{ width: '44px', height: '40px', padding: '13px' }}
							variant='secondary'
						>
							<DeleteOutlineIcon />
						</Button>
						<Button
							sx={{ width: '44px', height: '40px', padding: '13px' }}
							variant='secondary'
						>
							<ShareOutlineIcon />
						</Button>
					</Flex>
				</Flex>
				<Flex>
					<BlueWarning sx={{ width: '100%', height: '49px' }}>
						{t('trade-listings:item-not-available')}
					</BlueWarning>
				</Flex>
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
					{(nfts || []).length && (
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
					)}
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
				{attributes && (
					<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
						{attributes.map(attribute => (
							<AttributeCard
								key={JSON.stringify(attribute)}
								name={attribute.traitType}
								value={attribute.value}
							/>
						))}
					</Flex>
				)}
				<Flex sx={{ padding: '16px 0px' }}>
					<Wallet>
						<WalletItem>Listed 3 weeks ago</WalletItem>
						<WalletItem>Listed 3 weeks ago</WalletItem>
					</Wallet>
				</Flex>
				{lookingFor && (
					<LookingForSection>
						<LookingForTitle>{t('common:looking-for')}</LookingForTitle>
						<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
							{lookingFor.map((value, index) =>
								index < lookingForItemsLimit ? (
									<Chip key={JSON.stringify(value)}>
										{value.denom
											? `${value.amount} ${value.denom}`
											: value.collectionName}{' '}
									</Chip>
								) : null
							)}
							{lookingFor?.slice(lookingForItemsLimit).length && (
								<Tooltip
									overlay={
										<div>
											{lookingFor?.slice(lookingForItemsLimit).map(item => (
												<div key={JSON.stringify(item)}>
													{item.collectionName || `${item.amount} ${item.denom}`}
												</div>
											))}
										</div>
									}
								>
									<Chip>+{lookingFor?.slice(lookingForItemsLimit).length}</Chip>
								</Tooltip>
							)}
						</Flex>
					</LookingForSection>
				)}
				<CounterOffers />
			</LayoutContainer>
		</Page>
	)
}
