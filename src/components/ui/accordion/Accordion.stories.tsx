// Button.stories.ts|tsx

import { TargetIcon } from 'assets/icons/mixed'
import React from 'react'

import { Box } from 'theme-ui'
import Accordion, { AccordionTitle } from './Accordion'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Accordion',
	component: Accordion,
}

export const AccordionExample = () => (
	<Box sx={{ width: '308px' }}>
		<Accordion
			icon={<TargetIcon />}
			title={<AccordionTitle>Status</AccordionTitle>}
		>
			<div>Content</div>
		</Accordion>
	</Box>
)
