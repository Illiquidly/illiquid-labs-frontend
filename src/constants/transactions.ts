import { ChainId } from 'types'

export const txExplorerFactory: {
	[k in ChainId]: (txId) => string
} = {
	'phoenix-1': (txId: string) => `https://finder.terra.money/mainnet/tx/${txId}`,
	'pisco-1': (txId: string) => `https://finder.terra.money/testnet/tx/${txId}`,
}
