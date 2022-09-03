// Footer.stories.ts|tsx

import React from 'react'
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

export const NFTCardExample = () => {
	const [isCover, setCover] = React.useState(1)
	const [activeCard, setActiveCard] = React.useState(1)
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<Box as='h3'>Medium/Default Card</Box>
			<Flex sx={{ gap: 8 }}>
				<NFTCard
					checked={activeCard === 1}
					isCover={isCover === 1}
					onCoverClick={() => setCover(1)}
					onCardClick={() => setActiveCard(1)}
					verified
					imageUrl={[
						'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
					]}
					name='Fox #7561'
					collectionName='Mutant Ape Yacht Club'
				/>
				<NFTCard
					checked={activeCard === 2}
					isCover={isCover === 2}
					onCoverClick={() => setCover(2)}
					onCardClick={() => setActiveCard(2)}
					verified
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
					checked={activeCard === 1}
					isCover={isCover === 1}
					onCoverClick={() => setCover(1)}
					onCardClick={() => setActiveCard(1)}
				/>
				<NFTCard
					size='small'
					checked={activeCard === 2}
					isCover={isCover === 2}
					onCoverClick={() => setCover(2)}
					onCardClick={() => setActiveCard(2)}
					verified
					imageUrl={[
						'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
					]}
					name='Fox #7561'
					collectionName='Mutant Ape Yacht Club'
				/>
				<NFTCard
					checked={activeCard === 3}
					isCover={isCover === 3}
					onCoverClick={() => setCover(3)}
					onCardClick={() => setActiveCard(3)}
					size='small'
					verified
					name='Fox #7561'
					collectionName='Mutant Ape Yacht Club'
				/>
			</Flex>
		</Flex>
	)
}
