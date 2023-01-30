import React from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import { OverflowTip, Tooltip } from 'components/ui'
import {
	StatusIconContainer,
	Title,
	Subtitle,
} from 'components/trade-listing-details'

import { VerifiedIcon } from 'assets/icons/16pt'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'

const DescriptionSection = styled(Flex)`
	flex-direction: column;
	margin-top: 12px;
	flex: 1;
`

function DescriptionRow({ name, isPrivate, collectionName, verified }) {
	const { t } = useTranslation()
	return (
		<DescriptionSection>
			<Flex sx={{ flex: 1 }}>
				<Flex sx={{ flex: 1 }}>
					<OverflowTip>
						<Title>{name}</Title>
					</OverflowTip>
				</Flex>
				<Flex sx={{ gap: '4px', alignItems: 'center' }}>
					{isPrivate && (
						<Tooltip overlay={<div>{t('common:private-trade')}</div>}>
							<StatusIconContainer>
								<TradeIcon />
							</StatusIconContainer>
						</Tooltip>
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
