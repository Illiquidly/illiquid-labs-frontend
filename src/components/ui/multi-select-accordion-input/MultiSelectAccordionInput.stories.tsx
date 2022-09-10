import React from 'react'
import { Box, Flex } from 'theme-ui'
import MultiSelectAccordionInput, {
	MultiSelectAccordionInputOption,
} from './MultiSelectAccordionInput'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Multi Select Accordion Input',
	component: MultiSelectAccordionInput,
}

export const MultiSelectAccordionInputExample = () => {
	const [selectedOptions, setSelectedOptions] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: 308 }}>
			<MultiSelectAccordionInput
				dismissOnOutsideClick
				onDismiss={() => console.warn('dismiss')}
				value={selectedOptions}
				onChange={v => setSelectedOptions(v)}
				accordionTitle='NFT Collection'
				options={[
					{
						label: 'Galactic Punks',
						value: 'terrra1asjdkasdkajhsdkahskd',
						extraLabel: '43',
					},
					{
						label: 'Skeleton Punks',
						value: 'terrra1asjdkasdkajhsdskahskd',
						extraLabel: '43',
					},
					{
						label: 'Super Punks',
						value: 'terrra1assjdkasdkajhsdkahskd',
						extraLabel: '43',
					},
					{
						label: 'Galaxy Punks',
						value: 'terrra1assjdkaadkajhsdkahskd',
						extraLabel: '43',
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
		</Flex>
	)
}
