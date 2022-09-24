// Select.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import SelectChip from './SelectChip'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Select Chip',
	component: SelectChip,
}

export const SelectExample = () => {
	const [removed, setRemoved] = React.useState(false)

	const remove = () => {
		setRemoved(false)
	}

	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			{!removed && <SelectChip item='DeGod' onRemove={remove} />}
		</Flex>
	)
}
