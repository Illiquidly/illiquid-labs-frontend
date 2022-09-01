// Checkbox.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Radio from './Radio'
import RadioInputGroupProvider from './RadioInputGroupProvider'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Radio',
	component: Radio,
}

export const RadioExample = () => {
	const [value, setValue] = React.useState('1')

	return (
		<Flex sx={{ gap: 8 }}>
			<RadioInputGroupProvider
				name='index'
				value={value}
				onChange={e => setValue(e.target.value)}
			>
				<Radio value='1' />
				<Radio value='2' />
				<Radio value='3' disabled />
			</RadioInputGroupProvider>
		</Flex>
	)
}
