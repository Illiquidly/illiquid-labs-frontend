import React from 'react'
import { NFT } from 'services/api/walletNFTsService'
import { Flex, Box } from 'theme-ui'
import { Button } from '../button'
import { Modal } from '../modal'
import { ModalProps } from '../modal/Modal'
import NFTCard from '../nft-card/NFTCard'
import { SelectCard } from '../select-card'
import {
	ModalBody,
	MyNFTsBody,
	NFTCardContainer,
	NFTSelectionOverlay,
} from './MyNFTsModal.styled'

interface MyNFTsModalProps extends ModalProps {
	title?: string
	addNFTsButtonLabel?: string
	onRemove: (id: string | number) => void
	NFTs: NFT[]
	selectedNFTs: NFT[]
}

function MyNFTsModal({
	isOpen,
	onRequestClose,
	title,
	addNFTsButtonLabel,
	onRemove,
	selectedNFTs,
	NFTs,
}: MyNFTsModalProps) {
	return (
		<Modal onRequestClose={onRequestClose} title={title} isOpen={isOpen}>
			<ModalBody>
				<Box sx={{ height: ['48px'], bg: 'red' }} />
				<Box sx={{ height: ['8px'] }} />
				<Flex sx={{ height: ['50px'], gap: 10 }}>
					<Box sx={{ flex: 1, bg: 'red' }} />
					<Box sx={{ flex: 1, bg: 'red' }} />
				</Flex>
				<Flex sx={{ mt: ['8px'] }}>
					<Button variant='gradient' sx={{ p: '12px 0', fontWeight: 400 }} fullWidth>
						{addNFTsButtonLabel}
					</Button>
				</Flex>

				<MyNFTsBody>
					<NFTCardContainer>
						{NFTs.map(({ collectionAddress, tokenId, imageUrl }) => (
							<NFTCard imageUrl={imageUrl} key={`${collectionAddress}_${tokenId}`} />
						))}
					</NFTCardContainer>
				</MyNFTsBody>

				{selectedNFTs.length > 0 && (
					<NFTSelectionOverlay>
						<SelectCard
							items={selectedNFTs.map(({ collectionAddress, tokenId, imageUrl }) => ({
								id: `${collectionAddress}_${tokenId}`,
								imageUrl,
							}))}
							onRemove={onRemove}
						/>
					</NFTSelectionOverlay>
				)}
			</ModalBody>
		</Modal>
	)
}

MyNFTsModal.defaultProps = {
	title: 'My NFTs',
	addNFTsButtonLabel: 'Add NFTs to Trade',
}

export default MyNFTsModal
