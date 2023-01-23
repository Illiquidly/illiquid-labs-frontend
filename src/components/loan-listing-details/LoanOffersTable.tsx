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
import NiceModal from '@ebay/nice-modal-react'
import { LunaIcon } from 'assets/icons/mixed'
import moment from 'moment'
import { Loan, LOAN_STATE } from 'services/api/loansService'
import { LOAN_OFFERS } from 'constants/useQueryKeys'
import { useWallet } from '@terra-money/use-wallet'
import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import {
	LoanOffer,
	LoanOffersService,
	OFFER_STATE,
} from 'services/api/loansOffersService'
import useAddress from 'hooks/useAddress'
import { TxBroadcastingModal } from 'components/shared'
import { LoansContract } from 'services/blockchain'
import { TokenChip } from './styled'

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 45px;
	width: 100%;
`
interface LoanOffersTableProps {
	loan?: Loan
	excludeTopBorder?: boolean
	refetchLoan: () => void
}
function LoanOffersTable({
	loan,
	excludeTopBorder,
	refetchLoan,
}: LoanOffersTableProps) {
	const { t } = useTranslation(['common', 'loan-listings'])
	const wallet = useWallet()
	const myAddress = useAddress()

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

	const updateLoanOffer = async (offer: LoanOffer) => {
		refetchLoan()

		const updatedOffer = await LoanOffersService.getLoanOffer(
			wallet.network.name,
			offer.globalOfferId
		)

		setInfiniteData(
			infiniteData.map(loanOffer =>
				loanOffer.id === updatedOffer.id ? updatedOffer : loanOffer
			)
		)
	}

	const withdrawOffer = async (offer: LoanOffer) => {
		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.withdrawRefusedOffer(offer?.globalOfferId),
			closeOnFinish: true,
		})

		await updateLoanOffer(offer)
	}

	const handleApprove = async (offer: LoanOffer) => {
		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.acceptOffer(offer?.globalOfferId),
			closeOnFinish: true,
		})

		await updateLoanOffer(offer)
	}

	const handleDeny = async (offer: LoanOffer) => {
		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.refuseOffer(offer?.globalOfferId),
			closeOnFinish: true,
		})

		await updateLoanOffer(offer)
	}

	const cancelOffer = async (offer: LoanOffer) => {
		await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.cancelOffer(offer?.globalOfferId),
			closeOnFinish: true,
		})

		await updateLoanOffer(offer)
	}

	const isMyLoan = loan?.borrower === myAddress

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
						const isMyOffer = offer?.offerInfo?.lender === myAddress

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
								<TableBodyRowCell>
									{/* 
											When loan is not mine, loan is any state, my offer is refused (not accepted) or cancelled I can
											* Withdraw my assets from counter trade.
										*/}
									{!isMyLoan &&
										isMyOffer &&
										[OFFER_STATE.Refused].includes(offer?.offerInfo?.state) && (
											<Button onClick={async () => withdrawOffer(offer)}>
												{t('common:withdraw')}
											</Button>
										)}

									{/* When loan is published and I am the borrower and offer is
										published. 
											* I can refuse/deny loan offer.
											* I can accept/approve loan offer.
										*/}

									{isMyLoan &&
										[LOAN_STATE.Published].includes(
											loan?.loanInfo?.state as LOAN_STATE
										) &&
										!isMyOffer &&
										[OFFER_STATE.Published].includes(offer?.offerInfo.state) && (
											<>
												<Button
													fullWidth
													variant='primary'
													onClick={() => handleApprove(offer)}
												>
													{t('loan-listings:loan-offers.table.approve')}
												</Button>

												<Button
													onClick={() => handleDeny(offer)}
													variant='secondary'
													fullWidth
												>
													{t('loan-listings:loan-offers.table.deny')}
												</Button>
											</>
										)}

									{/* {
										I can cancel offer if in published state and It's not my loan
										I's my offer
									} */}
									{!isMyLoan &&
										isMyOffer &&
										[OFFER_STATE.Published].includes(offer?.offerInfo?.state) && (
											<Button onClick={async () => cancelOffer(offer)}>
												{t('common:remove')}
											</Button>
										)}
								</TableBodyRowCell>
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
