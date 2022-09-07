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
				currentStep={0}
				steps={[
					{
						id: 0,
						label: 'Select NFTs',
					},

					{
						id: 1,
						label: 'Trade details',
					},
					{
						id: 2,
						label: 'Choose visibility',
					},
					{
						id: 3,
						label: 'Confirm listing',
					},
				]}
			/>
		</Box>
	</Flex>
)
