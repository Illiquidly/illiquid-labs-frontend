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
	const [value, setValue] = React.useState('Luna')

	return (
		<Flex sx={{ width: '200px' }}>
			<Select
				value={value}
				onChange={v => setValue(v)}
				options={[
					{
						value: '',
						label: 'Select value',
					},
					{
						value: 'Luna',
						label: 'Luna',
					},
					{
						value: 'Mars',
						label: 'Mars',
					},
				]}
			/>
		</Flex>
	)
}
