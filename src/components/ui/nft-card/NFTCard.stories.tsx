// Footer.stories.ts|tsx

import { Box, Flex } from 'theme-ui'
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
				isCover
				imageUrl={[
					'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
				]}
				name='Fox #7561'
				collectionName='Mutant Ape Yacht Club'
			/>
			<NFTCard
				size='small'
				checked
				verified
				name='Fox #7561'
				collectionName='Mutant Ape Yacht Club'
			/>
		</Flex>
	</Flex>
)
