// Footer.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import { Wallet, WalletItem } from './Wallet'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Wallet',
	component: Wallet,
}

export const WalletExample = () => (
	<Flex sx={{ width: '100%' }}>
		<Wallet>
			<WalletItem>Listed 3 weeks ago</WalletItem>
			<WalletItem>Listed 3 weeks ago</WalletItem>
		</Wallet>
	</Flex>
)
