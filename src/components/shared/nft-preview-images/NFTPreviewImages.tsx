import styled from '@emotion/styled'
import React from 'react'
import { Img } from 'react-image'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { NFT } from 'services/api/walletNFTsService'

export const PreviewNFTsSection = styled.div`
	display: flex;
	height: 24px;
	align-items: center;
	padding-left: 4px;
	padding-right: 4px;
	overflow: hidden;
	gap: 2px;

	font-style: normal;
	font-weight: 700;
	font-size: 12px;
`

export const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	z-index: ${props => props.theme.zIndices.listingCardImg};
	position: absolute;
`

export const PreviewImage = styled(Image)`
	position: unset;
`

export const PreviewImageContainer = styled.div`
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	background: ${props => props.theme.colors.dark400};
	width: 24px;
	height: 24px;
	border-radius: 6px;
`

interface NFTPreviewImagesProps {
	nfts: NFT[]
	previewItemsLimit?: number
}

function NFTPreviewImages({
	nfts,
	previewItemsLimit = 4,
}: NFTPreviewImagesProps) {
	return (
		<PreviewNFTsSection>
			{(nfts || []).slice(0, previewItemsLimit).map(nft => (
				<PreviewImageContainer key={`${nft.collectionAddress}_${nft.tokenId}`}>
					{nft?.imageUrl?.every(img => img === '') ? (
						<ImagePlaceholder width='18px' height='18px' />
					) : (
						<PreviewImage src={nft?.imageUrl ?? []} />
					)}
				</PreviewImageContainer>
			))}

			{(nfts || []).slice(previewItemsLimit).length ? (
				<PreviewImageContainer>
					+{(nfts || []).slice(previewItemsLimit).length}
				</PreviewImageContainer>
			) : (
				''
			)}
		</PreviewNFTsSection>
	)
}

NFTPreviewImages.defaultProps = {
	previewItemsLimit: 4,
}

export default NFTPreviewImages
