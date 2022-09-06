import { useTheme } from '@emotion/react'
import { ModalCloseIcon } from 'assets/icons/modal'
import { ModalContext } from 'context/modalContext'
import useMyNFTs from 'hooks/useMyNFTs'
import { noop, uniqBy } from 'lodash'
import React, { useContext, useState } from 'react'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex, IconButton } from 'theme-ui'
import { Button } from '../button'
import { OnlyMobileAndTablet } from '../layout'
import NFTCard from '../nft-card/NFTCard'
import { SelectCard } from '../select-card'
import {
	CollectionFiltersSection,
	ModalBody,
	ModalContent,
	ModalContentHeader,
	ModalHeader,
	ModalOverlay,
	ModalTitle,
	MyNFTsBody,
	NFTCardContainer,
	NFTCardsGridWrapper,
	NFTSelectionOverlay,
	SearchContainer,
	SortSelectContainer,
} from './MyNFTsModal.styled'

export interface MyNFTsModalProps {
	title?: string
	children?: React.ReactNode
	addNFTsButtonLabel?: string
	selectedNFTs?: NFT[]
	onAddNFTs?: (v: NFT[]) => void
}

export const MyNFTsModal = ({
	title,
	addNFTsButtonLabel,
	selectedNFTs: defaultSelectedNFTs = [],
	onAddNFTs,
}: MyNFTsModalProps) => {
	const { handleModal } = useContext(ModalContext)
	const theme = useTheme()
	const { ownedNFTs } = useMyNFTs()
	const [selectedNFTs, setSelectedNFTs] =
		React.useState<NFT[]>(defaultSelectedNFTs)

	const [selectedCover, setSelectedCover] = useState<NFT>()

	React.useEffect(() => {
		setSelectedNFTs(defaultSelectedNFTs)
	}, [defaultSelectedNFTs])

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

	const handleCoverSelect = (nft: NFT) => {
		setSelectedCover(nft)
	}

	return (
		<ModalOverlay>
			<ModalHeader>
				<ModalContent>
					<Box ml='auto' mr='-12px'>
						<IconButton size='40px' onClick={() => handleModal?.(null)}>
							<ModalCloseIcon />
						</IconButton>
					</Box>
				</ModalContent>
			</ModalHeader>

			<ModalBody>
				<ModalContent>
					<Flex sx={{ flexDirection: 'column' }}>
						<ModalContentHeader>
							<Flex sx={{ width: '100%' }}>
								<ModalTitle>{title}</ModalTitle>
								<Box sx={{ ml: 'auto' }}>
									<Button
										variant='gradient'
										sx={{
											display: ['none', 'none', 'flex'],
											p: '10px 16px',
											fontWeight: 400,
										}}
										fullWidth
										disabled={!selectedNFTs.length}
										onClick={() => onAddNFTs?.(selectedNFTs)}
									>
										{addNFTsButtonLabel}
									</Button>
								</Box>
							</Flex>
							<OnlyMobileAndTablet>
								<IconButton size='40px' onClick={() => handleModal?.(null)}>
									<ModalCloseIcon fill={theme.colors.dark500} />
								</IconButton>
							</OnlyMobileAndTablet>
						</ModalContentHeader>
						<Box sx={{ marginTop: ['16px', '32px'] }}>
							<Flex sx={{ height: ['48px'], gap: '12px' }}>
								<SearchContainer />
								<SortSelectContainer />
							</Flex>
							<OnlyMobileAndTablet>
								<Box sx={{ height: ['8px'] }} />
								<Flex sx={{ height: ['50px'], gap: 10 }}>
									<Box sx={{ flex: 1, bg: 'pink' }} />
									<Box sx={{ flex: 1, bg: 'red' }} />
								</Flex>
							</OnlyMobileAndTablet>
							<Flex sx={{ mt: ['8px'], display: ['flex', 'flex', 'none'] }}>
								<Button
									variant='gradient'
									sx={{ p: '12px 0', fontWeight: 400 }}
									fullWidth
									disabled={!selectedNFTs.length}
									onClick={() => onAddNFTs?.(selectedNFTs)}
								>
									{addNFTsButtonLabel}
								</Button>
							</Flex>
						</Box>
					</Flex>
					<MyNFTsBody>
						<CollectionFiltersSection />
						<NFTCardsGridWrapper>
							<NFTCardContainer>
								{ownedNFTs.map(nft => {
									const checked = selectedNFTs.some(
										({ collectionAddress, tokenId }) =>
											collectionAddress === nft.collectionAddress &&
											tokenId === nft.tokenId
									)

									return (
										<NFTCard
											{...nft}
											isCover={selectedCover === nft}
											key={`${nft.collectionAddress}_${nft.tokenId}`}
											onCardClick={() =>
												checked ? removeSelectedNFT(nft) : addSelectedNFT(nft)
											}
											onCoverClick={e => {
												e.stopPropagation()
												handleCoverSelect(nft)
											}}
											checked={checked}
										/>
									)
								})}
							</NFTCardContainer>
						</NFTCardsGridWrapper>
					</MyNFTsBody>

					{selectedNFTs.length > 0 && (
						<NFTSelectionOverlay>
							<SelectCard
								sx={{ maxWidth: '424px' }}
								items={selectedNFTs}
								onRemove={removeSelectedNFT}
							/>
						</NFTSelectionOverlay>
					)}
				</ModalContent>
			</ModalBody>
		</ModalOverlay>
	)
}

MyNFTsModal.defaultProps = {
	onAfterOpen: noop,
	onRequestClose: noop,
	title: 'My NFTs',
	addNFTsButtonLabel: 'Add NFTs to Trade',
	selectedNFTs: [],
	onAddNFTs: noop,
}
