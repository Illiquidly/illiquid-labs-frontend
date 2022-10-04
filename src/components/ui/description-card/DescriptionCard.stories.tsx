// Footer.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import { DescriptionCard, DescriptionCardItem } from './DescriptionCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'DescriptionCard',
	component: DescriptionCard,
}

export const DescriptionCardExample = () => (
	<Flex sx={{ width: '100%' }}>
		<DescriptionCard>
			<DescriptionCardItem>Listed 3 weeks ago</DescriptionCardItem>
			<DescriptionCardItem>Listed 3 weeks ago</DescriptionCardItem>
		</DescriptionCard>
	</Flex>
)
