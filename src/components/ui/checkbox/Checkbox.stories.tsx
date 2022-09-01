// Checkbox.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Checkbox from './Checkbox'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Checkbox',
	component: Checkbox,
}

export const CheckboxExample = () => {
	const [checked, setChecked] = React.useState(true)

	return (
		<Flex sx={{ gap: 8 }}>
			<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />

			<Checkbox
				disabled
				checked={checked}
				onChange={e => setChecked(e.target.checked)}
			/>
		</Flex>
	)
}
