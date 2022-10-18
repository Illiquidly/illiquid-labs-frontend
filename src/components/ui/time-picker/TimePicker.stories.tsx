import { Flex } from 'theme-ui'
import TimePicker from './TimePicker'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Time Picker',
	component: TimePicker,
}

export const TimePickerExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: '280px' }}>
			<TimePicker placeholder='Enter time' />
			<TimePicker error />
			<TimePicker disabled />
		</Flex>
	)
}
