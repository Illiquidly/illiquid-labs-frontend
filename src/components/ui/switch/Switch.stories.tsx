// Checkbox.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Switch from './Switch'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Switch',
	component: Switch,
}

export const SwitchExample = () => {
	const [checked, setChecked] = React.useState(true)

	return (
		<Flex>
			<Switch checked={checked} onChange={e => setChecked(e.target.checked)} />
		</Flex>
	)
}
