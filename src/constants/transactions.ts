import { NetworkId } from 'types'

export const txExplorerFactory: {
	[k in NetworkId]: (txId) => string
} = {
	'columbus-5': (txId: string) =>
		`https://finder.terra.money/classic/tx/${txId}`,
	'phoenix-1': (txId: string) => `https://finder.terra.money/mainnet/tx/${txId}`,
	'pisco-1': (txId: string) => `https://finder.terra.money/testnet/tx/${txId}`,
}
