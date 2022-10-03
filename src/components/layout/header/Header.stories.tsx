// Footer.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Header from './Header'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Header',
	component: Header,
}

export const HeaderExample = () => (
	<Flex
		sx={{
			height: '286.89px',
			width: '1440px',
		}}
	>
		<Header />
	</Flex>
)
