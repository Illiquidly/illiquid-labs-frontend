// TODO: refactor this for IBC
export type NetworkType = 'testnet' | 'classic' | 'mainnet'

// TODO: move this to trade types scope
export type LookingFor = {
	id?: number
	network: NetworkType
	collectionAddress?: string
	collectionName?: string
	symbol?: string
	currency?: string
	amount?: string
	denom?: string
}
