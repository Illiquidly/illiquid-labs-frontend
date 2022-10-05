import React from 'react'

import {
	RightTopImageArea,
	LikeIconContainer,
	ImageSection,
	Image,
} from 'components/trade-listing-details'

import { HeartFilledIcon, HeartIcon } from 'assets/icons/mixed'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { NFT } from 'services/api/walletNFTsService'

interface ImageRowProps extends Partial<NFT> {
	liked?: boolean
	nft?: NFT
	onLike: (nft?: NFT) => void
}

export const ImageRow = ({ imageUrl, nft, onLike, liked }: ImageRowProps) => {
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
					onLike(nft)
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
		</ImageSection>
	)
}

ImageRow.defaultProps = {
	liked: false,
	nft: undefined,
}

export default ImageRow
