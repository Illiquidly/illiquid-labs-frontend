import styled from '@emotion/styled'

import {
	Table,
	TableHead,
	TableHeadRow,
	TableHeadRowCell,
	TableBody,
	TableBodyRow,
	TableBodyRowCell,
	OverflowTip,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Box, Flex } from 'theme-ui'

import { LunaIcon } from 'assets/icons/mixed'
import moment from 'moment'
import { Loan } from 'services/api/loansService'
import { TokenChip } from './styled'

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 45px;
	width: 100%;
`
interface LoanOffersTableProps {
	loan?: Loan
	excludeTopBorder?: boolean
}
function LoanOffersTable({ loan, excludeTopBorder }: LoanOffersTableProps) {
	const { t } = useTranslation(['common', 'loan-listings'])
	const columns: Array<string> = t('loan-listings:loan-offers.table.columns', {
		returnObjects: true,
	})

	return (
		<Container>
			<Table
				style={
					excludeTopBorder ? { borderTopRightRadius: 0, borderTopLeftRadius: 0 } : {}
				}
			>
				<TableHead>
					<TableHeadRow>
						{(columns || []).map(col => (
							<TableHeadRowCell key={col}>{col}</TableHeadRowCell>
						))}
						<TableHeadRowCell />
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{(loan?.offers ?? []).map(offer => {
						return (
							<TableBodyRow key={offer.id}>
								<TableBodyRowCell style={{ verticalAlign: 'top' }}>
									<OverflowTip>
										<div>{offer?.borrower ?? ''}</div>
									</OverflowTip>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
										}}
									>
										<TokenChip>
											<Box sx={{ flex: 1, justifyContent: 'center' }}>
												{offer?.depositedFunds ? (
													<>
														<LunaIcon />
														<div>{`${offer?.depositedFunds?.amount} ${offer?.depositedFunds?.currency}`}</div>
													</>
												) : (
													<div>-</div>
												)}
											</Box>
										</TokenChip>
									</Flex>
								</TableBodyRowCell>

								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
											minWidth: '160px',
										}}
									>
										{moment(offer?.listDate).toLocaleString()}
									</Flex>
								</TableBodyRowCell>
							</TableBodyRow>
						)
					})}
				</TableBody>
			</Table>
		</Container>
	)
}

LoanOffersTable.defaultProps = {
	loan: undefined,
	excludeTopBorder: false,
}

export default LoanOffersTable
