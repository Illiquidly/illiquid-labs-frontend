import { noop } from 'lodash'
import React from 'react'
import CloseIcon from 'theme/icons/close.svg'
import Checkbox from 'theme/icons/checkbox.svg'
import OverflowTip from 'components/ui/OverflowTooltip/OverflowTooltip'
import { IconButton } from 'components/ui/IconButton/IconButton'
import {
	CloseContainer,
	DescriptionSection,
	Description,
	IconSection,
	Image,
	ImageContainer,
	Card,
} from './NFTPreviewCard.styled'

export interface NFT {
	contractAddress: string
	tokenId: string
	imageUrl: string[]
	collectionName: string
	name: string
	traits?: [string, string][]
}

export interface NFTPreviewCardProps {
	closable?: boolean
	verified: boolean
	nft: NFT
	onRemove?: (nft: NFT) => void
	onClick?: () => void
	disabled?: boolean
	placeholderImageUrl?: string
	children?: React.ReactNode
}

function NFTPreviewCard({
	onRemove,
	closable,
	verified,
	nft,
	onClick,
	disabled,
	placeholderImageUrl,
	children,
}: NFTPreviewCardProps) {
	return (
		<Card disabled={disabled} onClick={onClick}>
			{closable && (
				<CloseContainer>
					<IconButton padding={2} onClick={() => onRemove?.(nft)}>
						<CloseIcon fill='#fff' />
					</IconButton>
				</CloseContainer>
			)}
			<ImageContainer>
				<Image
					src={[...nft.imageUrl, placeholderImageUrl ?? '']}
					alt={placeholderImageUrl}
				/>
			</ImageContainer>

			<DescriptionSection>
				<IconSection />
				<OverflowTip>
					<Description>
						{nft.collectionName}
						<br />
						{nft.name}
					</Description>
				</OverflowTip>

				<IconSection>
					{verified && (
						<div>
							<Checkbox />
						</div>
					)}
				</IconSection>
			</DescriptionSection>
			<div>{children}</div>
		</Card>
	)
}

NFTPreviewCard.defaultProps = {
	closable: false,
	onRemove: noop,
	onClick: noop,
	disabled: false,
	placeholderImageUrl: 'https://via.placeholder.com/500/000000/000000/',
	children: noop,
}

export default NFTPreviewCard
