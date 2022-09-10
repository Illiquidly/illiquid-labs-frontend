// Button.stories.ts|tsx

import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import { Box } from 'theme-ui'
import { RadioCard } from './RadioCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Radio Card',
	component: RadioCard,
}

const propsData = {
	value: 'Some value',
	title: 'Title',
	subtitle: 'Subtitle',
	Image: <TradeDetailsOpenToOffers />,
}

export const RadioCardExample = () => (
	<Box>
		<RadioCard {...propsData} />
	</Box>
)
