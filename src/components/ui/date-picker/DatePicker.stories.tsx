import { Flex } from 'theme-ui'
import DatePicker from './DatePicker'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Date Picker',
	component: DatePicker,
}

export const DatePickerExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: '280px' }}>
			<DatePicker placeholder='Enter date' />
			<DatePicker error />
			<DatePicker disabled />
		</Flex>
	)
}
