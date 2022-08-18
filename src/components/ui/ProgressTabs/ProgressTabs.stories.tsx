// Button.stories.ts|tsx

import React from 'react'

import { Flex, Box } from 'reflexbox/styled-components'

import ProgressTabs from './ProgressTabs'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Progress Tabs',
	component: ProgressTabs,
}

export const ProgressTabsExample = () => (
	<Flex flexDirection='column' width={[187.5, 309]}>
		<Box flex={1} mb={2}>
			<ProgressTabs currentStep={1} steps={4} />
		</Box>

		<Box flex={1} mb={2}>
			<ProgressTabs currentStep={2} steps={4} />
		</Box>

		<Box flex={1} mb={2}>
			<ProgressTabs currentStep={3} steps={4} />
		</Box>
		<Box flex={1} mb={2}>
			<ProgressTabs currentStep={4} steps={4} />
		</Box>
	</Flex>
)
