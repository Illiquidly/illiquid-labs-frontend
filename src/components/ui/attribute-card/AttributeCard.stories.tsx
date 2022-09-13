// Button.stories.ts|tsx

import React from 'react'

import { Box } from 'theme-ui'

import AttributeCard from './AttributeCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'AttributeCard',
	component: AttributeCard,
}

export const CardExample = () => (
	<Box>
		<AttributeCard name='Background' value='SnowDrift' />
	</Box>
)
