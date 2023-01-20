import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { LoansGridController } from 'components/shared/loan'
import { GRID_TYPE } from 'components/shared/loan/GridController'
import { LOAN, VERIFIED_COLLECTIONS } from 'constants/useQueryKeys'
import useAddress from 'hooks/useAddress'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { LoansService, SupportedCollectionsService } from 'services/api'
import { LOAN_STATE } from 'services/api/loansService'
import { Box, Flex } from 'theme-ui'

const MightLikeText = styled(Flex)`
	font-size: 20px;
	line-height: 28px;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
`

MightLikeText.defaultProps = {
	sx: {
		fontSize: ['20px', '24px'],
		lineHeight: ['28px', '28px'],
	},
}

export interface LoanListingsYouMightLikeProps {
	search: string
	loanId?: string | number
	borrower?: string
}

function LoanListingsYouMightLike({
	search,
	loanId,
}: LoanListingsYouMightLikeProps) {
	const wallet = useWallet()
	const { t } = useTranslation(['common', 'loan-listings'])
	const myAddress = useAddress()

	const { data: verifiedCollections } = useQuery(
		[VERIFIED_COLLECTIONS, wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data: loans, isLoading } = useQuery(
		[LOAN, wallet.network, search, myAddress],
		async () =>
			LoansService.getAllLoans(
				wallet.network.name,
				{
					myAddress,
					search,
					states: [LOAN_STATE.Started],
					excludeMyLoans: true,
					...(loanId ? { excludeLoans: [loanId] } : {}),
				},
				{
					page: 1,
					limit: 15,
				}
			),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	return (
		<Flex
			sx={{ minHeight: '400px', flexDirection: 'column', paddingBottom: '48px' }}
		>
			<Box
				sx={{
					marginBottom: ['16px', '25px'],
				}}
			>
				<MightLikeText>{t('loan-listings:you-might-like')}</MightLikeText>
			</Box>
			<Box sx={{ width: '100%' }}>
				<LoansGridController
					loans={loans?.data ?? []}
					isLoading={isLoading}
					verifiedCollections={verifiedCollections}
					gridType={Number(Boolean(GRID_TYPE.SMALL))}
				/>
			</Box>
		</Flex>
	)
}

export default LoanListingsYouMightLike