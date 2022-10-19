// Button.stories.ts|tsx

import React from 'react'

import { Box, Flex } from 'theme-ui'

import AccordionCard, {
	// AccordionCardRef,
	AccordionCardTitle,
} from './AccordionCard'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Accordion Card',
	component: AccordionCard,
}

export const AccordionCardExample = () => {
	return (
		<Box sx={{ width: '308px' }}>
			<AccordionCard
				title={<AccordionCardTitle>Terms & Conditions</AccordionCardTitle>}
			>
				<Flex sx={{ flexDirection: 'column' }}>
					<div>
						1. When a raffle is created, the NFT you have chosen will be transferred
						from your wallet into an escrow contract.
					</div>
					<div>
						2. An up-front fee (payable in $LUNA) will be taken in proportion to the
						number of tickets you are selling. This will be auto refunded if there is
						a winner.
					</div>
					<div>
						3. Raffles will proceed regardless if all tickets are sold or not.
					</div>
					<div>4. The raffle should run for a minimum of 12 hours.</div>
				</Flex>
			</AccordionCard>
		</Box>
	)
}
