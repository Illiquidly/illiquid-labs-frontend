import { Flex } from 'theme-ui'
import SearchInput from './SearchInput'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Search Input',
	component: SearchInput,
}

export const SearchInputExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<SearchInput placeholder='Enter text' />
			<SearchInput placeholder='Error' error />
			<SearchInput placeholder='Disabled' disabled />
		</Flex>
	)
}
