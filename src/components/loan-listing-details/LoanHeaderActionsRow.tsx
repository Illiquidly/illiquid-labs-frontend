import React from 'react'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'
import { Box, Flex } from 'theme-ui'
import { IconButton } from 'components/trade-listing-details'
import * as ROUTES from 'constants/routes'
import { TwitterShareButton } from 'react-share'
import {
	DeleteOutlineIcon,
	PenOutlineIcon,
	ShareOutlineIcon,
	ArrowLeftIcon,
} from 'assets/icons/mixed'

import { useRouter } from 'next/router'
import { noop } from 'lodash'
import useAddress from 'hooks/useAddress'
import { LinkButton } from 'components/link'
import { Loan, LOAN_STATE } from 'services/api/loansService'
import { asyncAction } from 'utils/js/asyncAction'
import { TxBroadcastingModal } from 'components/shared'
import { LoansContract } from 'services/blockchain'
import { LOAN } from 'constants/useQueryKeys'
import { useQueryClient } from '@tanstack/react-query'
import { RemoveModal, RemoveModalProps, RemoveSuccessModal } from './modals'

interface LoanHeaderActionsRowProps {
	loan?: Loan
}

export const LoanHeaderActionsRow = ({ loan }: LoanHeaderActionsRowProps) => {
	const { loanInfo, borrower } = loan ?? {}

	const router = useRouter()

	const queryClient = useQueryClient()

	const editDisabled = ![LOAN_STATE.Published].includes(
		loanInfo?.state as LOAN_STATE
	)

	const removeDisabled = ![LOAN_STATE.Published].includes(
		loanInfo?.state as LOAN_STATE
	)

	const handleRemoveClick = async () => {
		if (!loan) {
			return
		}
		const [, result] = await asyncAction<RemoveModalProps>(
			NiceModal.show(RemoveModal, {
				loanId: loan.loanId,
			})
		)

		if (result) {
			const cancelRaffleResponse = await NiceModal.show(TxBroadcastingModal, {
				transactionAction: LoansContract.cancelLoanListing(loan.loanId),
				closeOnFinish: true,
			})

			if (cancelRaffleResponse) {
				await queryClient.invalidateQueries([LOAN])

				NiceModal.show(RemoveSuccessModal)
			}
		}
	}
	const myAddress = useAddress()

	const isMyLoanListing = borrower === myAddress

	const { t } = useTranslation(['common', 'loan-listings'])

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: ''

	return (
		<Flex
			sx={{
				mt: ['12.5px', '24px', '22px'],
				flex: 1,
				justifyContent: 'space-between',
			}}
		>
			<Flex
				sx={{
					justifyContent: 'flex-start',
				}}
			>
				<LinkButton
					href={ROUTES.LOAN_LISTINGS}
					sx={{ height: '40px', padding: '13px' }}
					variant='secondary'
					startIcon={<ArrowLeftIcon />}
				>
					{t('loan-listings:back-to-listings')}
				</LinkButton>
			</Flex>
			{isMyLoanListing && (
				<Flex
					sx={{
						gap: '6px',
						justifyContent: 'flex-end',
					}}
				>
					<IconButton disable={editDisabled}>
						<PenOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:edit')}
						</Box>
					</IconButton>
					<IconButton disabled={removeDisabled} onClick={handleRemoveClick}>
						<DeleteOutlineIcon />
						<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
							{t('common:remove')}
						</Box>
					</IconButton>
					<TwitterShareButton
						title={t('common:checkout-my-loan')}
						url={`${origin}${router.asPath}`}
					>
						<IconButton onClick={noop}>
							<ShareOutlineIcon />
							<Box sx={{ ml: 9, display: ['none', 'none', 'block'] }}>
								{t('common:share')}
							</Box>
						</IconButton>
					</TwitterShareButton>
				</Flex>
			)}
		</Flex>
	)
}

LoanHeaderActionsRow.defaultProps = {
	loan: undefined,
}

export default LoanHeaderActionsRow
