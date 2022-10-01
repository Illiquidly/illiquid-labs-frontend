import React from 'react'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/ui'
import { Box, Flex } from 'theme-ui'

import { IconButton } from 'components/trade-listing-details'
import * as ROUTES from 'constants/routes'
import {
	DeleteOutlineIcon,
	PenOutlineIcon,
	ShareOutlineIcon,
	ArrowLeftIcon,
} from 'assets/icons/mixed'

interface TradeHeaderActionsRowProps {
	handleEditClick: () => void
	handleRemoveClick: () => void
	isMyTradeListing: boolean
}

export const TradeHeaderActionsRow = ({
	handleEditClick,
	handleRemoveClick,
	isMyTradeListing,
}: TradeHeaderActionsRowProps) => {
	const { t } = useTranslation(['common', 'trade-listings'])

	return (
		<Flex
			sx={{
				mt: ['12.5px', '24px', '22px'],
				flex: 1,
				justifyContent: 'space-between',
			}}
		>
			<Flex
				sx={{
					justifyContent: 'flex-start',
				}}
			>
				<Button
					href={ROUTES.TRADE_LISTINGS}
					sx={{ height: '40px', padding: '13px' }}
					variant='secondary'
					startIcon={<ArrowLeftIcon />}
				>
					{t('trade-listings:back-to-listings')}
				</Button>
			</Flex>
			{isMyTradeListing && (
				<Flex
					sx={{
						gap: '6px',
						justifyContent: 'flex-end',
					}}
				>
					<IconButton onClick={handleEditClick}>
						<PenOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:edit')}
						</Box>
					</IconButton>
					<IconButton onClick={handleRemoveClick}>
						<DeleteOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:remove')}
						</Box>
					</IconButton>
					<IconButton>
						<ShareOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:share')}
						</Box>
					</IconButton>
				</Flex>
			)}
		</Flex>
	)
}

export default TradeHeaderActionsRow
