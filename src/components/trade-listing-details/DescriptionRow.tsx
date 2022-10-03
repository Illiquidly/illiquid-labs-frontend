import React from 'react'

import { OverflowTip } from 'components/ui'
import { Box, Flex } from 'theme-ui'

import {
	StatusIconContainer,
	DescriptionSection,
	Title,
	Subtitle,
} from 'components/trade-listing-details'

import { VerifiedIcon } from 'assets/icons/16pt'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'

export const DescriptionRow = ({
	name,
	isPrivate,
	collectionName,
	verified,
}) => {
	return (
		<DescriptionSection>
			<Flex>
				<Flex sx={{ flex: 1 }}>
					<OverflowTip>
						<Title>{name}</Title>
					</OverflowTip>
				</Flex>
				<Flex sx={{ gap: '4px' }}>
					{isPrivate && (
						<StatusIconContainer>
							<TradeIcon />
						</StatusIconContainer>
					)}
				</Flex>
			</Flex>
			<Flex>
				<OverflowTip>
					<Subtitle>{collectionName}</Subtitle>
				</OverflowTip>
				{verified && (
					<Box ml={['4px']} mt='6px'>
						<VerifiedIcon width='17.27px' height='17.27px' />
					</Box>
				)}
			</Flex>
		</DescriptionSection>
	)
}

export default DescriptionRow
