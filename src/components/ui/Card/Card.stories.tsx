// Button.stories.ts|tsx

import React from 'react'

import { Box } from 'reflexbox/styled-components'

import Card from './Card'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Card',
	component: Card,
}

export const CardExample = () => (
	<Box>
		<Card>
			<Box p='12px'>Primary</Box>
		</Card>
	</Box>
)
