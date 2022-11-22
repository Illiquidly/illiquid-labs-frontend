import React from 'react'
import { Flex } from 'theme-ui'
import Pagination from './Pagination'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Pagination',
	component: Pagination,
}

export const PaginationExample = () => {
	const [page, setPage] = React.useState(1)

	return (
		<Flex sx={{ flexDirection: 'column', gap: 8, width: '343px' }}>
			<Pagination currentPage={page} pageCount={10} setPage={setPage} />
		</Flex>
	)
}
