import { findLast } from 'lodash'
import { keysToCamel } from 'utils/js/keysToCamel'

export function parseTxResult(txResult: any) {
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
