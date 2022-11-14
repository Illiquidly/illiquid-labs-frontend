import { take } from 'lodash'
import React, { useState } from 'react'

export default function useInfiniteData<T>({
	data,
	perPage,
}: {
	data: T[]
	perPage: number
}) {
	const [page, setPage] = useState(1)
	const [resultData, setResultData] = React.useState(take(data, perPage))

	React.useEffect(() => {
		setPage(1)
		setResultData(take(data, perPage))
	}, [perPage, data])

	const loadMore = React.useCallback(() => {
		setPage(prevPage => prevPage + 1)
		setResultData(oldResultData => [
			...oldResultData,
			...data.slice(page * perPage, page * perPage + perPage),
		])
	}, [page, data, perPage])

	return {
		data: resultData,
		loadMore,
		hasMore: resultData.length < data.length,
	}
}
