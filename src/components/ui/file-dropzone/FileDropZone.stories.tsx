// Checkbox.stories.ts|tsx

import React from 'react'

import { Box, Flex } from 'theme-ui'
import FileDropZone from './FileDropZone'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'FileDropZone',
	component: FileDropZone,
}

export const FileDropZoneExample = () => {
	return (
		<Flex sx={{ gap: 8, flexDirection: 'column' }}>
			<Flex
				sx={{
					p: '8px 8px',
					width: '348px',
					bg: 'red',
					height: '758px',
					flexDirection: 'column',
				}}
			>
				<Flex sx={{ gap: 8 }}>
					<Box sx={{ flex: 1 }}>
						<FileDropZone />
					</Box>
				</Flex>
			</Flex>
		</Flex>
	)
}
