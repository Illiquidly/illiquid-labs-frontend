import { Flex } from 'theme-ui'
import MultiSelectInput from './MultiSelectInput'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Multi Select Input',
	component: MultiSelectInput,
}

export const TextInputExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<MultiSelectInput
				onChange={e => console.warn(e.target.value)}
				placeholder='Enter text'
			/>
		</Flex>
	)
}
