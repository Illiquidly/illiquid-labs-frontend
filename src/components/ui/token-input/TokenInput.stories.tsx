import { Flex } from 'theme-ui'
import TokenInput from './TokenInput'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Token Input',
	component: TokenInput,
}

export const TokenInputExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: '280px' }}>
			<TokenInput placeholder='Enter text' />
			<TokenInput placeholder='Error' error />
			<TokenInput placeholder='Disabled' disabled />
		</Flex>
	)
}
