export interface APIGetAllResponse<T> {
	data: T[]
	count: number
	total: number
	page: number
	pageCount: number
}

export interface APIPagination {
	page?: number
	limit?: number
}

export type Cw20Coin = {
	address: string
	amount: number
}
export interface HumanCw20Coin {
	amount: string
	currency: string
	address: string
}

export interface HumanCoin {
	amount: string
	currency: string
}

export type Coin = {
	amount: number | string
	denom: string
}

export type ContractName =
	| 'raffle'
	| 'p2pTrade'
	| 'feeCollector'
	| 'nameService'

export type NetworkId = 'columbus-5' | 'phoenix-1' | 'pisco-1'

export type NetworkName = 'mainnet' | 'classic' | 'testnet'
