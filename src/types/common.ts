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
