import React from 'react'
import { useTranslation } from 'next-i18next'

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

interface LoanHeaderActionsRowProps {
	loan?: Loan
}

export const LoanHeaderActionsRow = ({ loan }: LoanHeaderActionsRowProps) => {
	const { loanInfo } = loan ?? {}

	const router = useRouter()

	const editDisabled = ![LOAN_STATE.Published].includes(
		loanInfo?.state as LOAN_STATE
	)

	const removeDisabled = [LOAN_STATE.Published].includes(
		loanInfo?.state as LOAN_STATE
	)

	const myAddress = useAddress()

	const isMyLoanListing = loan?.borrower === myAddress

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
					<IconButton disabled={removeDisabled}>
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
