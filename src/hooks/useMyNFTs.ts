import { useWallet, WalletStatus } from '@terra-money/use-wallet'
import React from 'react'
import { asyncAction } from 'utils/js/asyncAction'
import promiseRetry from 'promise-retry'
import { getNetworkName } from 'utils/blockchain/terraUtils'
import {
	Collection,
	NFT,
	WalletNFTsResponse,
	WalletNFTsService,
	WALLET_NFT_STATE,
} from 'services/api/walletNFTsService'
import { useRouter } from 'next/router'

export type UseMyNFTsFilters = {
	collectionAddresses: string[]
	name: string
}

export function useMyNFTs(filters: UseMyNFTsFilters) {
	const [NFTs, setNFTs] = React.useState<NFT[]>([])
	const [collections, setCollections] = React.useState<Collection[]>([])
	const wallet = useWallet()
	const { query } = useRouter()
	const myAddress = (query?.address as string) || wallet.wallets[0]?.terraAddress

	const [partiallyLoading, setPartiallyLoading] = React.useState(false)
	const [fullyLoading, setFullyLoading] = React.useState(false)

	async function fetchMyNFTs() {
		setPartiallyLoading(true)
		setFullyLoading(true)

		if (myAddress) {
			const [, partialNFTs] = await asyncAction(
				WalletNFTsService.requestUpdateNFTs(getNetworkName(), myAddress)
			)

			if (partialNFTs) {
				const { ownedTokens, ownedCollections } = partialNFTs ?? {}

				setCollections(ownedCollections)
				setNFTs(ownedTokens)
			}

			setPartiallyLoading(false)

			const [, fullNFTs] = await asyncAction(
				promiseRetry(
					{ minTimeout: 125, retries: 100, factor: 2, randomize: true },
					async retry => {
						const [error, response] = await asyncAction(
							WalletNFTsService.requestNFTs(getNetworkName(), myAddress)
						)

						if (response?.state === WALLET_NFT_STATE.isUpdating) {
							return retry("Try again, It's not ready yet!")
						}

						// If we get a partial result, we need to call update on the API once again
						if (response?.state === WALLET_NFT_STATE.Partial) {
							await fetchMyNFTs()
						}

						if (error) {
							return retry('Try again state unknown')
						}

						return response
					}
				) as Promise<WalletNFTsResponse>
			)

			if (fullNFTs) {
				const { ownedTokens, ownedCollections } = fullNFTs ?? {}

				setCollections(ownedCollections)
				setNFTs(ownedTokens)
			}
		}
		setFullyLoading(false)
	}

	React.useEffect(() => {
		if (wallet.status === WalletStatus.WALLET_CONNECTED) {
			fetchMyNFTs()
		}
	}, [wallet.connection, wallet.network])

	const ownedNFTs = React.useMemo(
		() =>
			NFTs.filter(
				nft =>
					// Filter by collections
					(filters.collectionAddresses.length
						? filters.collectionAddresses.includes(nft.collectionAddress)
						: true) &&
					// Filter by name %LIKE
					(filters.name
						? (nft?.name || '')
								.toLowerCase()
								.match(`^${filters.name.toLowerCase()}.*$`)
						: true)
			),
		[filters, NFTs]
	)

	return {
		ownedNFTs,
		ownedCollections: collections,
		partiallyLoading,
		fullyLoading,
		fetchMyNFTs,
	}
}

export default useMyNFTs
