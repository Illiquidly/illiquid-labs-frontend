export type NetworkType = 'testnet' | 'classic' | 'mainnet'

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
