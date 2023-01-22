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
	Button,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Box, Flex } from 'theme-ui'

import { LunaIcon } from 'assets/icons/mixed'
import moment from 'moment'
import { Loan } from 'services/api/loansService'
import { LOAN_OFFERS } from 'constants/useQueryKeys'
import { useWallet } from '@terra-money/use-wallet'
import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { LoanOffer, LoanOffersService } from 'services/api/loansOffersService'
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
	const wallet = useWallet()
	const columns: Array<string> = t('loan-listings:loan-offers.table.columns', {
		returnObjects: true,
	})

	const { loanId, borrower } = loan ?? {}

	const [page, setPage] = React.useState(1)

	// TODO extract this into hook, along with useQuery part.
	const [infiniteData, setInfiniteData] = React.useState<LoanOffer[]>([])

	React.useEffect(() => {
		setInfiniteData([])
		setPage(1)
	}, [wallet.network, loanId, borrower])

	const { data: loanOffers, isLoading } = useQuery(
		[LOAN_OFFERS, wallet.network, page, borrower, loanId],
		async () =>
			LoanOffersService.getAllLoanOffers(
				wallet.network.name,
				{
					loanIds: [`${loanId}`],
					borrowers: [`${borrower}`],
				},
				{
					limit: 20,
					page,
				}
			),
		{
			enabled: !!wallet.network && !isNil(loanId) && !isNil(borrower),
			retry: true,
		}
	)

	React.useEffect(
		() => loanOffers && setInfiniteData(prev => [...prev, ...loanOffers.data]),
		[loanOffers]
	)

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
					{(infiniteData ?? []).map(offer => {
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
												{offer?.offerInfo?.depositedFunds ? (
													<Flex>
														<Flex sx={{ mr: '2px', alignItems: 'center' }}>
															{`${offer?.offerInfo?.terms?.principle?.amount} ${offer?.offerInfo?.terms?.principle?.currency}`}
														</Flex>
														<LunaIcon />
													</Flex>
												) : (
													<div>-</div>
												)}
											</Box>
										</TokenChip>
									</Flex>
								</TableBodyRowCell>

								<TableBodyRowCell>{offer?.offerInfo?.state}</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
											minWidth: '160px',
										}}
									>
										{moment(offer?.offerInfo.listDate).fromNow()}
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell />
							</TableBodyRow>
						)
					})}
				</TableBody>
			</Table>
			<Flex sx={{ mt: '12px' }}>
				{loanOffers?.data && !!loanOffers.data?.length && !isLoading && (
					<Button
						disabled={loanOffers?.page === loanOffers.pageCount}
						fullWidth
						variant='dark'
						onClick={() => setPage(prev => prev + 1)}
					>
						{t('common:show-more')}
					</Button>
				)}
			</Flex>
		</Container>
	)
}

LoanOffersTable.defaultProps = {
	loan: undefined,
	excludeTopBorder: false,
}

export default LoanOffersTable
