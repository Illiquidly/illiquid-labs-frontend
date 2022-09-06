// Checkbox.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import Tab from './Tab'
import Tabs from './Tabs'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Tab',
	component: Tab,
}

export const SwitchExample = () => {
	const [tab, setTab] = React.useState('1')

	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: 600 }}>
			<Flex sx={{ flex: 1, maxWidth: 600, gap: '20px' }}>
				<Tabs onChange={e => setTab(e.target.value)} value={tab} name='tabs'>
					<Tab value='1'>All Listings</Tab>
					<Tab value='2'>My Listings</Tab>
				</Tabs>
			</Flex>

			<Flex sx={{ flex: 1, maxWidth: 300 }}>
				<Tabs onChange={e => setTab(e.target.value)} value={tab} name='tabs'>
					<Tab value='1'>All Listings</Tab>
					<Tab value='2'>My Listings</Tab>
				</Tabs>
			</Flex>
		</Flex>
	)
}
