import { Badge, OverflowTip } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { RAFFLE_STATE } from 'services/api/rafflesService'
import { Flex } from 'theme-ui'

export default function RaffleStateBadge({
	raffleState,
}: {
	raffleState: RAFFLE_STATE
}) {
	const { t } = useTranslation()
	const badge = {
		[RAFFLE_STATE.Started]: {
			bg: 'primary200',
			translation: 'common:started',
		},
		[RAFFLE_STATE.Cancelled]: {
			bg: 'error200',
			translation: 'common:cancelled',
		},
		[RAFFLE_STATE.Claimed]: {
			bg: 'success200',
			translation: 'common:claimed',
		},
		[RAFFLE_STATE.Closed]: {
			bg: 'warning200',
			translation: 'common:closed',
		},
		[RAFFLE_STATE.Finished]: {
			bg: 'success200',
			translation: 'common:finished',
		},
		[RAFFLE_STATE.Created]: {
			bg: 'primary200',
			translation: 'common:created',
		},
	}[raffleState]

	return (
		<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
			<OverflowTip>
				<Badge bg={badge.bg}>{t(badge.translation)}</Badge>
			</OverflowTip>
		</Flex>
	)
}
