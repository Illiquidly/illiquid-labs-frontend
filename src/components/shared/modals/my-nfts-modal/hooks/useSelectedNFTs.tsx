import React from 'react'
import { NFT } from 'services/api/walletNFTsService'

export default function useSelectedNFTs(defaultSelectedNFTs) {
	const [selectedNFTs, setSelectedNFTs] =
		React.useState<NFT[]>(defaultSelectedNFTs)

	const addSelectedNFT = (nft: NFT) => {
		setSelectedNFTs(prevNFTs => [...prevNFTs, nft])
	}

	const removeSelectedNFT = (nft: NFT) => {
		setSelectedNFTs(prevState =>
			prevState.filter(
				({ collectionAddress, tokenId }) =>
					!(collectionAddress === nft.collectionAddress && tokenId === nft.tokenId)
			)
		)
	}

	return {
		selectedNFTs,
		addSelectedNFT,
		removeSelectedNFT,
	}
}
