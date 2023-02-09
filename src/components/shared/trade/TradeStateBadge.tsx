import { Badge, OverflowTip } from 'components/ui'
import { useTranslation } from 'next-i18next'
import { TRADE_STATE } from 'services/api/tradesService'
import { Flex } from 'theme-ui'

const TradeStateBadge = ({ tradeState }: { tradeState: TRADE_STATE }) => {
	const { t } = useTranslation()

	const badge = {
		[TRADE_STATE.Published]: {
			bg: 'primary200',
			translation: 'common:published',
		},
		[TRADE_STATE.Refused]: {
			bg: 'error200',
			translation: 'common:refused',
		},
		[TRADE_STATE.Created]: {
			bg: 'primary200',
			translation: 'common:created',
		},
		[TRADE_STATE.Countered]: {
			bg: 'success200',
			translation: 'common:countered',
		},
		[TRADE_STATE.Accepted]: {
			bg: 'error200',
			translation: 'common:accepted',
		},
		[TRADE_STATE.Cancelled]: {
			bg: 'error200',
			translation: 'common:cancelled',
		},
	}[tradeState]

	return (
		<Flex sx={{ mx: '4px', maxHeight: '18px' }}>
			<OverflowTip>
				<Badge bg={badge.bg}>{t(badge.translation)}</Badge>
			</OverflowTip>
		</Flex>
	)
}

export default TradeStateBadge
