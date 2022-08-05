import pMap from 'p-map'
import React from 'react'
import cw721Migrator, {
	LOOTOPIAN_ITEM_ESCROW_CONTRACT,
	RegisteredTokenInfo,
} from 'services/blockchain/contracts/cw721Migrator'

import { useQuery } from '@tanstack/react-query'
import { asyncAction } from 'utils/js/asyncAction'
import { useWallet } from '@illiquid-labs/use-wallet'
import cw721Contract from 'services/blockchain/contracts/cw721'
import { MIGRATOR_TARGET_CHAIN_ID } from 'constants/migratorConfig'
import {
	MigratableCollection,
	MigratableCollectionsService,
} from 'services/api/migratableCollectionsService'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import { useRouter } from 'next/router'

export type Migration = {
	contract1: string
	collectionName: string
	name: string
	tokenId: string
	contractAddress: string
	imageUrl: string[]
	migrated: boolean
	feeInfo: {
		projectPrice: string
		feePrice: string
	}
	lootopianTokenId?: string
}

export default function useMyMigrations() {
	const [error, setError] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const wallet = useWallet()

	const { query } = useRouter()

	const myAddress = (query.address as string) || wallet.wallets[0]?.terraAddress

	const { data: migratableCollections } = useQuery(
		['migratableCollections'],
		async () => MigratableCollectionsService.getMigratableCollections()
	)

	const [myMigrations, setMyMigrations] = React.useState<Migration[]>([])

	const parseCw721Response = async (
		cw721: RegisteredTokenInfo & MigratableCollection
	) => {
		const contractInfo = await cw721Migrator.memoizedGetContractInfo(
			cw721.contract1
		)

		const nftInfo = await cw721Migrator.getNFTInfo(
			cw721.contract1 as string,
			cw721.tokenId as string
		)

		const imageUrl = fromIPFSImageURLtoImageURL(nftInfo?.extension?.image)

		// Try from parse tokenId from name, this is case for Galactic Punks where token id does not mach with name.
		const [, gpTokenId] = (nftInfo.extension?.name ?? '').split('Galactic Punk #')

		const [, tokenOwnerResponse] = await asyncAction(
			cw721Contract.getOwnerOfToken(cw721.contract2, gpTokenId || cw721.tokenId)
		)

		return {
			...cw721,
			collectionName: contractInfo.name,
			name: nftInfo.extension?.name ?? '',
			tokenId: cw721.tokenId,
			contractAddress: cw721.contract1,
			imageUrl,
			migrated: !!tokenOwnerResponse,
			feeInfo: (migratableCollections ?? {})[cw721.contract1].feeInfo,
		}
	}

	const fetchMigrations = async () => {
		setLoading(true)

		const [migrationsError, migrationsResponse] = await asyncAction(
			pMap(
				Object.values(migratableCollections ?? {}),
				async ({ escrowContract, ...rest }) => {
					// TODO: Switch to lookup map if > 2 items
					const response = await (escrowContract === LOOTOPIAN_ITEM_ESCROW_CONTRACT
						? cw721Migrator.fetchLootopianItemsUserTokensUntilEnd(myAddress)
						: cw721Migrator.fetchUserTokensUntilEnd(escrowContract, myAddress))

					return response.map(token => ({
						...token,
						...rest,
					}))
				},

				{ concurrency: 10 }
			)
		)

		if (migrationsError) {
			setError(migrationsError)
		}

		if (migrationsResponse) {
			const cw721s: (RegisteredTokenInfo & MigratableCollection)[] =
				migrationsResponse.flat()

			const cw721sExtended = await pMap(
				cw721s,
				async cw721 => parseCw721Response(cw721),
				{
					concurrency: 50,
				}
			)

			setMyMigrations(cw721sExtended)
		}

		setLoading(false)
	}

	React.useEffect(() => {
		if (wallet.network.chainID !== MIGRATOR_TARGET_CHAIN_ID) {
			return
		}
		fetchMigrations()
	}, [migratableCollections])

	return {
		fetchMigrations,
		myMigrations,
		loading,
		error,
	}
}
