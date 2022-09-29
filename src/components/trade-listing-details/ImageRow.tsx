import React from 'react'

import {
	RightTopImageArea,
	LikeIconContainer,
	PreviewNFTsSection,
	PreviewImageContainer,
	PreviewImage,
	ImageSection,
	BottomImageArea,
	Image,
} from 'components/trade-listing-details'

import { HeartFilledIcon, HeartIcon } from 'assets/icons/mixed'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'

export const ImageRow = ({
	nfts,
	imageUrl,
	NFTProps,
	onLike,
	liked,
	previewItemsLimit = 3,
}) => {
	return (
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
	)
}

export default ImageRow
