// Select.stories.ts|tsx

import React from 'react'
import { NFT } from 'services/api/walletNFTsService'

import { Flex } from 'theme-ui'
import SelectCard from './SelectCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Select Card',
	component: SelectCard,
}

export const SelectExample = () => {
	const [items, setItems] = React.useState(
		Array.from({ length: 10 }).map((_, i) => ({
			tokenId: `${i}`,
			collectionAddress: `${i}`,
			collectionName: 'TEST',
			name: 'TEST',
			description: 'TEST',
			imageUrl: [
				'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
			],
		}))
	)

	const removeSelectedNFT = (nft: NFT) => {
		setItems(prevState =>
			prevState.filter(
				({ collectionAddress, tokenId }) =>
					!(collectionAddress === nft.collectionAddress && tokenId === nft.tokenId)
			)
		)
	}

	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<Flex
				sx={{
					height: '160px',
					width: '280px',
				}}
			>
				<SelectCard items={items} onRemove={removeSelectedNFT} />
			</Flex>
		</Flex>
	)
}
