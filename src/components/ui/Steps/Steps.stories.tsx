// Button.stories.ts|tsx

import React from 'react'

import { Flex, Box } from 'theme-ui'

import Steps from './Steps'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Steps',
	component: Steps,
}

export const ProgressCardExample = () => (
	<Flex sx={{ flexDirection: 'column', width: [244] }}>
		<Box sx={{ flex: 1 }} mb={2}>
			<Steps
				steps={[
					{
						id: 0,
						label: 'Select NFTs',
						highlighted: true,
						checked: false,
					},

					{
						id: 1,
						label: 'Trade details',
						highlighted: false,
						checked: false,
					},
					{
						id: 2,
						label: 'Choose visibility',
						highlighted: false,
						checked: false,
					},
					{
						id: 3,
						label: 'Confirm listing',
						highlighted: false,
						checked: false,
					},
				]}
			/>
		</Box>
	</Flex>
)
