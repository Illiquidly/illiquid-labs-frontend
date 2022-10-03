export enum NFTS_SORT_VALUE {
	ASCENDING = 'ASCENDING',
	DESCENDING = 'DESCENDING',
}

export type NFTsSortsProps = Array<{ value: NFTS_SORT_VALUE; element: string }>
