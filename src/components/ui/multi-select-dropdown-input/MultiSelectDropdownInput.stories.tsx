import React from 'react'
import { Box, Flex } from 'theme-ui'
import MultiSelectDropdownInput, {
	MultiSelectDropdownInputOption,
} from './MultiSelectDropdownInput'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Multi Select Dropdown Input',
	component: MultiSelectDropdownInput,
}

export const MultiSelectDropdownInputExample = () => {
	const [selectedOptions, setSelectedOptions] = React.useState<
		MultiSelectDropdownInputOption[]
	>([])

	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: 200 }}>
			<MultiSelectDropdownInput
				defaultOpen
				value={selectedOptions}
				onChange={v => setSelectedOptions(v)}
				dropdownTitle='NFT Collection'
				dismissOnOutsideClick
				options={[
					{
						label: 'Galactic Punks',
						value: 'terrra1asjdkasdkajhsdkahskd',
					},
					{
						label: 'Skeleton Punks',
						value: 'terrra1asjdkasdkajhsdskahskd',
					},
					{
						label: 'Super Punks',
						value: 'terrra1assjdkasdkajhsdkahskd',
					},
					{
						label: 'Galaxy Punks',
						value: 'terrra1assjdkaadkajhsdkahskd',
					},
				]}
				placeholder='Search collections...'
			/>
			<Flex
				sx={{
					gap: 4,
					alignItems: 'center',
					mt: ['8px'],
					overflow: 'auto',
				}}
			>
				{selectedOptions.map(({ label, value }) => (
					<Box
						sx={{
							p: '4px 12px',
							bg: 'dark400',
							borderRadius: '6px',
							whiteSpace: 'nowrap',
							fontSize: '16px',
							scrollbarWidth: 'none',
						}}
						key={value}
					>
						{label}
					</Box>
				))}
			</Flex>
			<MultiSelectDropdownInput
				disabled
				dropdownTitle='NFT Collection'
				dismissOnOutsideClick
				options={[
					{
						label: 'Galactic Punks',
						value: 'terrra1asjdkasdkajhsdkahskd',
					},
					{
						label: 'Skeleton Punks',
						value: 'terrra1asjdkasdkajhsdskahskd',
					},
					{
						label: 'Super Punks',
						value: 'terrra1assjdkasdkajhsdkahskd',
					},
					{
						label: 'Galaxy Punks',
						value: 'terrra1assjdkaadkajhsdkahskd',
					},
				]}
				placeholder='Search collections...'
			/>
		</Flex>
	)
}
