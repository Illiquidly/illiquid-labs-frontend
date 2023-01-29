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
import { AvatarIcon, LunaIcon } from 'assets/icons/mixed'
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
import { BLOCKS_PER_DAY } from 'constants/core'
import useNameService from 'hooks/useNameService'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import {
	NameLabel,
	NameServiceImage,
	NameServiceImagePlaceholder,
	TokenChip,
} from './styled'

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

	const nameServiceResolutions = useNameService(
		infiniteData.map(o => o?.offerInfo?.lender ?? '')
	)

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
					{(infiniteData ?? []).map((offer, index) => {
						const isMyOffer = offer?.offerInfo?.lender === myAddress

						const profileImage = nameServiceResolutions[index]?.extension?.image
						const name = nameServiceResolutions[index]?.extension?.name ?? ''

						return (
							<TableBodyRow key={offer.id}>
								<TableBodyRowCell style={{ verticalAlign: 'top' }}>
									<Flex sx={{ gap: '12px', flex: 1 }}>
										<NameServiceImagePlaceholder>
											{profileImage ? (
												<NameServiceImage src={fromIPFSImageURLtoImageURL(profileImage)} />
											) : (
												<AvatarIcon width='100%' height='100%' />
											)}
										</NameServiceImagePlaceholder>
										<div>
											<OverflowTip>
												<NameLabel>{name}</NameLabel>
											</OverflowTip>
											<OverflowTip>
												<div>{offer?.offerInfo?.lender ?? ''}</div>
											</OverflowTip>
											<OverflowTip>
												<div>{`''${offer?.offerInfo?.comment ?? ''}''`}</div>
											</OverflowTip>
										</div>
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
											minWidth: '160px',
										}}
									>
										<TokenChip>
											<Box sx={{ flex: 1, justifyContent: 'center' }}>
												{offer?.offerInfo?.terms?.principle?.amount ? (
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
								<TableBodyRowCell>
									<Flex sx={{ minWidth: '40px' }}>
										{t('common:percentage', {
											value: offer?.offerInfo?.terms?.interestRate,
										})}
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex sx={{ minWidth: '80px' }}>
										{t('loan-listings:days', {
											count: Math.floor(
												offer?.offerInfo?.terms?.durationInBlocks / BLOCKS_PER_DAY
											),
										})}
									</Flex>
								</TableBodyRowCell>

								<TableBodyRowCell>
									<Flex sx={{ minWidth: '60px' }}>{offer?.offerInfo?.state}</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
											minWidth: '90px',
										}}
									>
										{moment(offer?.offerInfo.listDate).fromNow()}
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									{/* 
											When loan is not mine, loan is any state, my offer is refused (not accepted) or cancelled I can
											* Withdraw my assets from offer.
										*/}
									{!isMyLoan &&
										isMyOffer &&
										[OFFER_STATE.Refused].includes(offer?.offerInfo?.state) &&
										offer?.offerInfo?.depositedFunds && (
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
											<Flex sx={{ gap: '8px' }}>
												<Button variant='primary' onClick={() => handleApprove(offer)}>
													{t('loan-listings:loan-offers.table.approve')}
												</Button>

												<Button onClick={() => handleDeny(offer)} variant='secondary'>
													{t('loan-listings:loan-offers.table.deny')}
												</Button>
											</Flex>
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
