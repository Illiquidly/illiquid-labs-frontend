// Checkbox.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import GridSwitch from './GridSwitch'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Grid Switch',
	component: GridSwitch,
}

export const GridSwitchExample = () => {
	const [checked, setChecked] = React.useState(false)

	return (
		<Flex>
			<GridSwitch checked={checked} onChange={e => setChecked(e.target.checked)} />
		</Flex>
	)
}
