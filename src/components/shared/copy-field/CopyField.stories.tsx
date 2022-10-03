// Button.stories.ts|tsx

import { Box } from 'theme-ui'
import { CopyField } from './CopyField'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'CopyField',
	component: CopyField,
}

export const CopyFieldExample = () => {
	return (
		<Box sx={{ width: '308px' }}>
			<CopyField data='https://illiquidly.io/#/explore/details/57' />
		</Box>
	)
}
