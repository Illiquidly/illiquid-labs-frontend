import { Badge, OverflowTip } from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { LOAN_STATE } from 'services/api/loansService'
import { Flex } from 'theme-ui'

export default function LoanStateBadge({
	loanState,
}: {
	loanState: LOAN_STATE
}) {
	const { t } = useTranslation()
	const badge = {
		[LOAN_STATE.Defaulted]: {
			bg: 'error200',
			translation: 'common:ended',
		},
		[LOAN_STATE.Ended]: {
			bg: 'error200',
			translation: 'common:ended',
		},
		[LOAN_STATE.PendingDefault]: {
			bg: 'error200',
			translation: 'common:defaulted',
		},
		[LOAN_STATE.Published]: {
			bg: 'primary200',
			translation: 'common:published',
		},
		[LOAN_STATE.Started]: {
			bg: 'success200',
			translation: 'common:funded',
		},
		[LOAN_STATE.Inactive]: {
			bg: 'error200',
			translation: 'common:inactive',
		},
	}[loanState]

	return (
		<Flex sx={{ ml: '4px', maxHeight: '18px' }}>
			<OverflowTip>
				<Badge bg={badge.bg}>{t(badge.translation)}</Badge>
			</OverflowTip>
		</Flex>
	)
}
