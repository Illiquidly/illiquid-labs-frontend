// Button.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'

import Loader from './Loader'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Loader',
	component: Loader,
}

export const LoaderExample = () => (
	<Flex
		sx={{
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			width: [187.5],
			height: [309],
		}}
	>
		<Loader loadingText='loading...' />
	</Flex>
)
