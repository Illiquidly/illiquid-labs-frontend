// Footer.stories.ts|tsx

import React from 'react'

import { Flex, Box } from 'theme-ui'
import NFTCard from './NFTCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'NFTCard',
	component: NFTCard,
}

export const NFTCardExample = () => (
	<Flex sx={{ flexDirection: 'column', gap: 8 }}>
		<Box as='h3'>Medium/Default Card</Box>
		<Flex sx={{ gap: 8 }}>
			<NFTCard verified name='Fox #7561' collectionName='Mutant Ape Yacht Club' />
			<NFTCard
				checked
				verified
				imageUrl={[
					'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
				]}
				name='Fox #7561'
				collectionName='Mutant Ape Yacht Club'
			/>
		</Flex>
		<Box as='h3'>Small Card</Box>
		<Flex sx={{ gap: 8 }}>
			<NFTCard
				size='small'
				verified
				name='Fox #7561'
				collectionName='Mutant Ape Yacht Club'
			/>
			<NFTCard
				size='small'
				checked
				verified
				imageUrl={[
					'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
				]}
				leftActionComponent={
					<Box
						sx={{
							fontSize: '16px',
							lineHeight: '24px',
							background: 'success400',
							p: '2px 12px',
							borderRadius: '42px',
						}}
					>
						Cover
					</Box>
				}
				name='Fox #7561'
				collectionName='Mutant Ape Yacht Club'
			/>
			<NFTCard
				size='small'
				checked
				verified
				placeholderImageSize='small'
				leftActionComponent={
					<Box
						sx={{
							fontSize: '16px',
							lineHeight: '24px',
							background: 'success400',
							p: '2px 12px',
							borderRadius: '42px',
						}}
					>
						Cover
					</Box>
				}
				name='Fox #7561'
				collectionName='Mutant Ape Yacht Club'
			/>
		</Flex>
	</Flex>
)
