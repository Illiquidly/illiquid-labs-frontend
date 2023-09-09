import { useModal } from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { NFTS_SORT_VALUE } from 'components/shared/modals/my-nfts-modal/MyNFTsModal.model'
import { FULL_WALLET_NFTS, PARTIAL_WALLET_NFTS } from 'constants/useQueryKeys'
import React from 'react'
import {
	WalletNFTsService,
	WALLET_NFT_STATE,
} from 'services/api/walletNFTsService'
import { asyncAction } from 'utils/js/asyncAction'

import { getNetworkName } from 'utils/blockchain/terraUtils'
import useAddress from './useAddress'

export type UseMyNFTsFilters = {
	collectionAddresses: string[]
	name: string
	sort: NFTS_SORT_VALUE
}

// TODO: this hook would have to be refactored, until we find better solution on backend for fetching wallet NFTs.
export function useMyNFTs(filters: UseMyNFTsFilters) {
	const myAddress = useAddress()
	const networkName = getNetworkName()
	const modal = useModal()

	const {
		data: partialData,
		isLoading: partiallyLoading,
		refetch: refetchPartial,
	} = useQuery([PARTIAL_WALLET_NFTS, myAddress, modal.visible], async () => {
		const [error, data] = await asyncAction(
			WalletNFTsService.requestUpdateNFTs(networkName, myAddress)
		)

		if (error) {
			return WalletNFTsService.requestNFTs(networkName, myAddress)
		}

		return data
	})

	const { data: fullData, isLoading: fullyLoading } = useQuery(
		[FULL_WALLET_NFTS, myAddress, partialData],
		async () => {
			const data = await WalletNFTsService.requestNFTs(networkName, myAddress)

			if (data.state === WALLET_NFT_STATE.isUpdating) {
				return Promise.reject(new Error('Not loaded fully reject!'))
			}

			if (data.state === WALLET_NFT_STATE.Partial) {
				refetchPartial()
				return Promise.reject(new Error('Loaded partially return!'))
			}

			return data
		},
		{
			enabled: !!partialData && !!myAddress,
			retry: true,
		}
	)

	const data = React.useMemo(
		() => fullData ?? partialData,
		[fullData, partialData]
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
		partiallyLoading,
		fullyLoading,
		fetchMyNFTs: refetchPartial,
	}
}

export default useMyNFTs
