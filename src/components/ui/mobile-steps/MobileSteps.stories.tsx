// Button.stories.ts|tsx

import React from 'react'

import { Flex, Box } from 'theme-ui'

import MobileSteps from './MobileSteps'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Mobile Steps',
	component: MobileSteps,
}

export const MobileStepsExample = () => (
	<Flex sx={{ flexDirection: 'column', width: [187.5, 309] }}>
		<Box sx={{ flex: 1 }} mb={2}>
			<MobileSteps
				steps={[
					{
						id: 0,
						label: 'Select NFTs',
						checked: false,
						highlighted: true,
					},

					{
						id: 1,
						label: 'Trade details',
						checked: false,
						highlighted: false,
					},
					{
						id: 2,
						label: 'Choose visibility',
						checked: false,
						highlighted: false,
					},
					{
						id: 3,
						label: 'Confirm listing',
						checked: false,
						highlighted: false,
					},
				]}
			/>
		</Box>
	</Flex>
)
