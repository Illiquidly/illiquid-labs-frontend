import { findLast } from 'lodash'
import { keysToCamel } from 'utils/js/keysToCamel'

// We only care about last result in events, but all events return tradeId, raffleId, loanId by design...
export function parseTxResult(txResult) {
	return keysToCamel(
		Object.fromEntries(
			(
				findLast(
					txResult?.logs.flatMap((log: { events: unknown[] }) => log.events),
					(attribute: { type: string }) => attribute.type === 'wasm'
				)?.attributes || []
			).map(({ key, value }: { key: string; value: unknown }) => [key, value])
		)
	)
}
