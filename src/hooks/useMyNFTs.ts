import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { NFTS_SORT_VALUE } from 'components/shared/modals/my-nfts-modal/MyNFTsModal.model'
import { FULL_WALLET_NFTS } from 'constants/use-query-keys'
import React from 'react'
import { WalletNFTsService } from 'services/api/walletNFTsService'

import useAddress from './useAddress'

export type UseMyNFTsFilters = {
	collectionAddresses: string[]
	name: string
	sort: NFTS_SORT_VALUE
}

export function useMyNFTs(filters: UseMyNFTsFilters) {
	const wallet = useWallet()
	const myAddress = useAddress()

	const { data, isLoading, refetch } = useQuery(
		[FULL_WALLET_NFTS, myAddress],
		async () =>
			WalletNFTsService.getNFTs(wallet.network.chainID.split('-')[0], myAddress),
		{
			enabled: !!wallet.network && !!myAddress,
			retry: true,
			keepPreviousData: true,
		}
	)

	const ownedCollections = React.useMemo(
		() => data?.ownedCollections ?? [],
		[data]
	)

	const ownedNFTs = React.useMemo(() => {
		return (data?.ownedTokens ?? [])
			.filter(
				nft =>
					// Filter by collections
					(filters.collectionAddresses.length
						? filters.collectionAddresses.includes(nft.collectionAddress)
						: true) &&
					// Filter by name %LIKE
					(filters.name
						? (nft?.name || '').toLowerCase().match(`${filters.name.toLowerCase()}.*`)
						: true)
			)
			.sort(
				(a, b) =>
					(filters.sort === NFTS_SORT_VALUE.ASCENDING ? 1 : -1) *
					(a?.name || '').toLowerCase().localeCompare((b?.name || '').toLowerCase())
			)
	}, [data, filters.sort, filters.name, filters.collectionAddresses])

	return {
		ownedNFTs,
		ownedCollections,
		fullyLoading: isLoading,
		fetchMyNFTs: refetch,
	}
}

export default useMyNFTs
