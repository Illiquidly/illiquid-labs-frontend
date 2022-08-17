// Button.stories.ts|tsx

import React from 'react'

import { Box, Flex } from 'reflexbox/styled-components'

import { ZeroCircleOutlineIcon, ThumbsUpOutlineIcon } from './index'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: '24PT Outline Icons',
}

export const Icons = () => (
	<Box>
		<Box>Signs, that can be printed</Box>
		<Flex my={2} flexWrap='wrap'>
			<Box mr={28}>
				<ZeroCircleOutlineIcon />
				<ThumbsUpOutlineIcon />
			</Box>
		</Flex>
	</Box>
)
