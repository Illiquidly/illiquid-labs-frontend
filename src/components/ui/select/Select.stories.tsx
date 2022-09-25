// Select.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Select from './Select'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Select',
	component: Select,
}

export const SelectExample = () => {
	const [selected, setSelected] = React.useState('Luna')

	return (
		<Flex sx={{ width: '200px' }}>
			<Select
				selected={selected}
				options={[
					{
						value: 'Luna',
						element: 'Luna',
					},
					{
						value: 'Mars',
						element: 'Mars',
					},
				]}
				handleSelect={setSelected}
			/>
		</Flex>
	)
}
