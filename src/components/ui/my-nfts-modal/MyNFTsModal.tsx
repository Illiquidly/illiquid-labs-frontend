import useMyNFTs from 'hooks/useMyNFTs'
import { uniqBy } from 'lodash'
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
	NFTCardContainer,
	NFTSelectionOverlay,
} from './MyNFTsModal.styled'

interface MyNFTsModalProps extends ModalProps {
	title?: string
	addNFTsButtonLabel?: string
	onRemove: (id: string | number) => void
	selectedNFTs: NFT[]
}

function MyNFTsModal({
	isOpen,
	onRequestClose,
	title,
	addNFTsButtonLabel,
}: MyNFTsModalProps) {
	const { ownedNFTs, ownedCollections } = useMyNFTs()
	const [selectedNFTs, setSelectedNFTs] = React.useState<NFT[]>([])

	console.warn({
		ownedNFTs,
		ownedCollections,
	})

	const addSelectedNFT = (nft: NFT) => {
		setSelectedNFTs(prevState =>
			uniqBy(
				[...prevState, nft],
				({ collectionAddress, tokenId }) => `${collectionAddress}_${tokenId}`
			)
		)
	}

	const removeSelectedNFT = (nft: NFT) => {
		setSelectedNFTs(prevState =>
			prevState.filter(
				({ collectionAddress, tokenId }) =>
					!(collectionAddress === nft.collectionAddress && tokenId === nft.tokenId)
			)
		)
	}

	return (
		<Modal onRequestClose={onRequestClose} title={title} isOpen={isOpen}>
			<ModalBody>
				<Box>
					<Box sx={{ height: ['48px'], bg: 'red' }} />
					<Box sx={{ height: ['8px'] }} />
					<Flex sx={{ height: ['50px'], gap: 10 }}>
						<Box sx={{ flex: 1, bg: 'red' }} />
						<Box sx={{ flex: 1, bg: 'red' }} />
					</Flex>
					<Flex sx={{ mt: ['8px'] }}>
						<Button
							variant='gradient'
							sx={{ p: '12px 0', fontWeight: 400 }}
							fullWidth
						>
							{addNFTsButtonLabel}
						</Button>
					</Flex>
				</Box>

				<NFTCardContainer>
					{ownedNFTs.map(nft => {
						const checked = selectedNFTs.some(
							({ collectionAddress, tokenId }) =>
								collectionAddress === nft.collectionAddress && tokenId === nft.tokenId
						)

						return (
							<NFTCard
								{...nft}
								key={`${nft.collectionAddress}_${nft.tokenId}`}
								onClick={() => (checked ? removeSelectedNFT(nft) : addSelectedNFT(nft))}
								checked={checked}
							/>
						)
					})}
				</NFTCardContainer>
			</ModalBody>

			{selectedNFTs.length > 0 && (
				<NFTSelectionOverlay>
					<Flex sx={{ maxWidth: '1272px', flex: 1 }}>
						<SelectCard items={selectedNFTs} onRemove={removeSelectedNFT} />
					</Flex>
				</NFTSelectionOverlay>
			)}
		</Modal>
	)
}

MyNFTsModal.defaultProps = {
	title: 'My NFTs',
	addNFTsButtonLabel: 'Add NFTs to Trade',
}

export default MyNFTsModal
