import { useTheme } from '@emotion/react'
import { ModalCloseIcon } from 'assets/icons/modal'
import { Button } from 'components/ui/button'
import { CheckboxCard } from 'components/ui/checkbox-card'
import { OnlyMobileAndTablet } from 'components/ui/layout'
import { NFTCard } from 'components/ui/nft-card'
import { SearchInput } from 'components/ui/search-input'
import { SelectCard } from 'components/ui/select-card'
import { ModalContext } from 'context/modalContext'
import useMyNFTs from 'hooks/useMyNFTs'
import { noop } from 'lodash'
import React, { useContext } from 'react'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex, IconButton } from 'theme-ui'
import useSelectedNFTs from './hooks/useSelectedNFTs'

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
	const [collectionAddresses, setCollectionAddresses] = React.useState<string[]>(
		[]
	)
	const [searchName, setSearchName] = React.useState<string>('')

	const { ownedNFTs, ownedCollections } = useMyNFTs({
		collectionAddresses,
		name: searchName,
	})

	const { selectedNFTs, addSelectedNFT, removeSelectedNFT } =
		useSelectedNFTs(defaultSelectedNFTs)

	return (
		<ModalOverlay>
			<ModalHeader>
				<ModalContent>
					<Box ml='auto' mr='-12px'>
						<IconButton
							size='40px'
							onClick={() => {
								handleModal?.(null)
							}}
						>
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
								<SearchContainer>
									<SearchInput
										onChange={e => setSearchName(e.target.value)}
										value={searchName}
									/>
								</SearchContainer>
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
						<CollectionFiltersSection>
							{ownedCollections.map(({ collectionAddress, collectionName }) => {
								const checked = collectionAddresses.includes(collectionAddress)

								const setCollections = prevCollectionAddresses => {
									if (checked) {
										return collectionAddresses.filter(
											address => address !== collectionAddress
										)
									}
									return [...new Set([...prevCollectionAddresses, collectionAddress])]
								}

								return (
									<Box sx={{ flex: 1, maxHeight: '66px' }}>
										<CheckboxCard
											checked={checked}
											onChange={() => setCollectionAddresses(setCollections)}
											key={`${collectionAddress}_${collectionName}`}
											title={collectionName}
										/>
									</Box>
								)
							})}
						</CollectionFiltersSection>
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
											key={`${nft.collectionAddress}_${nft.tokenId}`}
											onCardClick={() =>
												checked ? removeSelectedNFT(nft) : addSelectedNFT(nft)
											}
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
