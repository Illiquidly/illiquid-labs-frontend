// Button.stories.ts|tsx

import React from 'react'

import { Box, Flex } from 'reflexbox/styled-components'

import Text from './Text'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Text',
	component: Text,
}

export const Typography = () => (
	<Box>
		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={10} fontWeight='regular' color='gray900'>
					Display 2xl
				</Text>
				<Text fontSize={10} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={10} fontWeight='medium' color='gray900'>
					Display 2xl
				</Text>
				<Text fontSize={10} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={10} fontWeight='semibold' color='gray900'>
					Display 2xl
				</Text>
				<Text fontSize={10} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={10} fontWeight='bold' color='gray900'>
					Display 2xl
				</Text>
				<Text fontSize={10} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>
		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={9} fontWeight='regular' color='gray900'>
					Display xl
				</Text>
				<Text fontSize={9} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={9} fontWeight='medium' color='gray900'>
					Display xl
				</Text>
				<Text fontSize={9} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={9} fontWeight='semibold' color='gray900'>
					Display xl
				</Text>
				<Text fontSize={9} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={9} fontWeight='bold' color='gray900'>
					Display xl
				</Text>
				<Text fontSize={9} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>
		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={8} fontWeight='regular' color='gray900'>
					Display lg
				</Text>
				<Text fontSize={8} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={8} fontWeight='medium' color='gray900'>
					Display lg
				</Text>
				<Text fontSize={8} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={8} fontWeight='semibold' color='gray900'>
					Display lg
				</Text>
				<Text fontSize={8} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={8} fontWeight='bold' color='gray900'>
					Display lg
				</Text>
				<Text fontSize={8} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={7} fontWeight='regular' color='gray900'>
					Display md
				</Text>
				<Text fontSize={7} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={7} fontWeight='medium' color='gray900'>
					Display md
				</Text>
				<Text fontSize={7} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={7} fontWeight='semibold' color='gray900'>
					Display md
				</Text>
				<Text fontSize={7} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={7} fontWeight='bold' color='gray900'>
					Display md
				</Text>
				<Text fontSize={7} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={6} fontWeight='regular' color='gray900'>
					Display sm
				</Text>
				<Text fontSize={6} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={6} fontWeight='medium' color='gray900'>
					Display sm
				</Text>
				<Text fontSize={6} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={6} fontWeight='semibold' color='gray900'>
					Display sm
				</Text>
				<Text fontSize={6} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={6} fontWeight='bold' color='gray900'>
					Display sm
				</Text>
				<Text fontSize={6} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={5} fontWeight='regular' color='gray900'>
					Display xs
				</Text>
				<Text fontSize={5} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={5} fontWeight='medium' color='gray900'>
					Display xs
				</Text>
				<Text fontSize={5} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={5} fontWeight='semibold' color='gray900'>
					Display xs
				</Text>
				<Text fontSize={5} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={5} fontWeight='bold' color='gray900'>
					Display xs
				</Text>
				<Text fontSize={5} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={4} fontWeight='regular' color='gray900'>
					Text xl
				</Text>
				<Text fontSize={4} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={4} fontWeight='medium' color='gray900'>
					Text xl
				</Text>
				<Text fontSize={4} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={4} fontWeight='semibold' color='gray900'>
					Text xl
				</Text>
				<Text fontSize={4} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={4} fontWeight='bold' color='gray900'>
					Text xl
				</Text>
				<Text fontSize={4} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={3} fontWeight='regular' color='gray900'>
					Text lg
				</Text>
				<Text fontSize={3} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={3} fontWeight='medium' color='gray900'>
					Text lg
				</Text>
				<Text fontSize={3} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={3} fontWeight='semibold' color='gray900'>
					Text lg
				</Text>
				<Text fontSize={3} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={3} fontWeight='bold' color='gray900'>
					Text lg
				</Text>
				<Text fontSize={3} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={2} fontWeight='regular' color='gray900'>
					Text md
				</Text>
				<Text fontSize={2} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={2} fontWeight='medium' color='gray900'>
					Text md
				</Text>
				<Text fontSize={2} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={2} fontWeight='semibold' color='gray900'>
					Text md
				</Text>
				<Text fontSize={2} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={2} fontWeight='bold' color='gray900'>
					Text md
				</Text>
				<Text fontSize={2} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={1} fontWeight='regular' color='gray900'>
					Text sm
				</Text>
				<Text fontSize={1} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={1} fontWeight='medium' color='gray900'>
					Text sm
				</Text>
				<Text fontSize={1} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={1} fontWeight='semibold' color='gray900'>
					Text sm
				</Text>
				<Text fontSize={1} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={1} fontWeight='bold' color='gray900'>
					Text sm
				</Text>
				<Text fontSize={1} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box flex={1} mr={4}>
				<Text fontSize={0} fontWeight='regular' color='gray900'>
					Text xs
				</Text>
				<Text fontSize={0} fontWeight='regular' color='gray900'>
					Regular
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={0} fontWeight='medium' color='gray900'>
					Text xs
				</Text>
				<Text fontSize={0} fontWeight='medium' color='gray900'>
					Medium
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={0} fontWeight='semibold' color='gray900'>
					Text xs
				</Text>
				<Text fontSize={0} fontWeight='semibold' color='gray900'>
					Semibold
				</Text>
			</Box>
			<Box flex={1} mr={4}>
				<Text fontSize={0} fontWeight='bold' color='gray900'>
					Text xs
				</Text>
				<Text fontSize={0} fontWeight='bold' color='gray900'>
					Bold
				</Text>
			</Box>
		</Flex>
	</Box>
)
