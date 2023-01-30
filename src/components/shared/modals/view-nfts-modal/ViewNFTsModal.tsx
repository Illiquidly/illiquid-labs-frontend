import React from 'react'
import { useTranslation } from 'next-i18next'
import { uniqBy } from 'lodash'
import { Box, Flex, IconButton } from 'theme-ui'
import { useWallet } from '@terra-money/use-wallet'
import { useQuery } from '@tanstack/react-query'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'
import { ModalCloseIcon } from 'assets/icons/modal'
import {
	CheckboxCard,
	DropdownMultiselect,
	Modal,
	MultiSelectInputOption,
	SearchInput,
} from 'components/ui'

import { OnlyMobileAndTablet } from 'components/layout/layout'

import { NFT } from 'services/api/walletNFTsService'

import { SupportedCollectionsService } from 'services/api/supportedCollectionsService'
import { VERIFIED_COLLECTIONS } from 'constants/useQueryKeys'
import { NFTCard } from 'components/shared/nft-card'
import {
	FiltersSection,
	ModalBody,
	ModalContent,
	ModalContentHeader,
	ModalHeader,
	ModalOverlay,
	ModalTitle,
	NFTCardsGrid,
	SearchContainer,
} from './ViewNFTsModal.styled'

export interface ViewNFTsModalProps {
	title?: string
	children?: React.ReactNode
	nfts: NFT[]
}

export interface ViewNFTsModalResult {
	nft: NFT
}

export const ViewNFTsModal = NiceModal.create(
	({ title, nfts }: ViewNFTsModalProps) => {
		const { t } = useTranslation()
		const modal = useModal()
		const theme = useTheme()
		const wallet = useWallet()

		const { data: verifiedCollections } = useQuery(
			[VERIFIED_COLLECTIONS],
			async () =>
				SupportedCollectionsService.getSupportedCollections(wallet.network.name),
			{
				enabled: !!wallet.network,
				retry: true,
			}
		)

		const availableCollections = uniqBy(nfts, col => col.collectionAddress)

		const [selectedCollections, setSelectedCollections] = React.useState<
			MultiSelectInputOption[]
		>([])

		const [dropdownRefElement, setDropdownRefElement] =
			React.useState<HTMLDivElement | null>(null)
		const [searchName, setSearchName] = React.useState<string>('')

		const filteredNFTs = nfts.filter(
			nft =>
				(selectedCollections.length
					? selectedCollections
							.map(({ value }) => value)
							.includes(nft.collectionAddress)
					: true) &&
				(searchName
					? (nft?.name || '').toLowerCase().match(`${searchName.toLowerCase()}.*`)
					: true)
		)

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalOverlay>
					<ModalHeader>
						<ModalContent>
							<Box ml='auto' mr='-12px'>
								<IconButton size='40px' onClick={modal.hide}>
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
									</Flex>
									<OnlyMobileAndTablet>
										<IconButton size='40px' onClick={modal.hide}>
											<ModalCloseIcon fill={theme.colors.dark500} />
										</IconButton>
									</OnlyMobileAndTablet>
								</ModalContentHeader>
							</Flex>

							<Flex
								sx={{
									overflow: 'auto',
									marginTop: ['16px', '32px'],
									pr: ['10px', '10px', 0],
									flexDirection: 'column',
									flex: 1,
								}}
							>
								<Flex sx={{ flexDirection: 'column', height: '100%' }}>
									<Flex sx={{ gap: '12px', minHeight: ['50px'], pr: [0, 0, '10px'] }}>
										<SearchContainer>
											<SearchInput
												onChange={e => setSearchName(e.target.value)}
												value={searchName}
												placeholder={t('common:search')}
											/>
										</SearchContainer>
									</Flex>
									<OnlyMobileAndTablet>
										<Box sx={{ height: ['8px'] }} />
										<Flex sx={{ height: ['50px'], gap: 10 }}>
											<DropdownMultiselect
												dropdownReferenceElement={dropdownRefElement}
												label='Collections'
												value={selectedCollections}
												onChange={collections => setSelectedCollections(collections)}
												options={availableCollections.map(
													({ collectionAddress, collectionName }) => ({
														label: collectionName,
														value: collectionAddress,
													})
												)}
											/>
										</Flex>
										<div
											ref={setDropdownRefElement}
											style={{
												width: '100%',
												height: '0px',
											}}
										/>
									</OnlyMobileAndTablet>

									<Flex
										sx={{
											mt: ['16px', '32px', '36px'],
											gap: '34px',
											overflow: ['initial', 'initial', 'auto'],
										}}
									>
										<FiltersSection>
											{availableCollections.map(
												({ collectionAddress, collectionName }) => {
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
														<Box key={collectionAddress} sx={{ flex: 1, maxHeight: '66px' }}>
															<CheckboxCard
																checked={checked}
																onChange={() => setSelectedCollections(setCollections)}
																title={collectionName}
															/>
														</Box>
													)
												}
											)}
										</FiltersSection>

										<Flex
											sx={{
												overflow: ['initial', 'initial', 'auto'],
												pr: [0, 0, '10px'],
												width: '100%',
											}}
										>
											<NFTCardsGrid>
												{filteredNFTs.map(nft => {
													return (
														<Box key={`${nft.collectionAddress}_${nft.tokenId}`}>
															<NFTCard
																{...nft}
																verified={(verifiedCollections ?? []).some(
																	({ collectionAddress }) =>
																		nft.collectionAddress === collectionAddress
																)}
																onCardClick={() => {
																	modal.resolve({
																		nft,
																	})
																	modal.remove()
																}}
																checked={false}
															/>
														</Box>
													)
												})}
											</NFTCardsGrid>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						</ModalContent>
					</ModalBody>
				</ModalOverlay>
			</Modal>
		)
	}
)

ViewNFTsModal.defaultProps = {
	title: 'All NFTs',
}
