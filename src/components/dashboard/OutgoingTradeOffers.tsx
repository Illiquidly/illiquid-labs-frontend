import { useQuery } from '@tanstack/react-query'

import { useTranslation } from 'next-i18next'
import React from 'react'
import { useWallet } from '@terra-money/use-wallet'
import useAddress from 'hooks/useAddress'
import { TradesService } from 'services/api'
import { COUNTERED_TRADES, TRADES } from 'constants/useQueryKeys'
import { TRADE_STATE } from 'services/api/tradesService'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import TradeOffers from './TradeOffers'

function OutgoingTradeOffers() {
	const wallet = useWallet()
	const [page, setPage] = React.useState(1)
	const myAddress = useAddress()
	const { t } = useTranslation(['common', 'dashboard'])

	const [
		activeStatusLabel,
		inactiveStatusLabel,
		cancelledStatusLabel,
		publishedStatusLabel,
		counteredStatusLabel,
		acceptedStatusLabel,
	]: Array<string> = t('dashboard:trades:statuses', {
		returnObjects: true,
	})
	const statusOptions = [
		{
			label: activeStatusLabel,
			value: JSON.stringify([TRADE_STATE.Published, TRADE_STATE.Countered]),
		},
		{
			label: inactiveStatusLabel,
			value: JSON.stringify([TRADE_STATE.Cancelled, TRADE_STATE.Accepted]),
		},
		{
			label: cancelledStatusLabel,
			value: JSON.stringify([TRADE_STATE.Cancelled]),
		},
		{
			label: publishedStatusLabel,
			value: JSON.stringify([TRADE_STATE.Published]),
		},
		{
			label: counteredStatusLabel,
			value: JSON.stringify([TRADE_STATE.Countered]),
		},
		{
			label: acceptedStatusLabel,
			value: JSON.stringify([TRADE_STATE.Accepted]),
		},
	]

	const [statuses, setStatuses] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const [collections, setCollections] = React.useState<
		MultiSelectAccordionInputOption[]
	>([])

	const { data: allTrades, isFetched: allFetched } = useQuery(
		[COUNTERED_TRADES, wallet.network, myAddress],
		async () =>
			TradesService.getAllTrades(
				wallet.network.name,
				{
					myAddress,
					counteredBy: [myAddress],
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
		data: trades,
		isLoading,
		refetch,
		isFetched: tradesFetched,
	} = useQuery(
		[TRADES, wallet.network, myAddress, page, statuses, collections, allFetched],
		async () =>
			TradesService.getAllTrades(
				wallet.network.name,
				{
					myAddress,
					states: statuses.flatMap(({ value }) => JSON.parse(value)),
					collections: collections.map(({ value }) => value),
					counteredBy: [myAddress],
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
		<TradeOffers
			trades={trades}
			allTrades={allTrades}
			setPage={setPage}
			page={page}
			isLoading={isLoading}
			refetch={refetch}
			setStatuses={setStatuses}
			statuses={statuses}
			collections={collections}
			setCollections={setCollections}
			statusOptions={statusOptions}
			tradesFetched={tradesFetched}
		/>
	)
}

export default OutgoingTradeOffers
