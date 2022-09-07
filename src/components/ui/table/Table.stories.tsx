// Checkbox.stories.ts|tsx

import React from 'react'

import { Flex } from 'theme-ui'
import { Button } from '../button'
import Table from './Table'
import TableBody from './TableBody'
import TableBodyRow from './TableBodyRow'
import TableBodyRowCell from './TableBodyRowCell'
import TableFooterRow from './TableFooterRow'
import TableFooterRowCell from './TableFooterRowCell'
import TableHead from './TableHead'
import TableHeadRow from './TableHeadRow'
import TableHeadRowCell from './TableHeadRowCell'

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Table',
	component: Table,
}

export const TableExample = () => {
	return (
		<Flex
			sx={{
				width: '100%',
			}}
		>
			<Table>
				<TableHead>
					<TableHeadRow>
						{['User', 'NFTs', 'Tokens', 'Date'].map(col => (
							<TableHeadRowCell>{col}</TableHeadRowCell>
						))}
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{[1, 2, 3, 4, 5].map(i => (
						<TableBodyRow>
							<TableBodyRowCell>
								<Flex
									sx={{
										width: '100%',
										justifyContent: 'center',
									}}
								>
									<Button variant='ghost' size='medium'>
										{`Button${i}`}
									</Button>
								</Flex>
							</TableBodyRowCell>
							<TableBodyRowCell>
								<Flex
									sx={{
										width: '100%',
										justifyContent: 'center',
									}}
								>
									<Button variant='dark' size='medium'>
										{`Button${i}`}
									</Button>
								</Flex>
							</TableBodyRowCell>
							<TableBodyRowCell>
								<Flex
									sx={{
										width: '100%',
										justifyContent: 'center',
									}}
								>
									{`${i * 3} tokens`}
								</Flex>
							</TableBodyRowCell>
							<TableBodyRowCell>
								<Flex
									sx={{
										width: '100%',
										justifyContent: 'center',
									}}
								>
									{`${i * 2} days ago`}
								</Flex>
							</TableBodyRowCell>
						</TableBodyRow>
					))}
					<TableFooterRow>
						<TableFooterRowCell colSpan={4}>
							<Button
								sx={{
									height: '40px',
									width: '100%',
									borderTopRightRadius: '0px',
									borderTopLeftRadius: '0px',
									borderBottomRightRadius: '8px',
									borderBottomLeftRadius: '8px',
									border: 'none',
									margin: 0,
									':hover': {
										border: 'unset',
										boxShadow: 'unset',
									},
								}}
								variant='dark'
								size='small'
							>
								Show more
							</Button>
						</TableFooterRowCell>
					</TableFooterRow>
				</TableBody>
			</Table>
		</Flex>
	)
}
