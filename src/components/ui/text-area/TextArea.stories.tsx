import { Flex } from 'theme-ui'
import TextArea from './TextArea'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Text Area',
	component: TextArea,
}

export const TextAreaExample = () => {
	return (
		<Flex sx={{ flexDirection: 'column', gap: 8 }}>
			<Flex
				sx={{
					height: '160px',
					width: '280px',
				}}
			>
				<TextArea
					placeholder='Enter text'
					onChange={() => {
						// console.log(e.target.value)
					}}
				/>
			</Flex>
		</Flex>
	)
}
