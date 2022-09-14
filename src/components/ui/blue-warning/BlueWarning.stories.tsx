// Footer.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import BlueWarning from './BlueWarning'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'BlueWarning',
	component: BlueWarning,
}

export const BlueWarningExample = () => (
	<Flex sx={{ width: '100%' }}>
		<BlueWarning sx={{ width: '100%', height: '49px' }}>
			This is blue warning
		</BlueWarning>
	</Flex>
)
