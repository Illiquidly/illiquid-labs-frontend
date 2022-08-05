import { keysToCamel } from 'utils/js/keysToCamel'

export function parseTxResult(txResult: any) {
	return keysToCamel(
		Object.fromEntries(
			(
				txResult?.logs
					.flatMap((log: { events: unknown[] }) => log.events)
					.find((attribute: { type: string }) => attribute.type === 'wasm')
					?.attributes || []
			).map(({ key, value }: { key: string; value: unknown }) => [key, value])
		)
	)
}
