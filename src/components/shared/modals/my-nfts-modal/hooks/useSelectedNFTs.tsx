import { uniqBy } from 'lodash'
import React from 'react'
import { NFT } from 'services/api/walletNFTsService'

export default function useSelectedNFTs(defaultSelectedNFTs) {
	const [selectedNFTs, setSelectedNFTs] =
		React.useState<NFT[]>(defaultSelectedNFTs)

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

	return {
		selectedNFTs,
		addSelectedNFT,
		removeSelectedNFT,
	}
}
