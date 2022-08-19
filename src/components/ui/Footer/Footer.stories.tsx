// Footer.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Footer from './Footer'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Footer',
	component: Footer,
}

export const FooterExample = () => (
	<Flex
		sx={{
			height: '286.89px',
			width: '1440px',
		}}
	>
		<Footer />
	</Flex>
)
