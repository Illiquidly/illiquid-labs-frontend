import { useQuery } from '@tanstack/react-query'

import { useTranslation } from 'next-i18next'
import React from 'react'
import { useWallet } from '@terra-money/use-wallet'
import useAddress from 'hooks/useAddress'
import { LoansService } from 'services/api'
import { ALL_LOANS, LOANS } from 'constants/useQueryKeys'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { LOAN_STATE } from 'services/api/loansService'
import LoanOffers from './LoanOffers'

function OutgoingLoanOffers() {
	const wallet = useWallet()
	const [page, setPage] = React.useState(1)
	const myAddress = useAddress()
	const { t } = useTranslation(['common', 'dashboard'])

	const [
		activeStatusLabel,
		inactiveStatusLabel,
		publishedStatusLabel,
		startedStatusLabel,
		defaultedStatusLabel,
		endedStatusLabel,
		withdrawnLabel,
	]: Array<string> = t('dashboard:loan.statuses', {
		returnObjects: true,
	})

	const statusOptions = [
		{
			label: activeStatusLabel,
			value: JSON.stringify([
				LOAN_STATE.Published,
				LOAN_STATE.Started,
				LOAN_STATE.PendingDefault,
			]),
		},
		{
			label: inactiveStatusLabel,
			value: JSON.stringify([LOAN_STATE.Ended, LOAN_STATE.Withdrawn]),
		},
		{
			label: publishedStatusLabel,
			value: JSON.stringify([LOAN_STATE.Published]),
		},
		{
			label: startedStatusLabel,
			value: JSON.stringify([LOAN_STATE.Started]),
		},
		{
			label: defaultedStatusLabel,
			value: JSON.stringify([LOAN_STATE.PendingDefault]),
		},
		{
			label: endedStatusLabel,
			value: JSON.stringify([LOAN_STATE.Ended]),
		},
		{
			label: withdrawnLabel,
			value: JSON.stringify([LOAN_STATE.Withdrawn, LOAN_STATE.Defaulted]),
		},
	]

	const [statuses, setStatuses] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const [collections, setCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const { data: allLoans, isFetched: allFetched } = useQuery(
		[ALL_LOANS, wallet.network, myAddress],
		async () =>
			LoansService.getAllLoans(
				wallet.network.name,
				{
					myAddress,
					fundedByMe: true,
				},
				{
					page,
					limit: 1,
				}
			),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const {
		data: loans,
		isLoading,
		refetch,
		isFetched: loansFetched,
	} = useQuery(
		[LOANS, wallet.network, myAddress, page, statuses, collections, allFetched],
		async () =>
			LoansService.getAllLoans(
				wallet.network.name,
				{
					myAddress,
					fundedByMe: true,
					states: statuses.flatMap(({ value }) => JSON.parse(value)),
					collections: collections.map(({ value }) => value),
				},
				{
					page,
					limit: 3,
				}
			),
		{
			enabled: !!wallet.network && allFetched,
			retry: true,
		}
	)

	return (
		<LoanOffers
			loans={loans}
			allLoans={allLoans}
			setPage={setPage}
			page={page}
			isLoading={isLoading}
			refetch={refetch}
			setStatuses={setStatuses}
			statuses={statuses}
			collections={collections}
			setCollections={setCollections}
			statusOptions={statusOptions}
			loansFetched={loansFetched}
		/>
	)
}

export default OutgoingLoanOffers
