import {
	ChevronLeftSmallIcon,
	ChevronRightSmallIcon,
} from 'assets/icons/24ptOutline'
import React from 'react'
import { Button } from 'theme-ui'
import {
	Container,
	PageContainer,
	PageLabel,
	PageLabelContainer,
} from './Pagination.styled'

interface PaginationProps {
	currentPage: number
	pageCount?: number
	setPage: React.Dispatch<React.SetStateAction<number>>
}
const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	pageCount = 1,
	setPage,
}) => {
	const pageArray = [-1, 0, 1, 2]
		.map(v => currentPage + v)
		.filter(page => page > 0 && page <= pageCount)

	return (
		<Container>
			<PageContainer>
				<Button
					sx={{ padding: 0, width: '36px', height: '36px' }}
					disabled={currentPage === 1}
					variant='dark'
					onClick={() => setPage(prev => prev - 1)}
				>
					<ChevronLeftSmallIcon />
				</Button>
				{!pageArray.includes(1) && (
					<>
						<PageLabelContainer
							isActive={currentPage === 1}
							onClick={() => {
								setPage(1)
							}}
						>
							<PageLabel>1</PageLabel>
						</PageLabelContainer>
						<PageLabelContainer disablePointer isActive={false}>
							<PageLabel>...</PageLabel>
						</PageLabelContainer>
					</>
				)}
				{pageArray.map(page => {
					return (
						<PageLabelContainer
							isActive={page === currentPage}
							onClick={() => {
								setPage(page)
							}}
						>
							<PageLabel>{page}</PageLabel>
						</PageLabelContainer>
					)
				})}
				{!pageArray.includes(pageCount) && (
					<>
						<PageLabelContainer disablePointer isActive={false}>
							<PageLabel>...</PageLabel>
						</PageLabelContainer>
						<PageLabelContainer
							isActive={currentPage === pageCount}
							onClick={() => {
								setPage(pageCount)
							}}
						>
							<PageLabel>{pageCount}</PageLabel>
						</PageLabelContainer>
					</>
				)}
				<Button
					sx={{ padding: 0, width: '36px', height: '36px' }}
					disabled={pageCount === currentPage}
					variant='dark'
					onClick={() => setPage(prev => Math.min(prev + 1, pageCount))}
				>
					<ChevronRightSmallIcon />
				</Button>
			</PageContainer>
		</Container>
	)
}

Pagination.defaultProps = {
	pageCount: 1,
}

export default Pagination
