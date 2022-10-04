// Button.stories.ts|tsx

import React from 'react'

import { Box, Flex } from 'theme-ui'

import { BackTrackIcon, ArrowShapeRightOutlineIcon } from './index'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: '20PT Outline Icons',
}

export const Icons = () => (
	<Box>
		<Flex my={2} sx={{ flexWrap: 'wrap' }}>
			<Box mr={28}>
				<BackTrackIcon />
				<ArrowShapeRightOutlineIcon />
			</Box>
		</Flex>
	</Box>
)
