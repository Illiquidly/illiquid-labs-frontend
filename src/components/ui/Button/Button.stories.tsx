// Button.stories.ts|tsx

import React from 'react'

import { Box, Flex } from 'theme-ui'
import { Button } from 'components/ui/button'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Button',
	component: Button,
}

export const Primary = () => (
	<Box>
		<Box my={2}>
			<Button variant='primary'>Primary</Button>
		</Box>

		<Box my={2}>
			<Button variant='primary' disabled>
				Disabled
			</Button>
		</Box>

		<Flex my={2} sx={{ flexWrap: 'wrap' }}>
			<Box mr={2}>
				<Button variant='primary' size='small'>
					Small Button
				</Button>
			</Box>
			<Box mx={2}>
				<Button variant='primary' size='medium'>
					Default Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='primary' size='large'>
					Large Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='primary' size='extraLarge'>
					Extra Large Button
				</Button>
			</Box>
		</Flex>
	</Box>
)

export const Secondary = () => (
	<Box>
		<Box my={2}>
			<Button variant='secondary'>Secondary</Button>
		</Box>

		<Box my={2}>
			<Button variant='secondary' disabled>
				Disabled
			</Button>
		</Box>

		<Flex my={2} sx={{ flexWrap: 'wrap' }}>
			<Box mr={2}>
				<Button variant='secondary' size='small'>
					Small Button
				</Button>
			</Box>
			<Box mx={2}>
				<Button variant='secondary' size='medium'>
					Default Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='secondary' size='large'>
					Large Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='secondary' size='extraLarge'>
					Extra Large Button
				</Button>
			</Box>
		</Flex>
	</Box>
)

export const Ghost = () => (
	<Box>
		<Box my={2}>
			<Button variant='ghost'>Ghost</Button>
		</Box>

		<Box my={2}>
			<Button variant='ghost' disabled>
				Disabled
			</Button>
		</Box>

		<Flex my={2} sx={{ flexWrap: 'wrap' }}>
			<Box mr={2}>
				<Button variant='ghost' size='small'>
					Small Button
				</Button>
			</Box>
			<Box mx={2}>
				<Button variant='ghost' size='medium'>
					Default Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='ghost' size='large'>
					Large Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='ghost' size='extraLarge'>
					Extra Large Button
				</Button>
			</Box>
		</Flex>
	</Box>
)

export const Destructive = () => (
	<Box>
		<Box my={2}>
			<Button variant='destructive'>Destructive</Button>
		</Box>

		<Box my={2}>
			<Button variant='destructive' disabled>
				Disabled
			</Button>
		</Box>

		<Flex my={2} sx={{ flexWrap: 'wrap' }}>
			<Box mr={2}>
				<Button variant='destructive' size='small'>
					Small Button
				</Button>
			</Box>
			<Box mx={2}>
				<Button variant='destructive' size='medium'>
					Default Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='destructive' size='large'>
					Large Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='destructive' size='extraLarge'>
					Extra Large Button
				</Button>
			</Box>
		</Flex>
	</Box>
)

export const Dark = () => (
	<Box>
		<Box my={2}>
			<Button variant='dark'>Dark</Button>
		</Box>

		<Box my={2}>
			<Button variant='dark' disabled>
				Disabled
			</Button>
		</Box>

		<Flex my={2} sx={{ flexWrap: 'wrap' }}>
			<Box mr={2}>
				<Button variant='dark' size='small'>
					Small Button
				</Button>
			</Box>
			<Box mx={2}>
				<Button variant='dark' size='medium'>
					Default Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='dark' size='large'>
					Large Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='dark' size='extraLarge'>
					Extra Large Button
				</Button>
			</Box>
		</Flex>
	</Box>
)

export const Gradient = () => (
	<Box>
		<Box my={2}>
			<Button variant='gradient'>Gradient</Button>
		</Box>

		<Box my={2}>
			<Button variant='gradient' disabled>
				Disabled
			</Button>
		</Box>

		<Flex my={2} sx={{ flexWrap: 'wrap' }}>
			<Box mr={2}>
				<Button variant='gradient' size='small'>
					Small Button
				</Button>
			</Box>
			<Box mx={2}>
				<Button variant='gradient' size='medium'>
					Default Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='gradient' size='large'>
					Large Button
				</Button>
			</Box>

			<Box mx={2}>
				<Button variant='gradient' size='extraLarge'>
					Extra Large Button
				</Button>
			</Box>
		</Flex>
	</Box>
)
