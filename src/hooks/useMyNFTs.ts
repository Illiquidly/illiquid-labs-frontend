import { useWallet, WalletStatus } from '@illiquid-labs/use-wallet'
import React from 'react'
import { asyncAction } from 'utils/js/asyncAction'
import { keysToCamel } from 'utils/js/keysToCamel'
import pMap from 'p-map'
import cw721 from 'services/blockchain/contracts/cw721'
import promiseRetry from 'promise-retry'
import { getNetworkName } from 'utils/blockchain/terraUtils'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import {
	WalletNFTsService,
	WalletNFTState,
} from 'services/api/walletNFTsService'
import { useRouter } from 'next/router'
import { NFT } from 'pages/migrate/components/NFTPreviewCard/NFTPreviewCard'

export interface Collection {
	collectionName: string
	collectionAddress: string
}

function useMyNFTs() {
	const [nfts, setNfts] = React.useState<NFT[]>([])
	const [collections, setCollections] = React.useState<Collection[]>([])
	const wallet = useWallet()
	const { query } = useRouter()
	const myAddress = (query?.address as string) || wallet.wallets[0]?.terraAddress

	const [nftsPartiallyLoading, setNFTsPartiallyLoading] = React.useState(false)
	const [nftsFullyLoading, setNFTsFullyLoading] = React.useState(false)

	async function setNFTs(oNfts = {}): Promise<void> {
		const ownerCW721sContractInfo = await pMap(
			Object.values(oNfts).filter((o: any) => Object.keys(o.tokens).length),
			async (contract: any) => {
				const [error, contractInfo] = await asyncAction(
					cw721.memoizedGetContractInfo(contract.contract as string)
				)

				if (error) {
					return null
				}

				return {
					...contract,
					contractInfo,
				}
			},
			{ concurrency: 10 }
		)

		const ownedCW721s = ownerCW721sContractInfo.filter(x => x)

		setCollections(
			ownedCW721s.map(({ contractInfo, contract }: any) => ({
				collectionName: contractInfo?.name ?? '',
				collectionAddress: contract,
			}))
		)

		setNfts(
			keysToCamel(ownedCW721s).flatMap(({ contract, tokens, contractInfo }: any) =>
				Object.values(tokens).map(({ tokenId, nftInfo }: any) => ({
					tokenId: tokenId?.tokenId ? tokenId?.tokenId : tokenId,
					contractAddress: contract,
					...nftInfo,
					...nftInfo.extension,
					collectionName: contractInfo?.name ?? '',
					imageUrl: fromIPFSImageURLtoImageURL(nftInfo?.extension?.image),
				}))
			)
		)
	}

	async function fetchMyAssets() {
		setNFTsPartiallyLoading(true)
		setNFTsFullyLoading(true)

		if (myAddress) {
			const [, partialNFTs] = await asyncAction(
				WalletNFTsService.requestUpdateNFTs(getNetworkName(), myAddress)
			)

			if (partialNFTs?.data) {
				const { ownedTokens } = partialNFTs?.data ?? {}

				setNFTs(ownedTokens)
			}

			setNFTsPartiallyLoading(false)

			const [, fullNFTs] = await asyncAction(
				promiseRetry(
					{ minTimeout: 125, retries: 100, factor: 2, randomize: true },
					async retry => {
						const [error, response] = await asyncAction(
							WalletNFTsService.requestNFTs(getNetworkName(), myAddress)
						)

						if (response?.data?.state === WalletNFTState.isUpdating) {
							return retry("Try again, It's not ready yet!")
						}

						if (error) {
							return retry('Try again state unknown')
						}

						return response
					}
				)
			)

			if (fullNFTs?.data) {
				const { ownedTokens } = fullNFTs?.data ?? {}

				setNFTs(ownedTokens)
			}
		}
		setNFTsFullyLoading(false)
	}

	React.useEffect(() => {
		if (wallet.status === WalletStatus.WALLET_CONNECTED) {
			fetchMyAssets()
		}
	}, [wallet.connection, wallet.network])

	return {
		nfts,
		collections,
		nftsPartiallyLoading,
		nftsFullyLoading,
		fetchMyAssets,
	}
}

export default useMyNFTs
