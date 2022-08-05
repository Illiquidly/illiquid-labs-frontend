import React from 'react'
import OverflowTip from '../OverflowTooltip/OverflowTooltip'
import {
	Option,
	OptionPickerContainer,
	OptionText,
} from './OptionsPicker.styled'

interface PickedOption {
	label: string
	value: string
	enabled: boolean
}

interface OptionsPickerProps {
	options: PickedOption[]
	setOptions: (value: PickedOption[]) => void
}

function OptionsPicker({ options, setOptions }: OptionsPickerProps) {
	const onSelect = (item: PickedOption) => {
		const [defaultOption, ...newOptions] = options.map(o =>
			o.value === item.value
				? {
						...o,
						enabled: !o.enabled,
				  }
				: o
		)
		if (item.value === defaultOption.value) {
			setOptions(
				options.map(o => ({
					...o,
					enabled: !item.enabled,
				}))
			)
			return
		}

		const enabledOptions = newOptions.filter(
			x => x.value !== defaultOption.value && x.enabled
		)

		setOptions([
			{
				...defaultOption,
				enabled: enabledOptions.length === newOptions.length,
			},
			...newOptions,
		])
	}

	return (
		<OptionPickerContainer>
			{options.map(item => (
				<Option
					fullWidth
					onClick={() => onSelect(item)}
					key={item.value}
					selected={item.enabled}
				>
					<OverflowTip>
						<OptionText>{item.label}</OptionText>
					</OverflowTip>
				</Option>
			))}
		</OptionPickerContainer>
	)
}

export default OptionsPicker
