import { useQuery } from '@tanstack/react-query'

import { useTranslation } from 'next-i18next'
import React from 'react'
import { useWallet } from '@terra-money/use-wallet'
import useAddress from 'hooks/useAddress'
import { OUTGOING_RAFFLES, RAFFLES } from 'constants/useQueryKeys'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { RafflesService, RAFFLE_STATE } from 'services/api/rafflesService'
import RaffleOffers from './RafflesOffers'

function OutgoingRaffleOffers() {
	const wallet = useWallet()
	const [page, setPage] = React.useState(1)
	const myAddress = useAddress()
	const { t } = useTranslation(['common', 'dashboard'])

	const [
		startedStatusLabel,
		closedStatusLabel,
		finishedStatusLabel,
		cancelledStatusLabel,
		claimedStatusLabel,
	]: Array<string> = t('raffle-listings:statuses', {
		returnObjects: true,
	})

	const statusOptions = [
		{
			label: startedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Started]),
		},
		{
			label: closedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Closed]),
		},
		{
			label: finishedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Finished]),
		},
		{
			label: cancelledStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Cancelled]),
		},
		{
			label: claimedStatusLabel,
			value: JSON.stringify([RAFFLE_STATE.Claimed]),
		},
	]

	const [statuses, setStatuses] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const [collections, setCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const { data: allRaffles, isFetched: allFetched } = useQuery(
		[OUTGOING_RAFFLES, wallet.network, myAddress],
		async () =>
			RafflesService.getAllRaffles(
				wallet.network.name,
				{
					myAddress,
					participatedBy: [myAddress],
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
		data: raffles,
		isLoading,
		isFetched: rafflesFetched,
	} = useQuery(
		[RAFFLES, wallet.network, myAddress, page, statuses, collections, allFetched],
		async () =>
			RafflesService.getAllRaffles(
				wallet.network.name,
				{
					myAddress,
					states: statuses.flatMap(({ value }) => JSON.parse(value)),
					collections: collections.map(({ value }) => value),
					participatedBy: [myAddress],
				},
				{
					page,
					limit: 3,
				},
				'DESC'
			),
		{
			enabled: !!wallet.network && allFetched,
			retry: true,
		}
	)

	return (
		<RaffleOffers
			raffles={raffles}
			allRaffles={allRaffles}
			setPage={setPage}
			page={page}
			isLoading={isLoading}
			setStatuses={setStatuses}
			statuses={statuses}
			collections={collections}
			setCollections={setCollections}
			statusOptions={statusOptions}
			rafflesFetched={rafflesFetched}
		/>
	)
}

export default OutgoingRaffleOffers
