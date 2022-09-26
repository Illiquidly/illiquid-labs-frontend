import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'
import { ModalCloseIcon } from 'assets/icons/modal'
import { DropdownMultiselect, Modal, MultiSelectInputOption } from 'components'
import { Button } from 'components/ui/button'
import { CheckboxCard } from 'components/ui/checkbox-card'
import { OnlyMobileAndTablet } from 'components/ui/layout'
import { NFTCard } from 'components/ui/nft-card'
import { SearchInput } from 'components/ui/fields/search-input'
import { SelectCard } from 'components/ui/select-card'
import useMyNFTs from 'hooks/useMyNFTs'
import React from 'react'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex, IconButton } from 'theme-ui'

import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { SupportedCollectionsService } from 'services/api'
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
}

export const MyNFTsModal = NiceModal.create(
	({
		title,
		addNFTsButtonLabel,
		selectedNFTs: defaultSelectedNFTs = [],
	}: MyNFTsModalProps) => {
		const wallet = useWallet()
		const modal = useModal()
		const theme = useTheme()
		const [selectedCollections, setSelectedCollections] = React.useState<
			MultiSelectInputOption[]
		>([])

		const [dropdownRefElement, setDropdownRefElement] =
			React.useState<HTMLDivElement | null>(null)
		const [searchName, setSearchName] = React.useState<string>('')

		const { ownedNFTs, ownedCollections } = useMyNFTs({
			collectionAddresses: selectedCollections.map(({ value }) => value),
			name: searchName,
		})

		const { data: verifiedCollections } = useQuery(
			['verifiedCollections'],
			async () =>
				SupportedCollectionsService.getSupportedCollections(wallet.network.name),
			{
				enabled: !!wallet.network,
				retry: true,
			}
		)

		const { selectedNFTs, addSelectedNFT, removeSelectedNFT } =
			useSelectedNFTs(defaultSelectedNFTs)

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalOverlay>
					<ModalHeader>
						<ModalContent>
							<Box ml='auto' mr='-12px'>
								<IconButton
									size='40px'
									onClick={() => {
										modal.hide()
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
												onClick={() => {
													modal.resolve(selectedNFTs)
													modal.hide()
												}}
											>
												{addNFTsButtonLabel}
											</Button>
										</Box>
									</Flex>
									<OnlyMobileAndTablet>
										<IconButton size='40px' onClick={() => modal.hide()}>
											<ModalCloseIcon fill={theme.colors.dark500} />
										</IconButton>
									</OnlyMobileAndTablet>
								</ModalContentHeader>
								<Box sx={{ marginTop: ['16px', '32px'] }}>
									<Flex sx={{ gap: '12px' }}>
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
											<DropdownMultiselect
												dropdownReferenceElement={dropdownRefElement}
												label='Collections'
												value={selectedCollections}
												onChange={collections => setSelectedCollections(collections)}
												options={ownedCollections.map(
													({ collectionName, collectionAddress }) => ({
														label: collectionName,
														value: collectionAddress,
													})
												)}
											/>
											<Box sx={{ flex: 1, bg: 'red' }} />
										</Flex>
										<div
											ref={setDropdownRefElement}
											style={{
												width: '100%',
												height: '0px',
											}}
										/>
									</OnlyMobileAndTablet>
									<Flex sx={{ mt: ['8px'], display: ['flex', 'flex', 'none'] }}>
										<Button
											variant='gradient'
											sx={{ p: '12px 0', fontWeight: 400 }}
											fullWidth
											disabled={!selectedNFTs.length}
											onClick={() => {
												modal.resolve(selectedNFTs)
												modal.hide()
											}}
										>
											{addNFTsButtonLabel}
										</Button>
									</Flex>
								</Box>
							</Flex>
							<MyNFTsBody>
								<CollectionFiltersSection>
									{ownedCollections.map(({ collectionAddress, collectionName }) => {
										const checked = selectedCollections
											.map(({ value }) => value)
											.includes(collectionAddress)

										const setCollections = prevCollectionAddresses => {
											if (checked) {
												return selectedCollections.filter(
													collection => collection.value !== collectionAddress
												)
											}
											return [
												...prevCollectionAddresses,
												{
													label: collectionName,
													value: collectionAddress,
												},
											]
										}

										return (
											<Box sx={{ flex: 1, maxHeight: '66px' }}>
												<CheckboxCard
													checked={checked}
													onChange={() => setSelectedCollections(setCollections)}
													key={collectionAddress}
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
													verified={(verifiedCollections ?? []).some(
														({ collectionAddress }) =>
															nft.collectionAddress === collectionAddress
													)}
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
			</Modal>
		)
	}
)

MyNFTsModal.defaultProps = {
	title: 'My NFTs',
	addNFTsButtonLabel: 'Add NFTs to Trade',
	selectedNFTs: [],
}
