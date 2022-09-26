import { Flex } from 'theme-ui'
import TextInput from './TextInputField'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Text Input Field',
	component: TextInput,
}

export const TextInputExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<TextInput placeholder='Enter text' />
			<TextInput placeholder='Error' error />
			<TextInput placeholder='Disabled' disabled />
		</Flex>
	)
}
