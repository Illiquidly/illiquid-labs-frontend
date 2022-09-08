// Footer.stories.ts|tsx

import React from 'react'
import { Box, Flex } from 'theme-ui'
import ListingCard from './ListingCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'ListingCard',
	component: ListingCard,
}

export const ListingCardExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<Box as='h3'>Default Card</Box>
			<Flex sx={{ gap: 8, flex: 1, width: '345px' }}>
				<ListingCard
					verified
					description='2'
					attributes={[]}
					onLike={n => console.warn(n)}
					tokenId='Something'
					collectionAddress='Something'
					href='/listing-details/'
					nfts={[]}
					imageUrl={[
						'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
					]}
					name='Fox #7561'
					collectionName='Mutant Ape Yacht Club'
				/>
			</Flex>
		</Flex>
	)
}
