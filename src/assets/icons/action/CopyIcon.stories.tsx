// Button.stories.ts|tsx

import { Box } from 'theme-ui'
import { CopyIcon } from './CopyIcon'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Copy Icon',
}

export const Icons = () => (
	<Box>
		<CopyIcon />
	</Box>
)
