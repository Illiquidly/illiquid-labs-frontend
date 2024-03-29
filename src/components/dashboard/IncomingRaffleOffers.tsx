import { useQuery } from '@tanstack/react-query'

import { useTranslation } from 'next-i18next'
import React from 'react'
import useAddress from 'hooks/useAddress'
import { OUTGOING_RAFFLES, RAFFLES } from 'constants/useQueryKeys'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { RafflesService, RAFFLE_STATE } from 'services/api/rafflesService'
import { getNetworkName } from 'utils/blockchain/terraUtils'
import RaffleOffers from './RafflesOffers'

function IncomingRaffleOffers() {
	const [page, setPage] = React.useState(1)
	const myAddress = useAddress()
	const networkName = getNetworkName()

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
		[OUTGOING_RAFFLES, networkName, myAddress],
		async () =>
			RafflesService.getAllRaffles(
				networkName,
				{
					myAddress,
					owners: [myAddress],
					hasParticipants: true,
				},
				{
					page,
					limit: 1,
				}
			),
		{
			retry: true,
		}
	)

	const {
		data: raffles,
		isLoading,
		isFetched: rafflesFetched,
	} = useQuery(
		[RAFFLES, networkName, myAddress, page, statuses, collections, allFetched],
		async () =>
			RafflesService.getAllRaffles(
				networkName,
				{
					myAddress,
					states: statuses.flatMap(({ value }) => JSON.parse(value)),
					collections: collections.map(({ value }) => value),
					owners: [myAddress],
					hasParticipants: true,
				},
				{
					page,
					limit: 3,
				},
				'DESC'
			),
		{
			enabled: allFetched,
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

export default IncomingRaffleOffers
