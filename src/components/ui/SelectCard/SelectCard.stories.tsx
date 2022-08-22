// Select.stories.ts|tsx

import React from 'react'

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
			id: i,
			imageUrl:
				'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
		}))
	)
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<Flex
				sx={{
					height: '160px',
					width: '424px',
				}}
			>
				<SelectCard
					items={items}
					onRemove={id =>
						setItems(prevItems => prevItems.filter(item => item.id !== id))
					}
				/>
			</Flex>
			<Flex
				sx={{
					height: '160px',
					width: '280px',
				}}
			>
				<SelectCard
					items={items}
					onRemove={id =>
						setItems(prevItems => prevItems.filter(item => item.id !== id))
					}
				/>
			</Flex>
		</Flex>
	)
}
