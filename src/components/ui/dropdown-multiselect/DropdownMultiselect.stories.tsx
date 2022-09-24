// Checkbox.stories.ts|tsx

import React from 'react'

import { Box, Flex } from 'theme-ui'
import DropdownMultiselect from './DropdownMultiselect'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'DropdownMultiselect',
	component: DropdownMultiselect,
}

export const DropdownMultiselectExample = () => {
	const [dropdownRefElement, setDropdownRefElement] =
		React.useState<HTMLDivElement | null>(null)
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
						<DropdownMultiselect
							dropdownReferenceElement={dropdownRefElement}
							label='Collections'
							options={[
								{
									label: 'Galactic Punks',
									value: 'terrra1asxzjdkasdkajhsdkahskd',
									extraLabel: '43',
								},
								{
									label: 'Skeleton Punks',
									value: 'terrra1asjsdkasdkajhsdskahskd',
									extraLabel: '46',
								},
								{
									label: 'Super Punks',
									value: 'terrra1axzssjdkasdkajhsdkahskd',
									extraLabel: '45',
								},
								{
									label: 'Galaxy Punks',
									value: 'terrra1assasjdkaadkajhsdkahskd',
									extraLabel: '44',
								},
							]}
						/>
					</Box>
					<Box sx={{ flex: 1 }}>
						<DropdownMultiselect
							dropdownReferenceElement={dropdownRefElement}
							label='A - Z'
						/>
					</Box>
				</Flex>
				<div
					ref={setDropdownRefElement}
					style={{
						width: '100%',
						height: '0px',
					}}
				/>
			</Flex>
		</Flex>
	)
}
