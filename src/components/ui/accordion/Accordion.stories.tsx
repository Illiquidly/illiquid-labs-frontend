// Button.stories.ts|tsx

import { TargetIcon } from 'assets/icons/mixed'
import React from 'react'

import { Box } from 'theme-ui'
import MultiSelectAccordionInput, {
	MultiSelectAccordionInputOption,
} from '../multi-select-accordion-input/MultiSelectAccordionInput'
import Accordion, { AccordionRef, AccordionTitle } from './Accordion'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Accordion',
	component: Accordion,
}

export const AccordionExample = () => {
	const accordionRef = React.useRef<AccordionRef>(null)
	const [selectedOptions, setSelectedOptions] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])
	return (
		<Box sx={{ width: '308px' }}>
			<Accordion
				ref={accordionRef}
				icon={<TargetIcon />}
				title={<AccordionTitle>Status</AccordionTitle>}
			>
				<MultiSelectAccordionInput
					dismissOnOutsideClick
					// onDismiss={() => accordionRef?.current?.close()}
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
			</Accordion>
		</Box>
	)
}
