// Button.stories.ts|tsx

import { Box } from 'theme-ui'
import { CloseIcon } from './CloseIcon'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Close Icon',
}

export const Icons = () => (
	<Box>
		<CloseIcon />
	</Box>
)
