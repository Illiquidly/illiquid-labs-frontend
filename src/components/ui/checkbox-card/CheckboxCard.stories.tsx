// Button.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'

import CheckboxCard from './CheckboxCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Checkbox Card',
	component: CheckboxCard,
}

export const CheckboxCardExample = () => {
	const [checked, setChecked] = React.useState(false)

	return (
		<Flex sx={{ width: '280px' }}>
			<CheckboxCard
				checked={checked}
				onChange={e => setChecked(e.target.checked)}
				title='Bored Ape'
				extra='43'
			/>
		</Flex>
	)
}
