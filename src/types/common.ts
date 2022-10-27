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
