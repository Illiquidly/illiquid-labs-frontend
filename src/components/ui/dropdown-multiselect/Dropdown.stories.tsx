// Checkbox.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Dropdown from './Dropdown'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Dropdown',
	component: Dropdown,
}

export const DropdownExample = () => {
	return (
		<Flex sx={{ gap: 8, flexDirection: 'column' }}>
			<Flex sx={{ width: '168px' }}>
				<Dropdown label='Collections' />
			</Flex>
		</Flex>
	)
}
