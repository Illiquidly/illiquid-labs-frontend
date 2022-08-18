// Button.stories.ts|tsx

import React from 'react'

import { Box, Flex, Text } from 'theme-ui'

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
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='display2xlRegular'>
					Display 2xl
				</Text>
				<Text as='div' variant='display2xlRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='display2xlMedium'>
					Display 2xl
				</Text>
				<Text as='div' variant='display2xlMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='display2xlSemibold'>
					Display 2xl
				</Text>
				<Text as='div' variant='display2xlSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='display2xlBold'>
					Display 2xl
				</Text>
				<Text as='div' variant='display2xlBold'>
					Bold
				</Text>
			</Box>
		</Flex>
		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXlRegular'>
					Display xl
				</Text>
				<Text as='div' variant='displayXlRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXlMedium'>
					Display xl
				</Text>
				<Text as='div' variant='displayXlMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXlSemibold'>
					Display xl
				</Text>
				<Text as='div' variant='displayXlSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXlBold'>
					Display xl
				</Text>
				<Text as='div' variant='displayXlBold'>
					Bold
				</Text>
			</Box>
		</Flex>
		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayLgRegular'>
					Display lg
				</Text>
				<Text as='div' variant='displayLgRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayLgMedium'>
					Display lg
				</Text>
				<Text as='div' variant='displayLgMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayLgSemibold'>
					Display lg
				</Text>
				<Text as='div' variant='displayLgSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayLgBold'>
					Display lg
				</Text>
				<Text as='div' variant='displayLgBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayMdRegular'>
					Display md
				</Text>
				<Text as='div' variant='displayMdRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayMdMedium'>
					Display md
				</Text>
				<Text as='div' variant='displayMdMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayMdSemibold'>
					Display md
				</Text>
				<Text as='div' variant='displayMdSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayMdBold'>
					Display md
				</Text>
				<Text as='div' variant='displayMdBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displaySmRegular'>
					Display sm
				</Text>
				<Text as='div' variant='displaySmRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displaySmMedium'>
					Display sm
				</Text>
				<Text as='div' variant='displaySmMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displaySmSemibold'>
					Display sm
				</Text>
				<Text as='div' variant='displaySmSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displaySmBold'>
					Display sm
				</Text>
				<Text as='div' variant='displaySmBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXsRegular'>
					Display xs
				</Text>
				<Text as='div' variant='displayXsRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXsMedium'>
					Display xs
				</Text>
				<Text as='div' variant='displayXsMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXsSemibold'>
					Display xs
				</Text>
				<Text as='div' variant='displayXsSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='displayXsBold'>
					Display xs
				</Text>
				<Text as='div' variant='displayXsBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXlRegular'>
					Text xl
				</Text>
				<Text as='div' variant='textXlRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXlMedium'>
					Text xl
				</Text>
				<Text as='div' variant='textXlMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXlSemibold'>
					Text xl
				</Text>
				<Text as='div' variant='textXlSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXlBold'>
					Text xl
				</Text>
				<Text as='div' variant='textXlBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textLgRegular'>
					Text lg
				</Text>
				<Text as='div' variant='textLgRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textLgMedium'>
					Text lg
				</Text>
				<Text as='div' variant='textLgMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textLgSemibold'>
					Text lg
				</Text>
				<Text as='div' variant='textLgSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textLgBold'>
					Text lg
				</Text>
				<Text as='div' variant='textLgBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textMdRegular'>
					Text md
				</Text>
				<Text as='div' variant='textMdRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textMdMedium'>
					Text md
				</Text>
				<Text as='div' variant='textMdMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textMdSemibold'>
					Text md
				</Text>
				<Text as='div' variant='textMdSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textMdBold'>
					Text md
				</Text>
				<Text as='div' variant='textMdBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textSmRegular'>
					Text sm
				</Text>
				<Text as='div' variant='textSmRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textSmMedium'>
					Text sm
				</Text>
				<Text as='div' variant='textSmMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textSmSemibold'>
					Text sm
				</Text>
				<Text as='div' variant='textSmSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textSmBold'>
					Text sm
				</Text>
				<Text as='div' variant='textSmBold'>
					Bold
				</Text>
			</Box>
		</Flex>

		<Flex mb={4}>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXsRegular'>
					Text xs
				</Text>
				<Text as='div' variant='textXsRegular'>
					Regular
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXsMedium'>
					Text xs
				</Text>
				<Text as='div' variant='textXsMedium'>
					Medium
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXsSemibold'>
					Text xs
				</Text>
				<Text as='div' variant='textXsSemibold'>
					Semibold
				</Text>
			</Box>
			<Box sx={{ flex: 1 }}>
				<Text as='div' variant='textXsBold'>
					Text xs
				</Text>
				<Text as='div' variant='textXsBold'>
					Bold
				</Text>
			</Box>
		</Flex>
	</Box>
)
