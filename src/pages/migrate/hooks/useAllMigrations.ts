// import pMap from 'p-map'
import React from 'react'
import cw721Migrator, {
	LOOTOPIAN_ITEM_ESCROW_CONTRACT,
	// LOOTOPIAN_ITEM_ESCROW_CONTRACT,
	RegisteredTokenInfo,
} from 'services/blockchain/contracts/cw721Migrator'
import { asyncAction } from 'utils/js/asyncAction'
import cw721Contract from 'services/blockchain/contracts/cw721'
import { useWallet } from '@illiquid-labs/use-wallet'
import { MIGRATOR_TARGET_CHAIN_ID } from 'constants/migratorConfig'
import { useQuery } from '@tanstack/react-query'
import { MigratableCollectionsService } from 'services/api/migratableCollectionsService'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import pMap from 'p-map'
import promiseRetry from 'promise-retry'

export type UpgradableCollection = {
	name: string
	escrowContract: string
	contract1: string
	contract2: string
}

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

export type MigrationCollectionListResponse = {
	[key: string]: UpgradableCollection
}

export default function useAllMigrations() {
	const [loading, setLoading] = React.useState(true)
	const wallet = useWallet()

	const [allMigrations, setAllMigrations] = React.useState<Migration[]>([])

	const { data: migratableCollections } = useQuery(
		['migratableCollections'],
		async () => MigratableCollectionsService.getMigratableCollections()
	)

	const parseCw721Response = React.useCallback(
		async (cw721: RegisteredTokenInfo & UpgradableCollection) => {
			const contractInfo = await promiseRetry(
				{ minTimeout: 100, retries: 30, factor: 1.5, randomize: true },
				async () => cw721Migrator.memoizedGetContractInfo(cw721.contract1)
			)

			const nftInfo = await promiseRetry(
				{ minTimeout: 100, retries: 30, factor: 1.5, randomize: true },
				async () =>
					cw721Migrator.getNFTInfo(
						cw721.contract1 as string,
						cw721.tokenId as string
					)
			)

			const imageUrl = fromIPFSImageURLtoImageURL(nftInfo?.extension?.image)

			// Try from parse tokenId from name, this is case for Galactic Punks where token id does not mach with name.
			const [, gpTokenId] = (nftInfo.extension?.name ?? '').split(
				'Galactic Punk #'
			)

			const [, tokenOwnerResponse] = await asyncAction(
				promiseRetry(
					{ minTimeout: 100, retries: 30, factor: 1.5, randomize: true },
					async () =>
						cw721Contract.getOwnerOfToken(cw721.contract2, gpTokenId || cw721.tokenId)
				)
			)

			return {
				...cw721,
				collectionName: contractInfo.name,
				name: nftInfo.extension?.name ?? '',
				tokenId: cw721.tokenId,
				contractAddress: cw721.contract1,
				imageUrl,
				migrated: !!tokenOwnerResponse,
				feeInfo: {
					projectPrice: '0',
					feePrice: '0',
				},
			}
		},
		[]
	)

	const fetchMigrations = async () => {
		setLoading(true)
		await pMap(
			Object.values(migratableCollections || []),
			async ({ escrowContract, ...rest }) => {
				const registeredTokens =
					cw721Migrator.fetchRegisteredMigrationsUntilEnd(escrowContract)

				// Generic
				let registeredTokensResult = await registeredTokens.next()
				while (!registeredTokensResult.done) {
					const cw721s = registeredTokensResult.value.map(token => ({
						...token,
						...rest,
						escrowContract,
					}))

					// eslint-disable-next-line no-await-in-loop
					const cw721sExtended = await pMap(
						cw721s,
						async cw721 => parseCw721Response(cw721),
						{
							concurrency: 30,
						}
					)

					setAllMigrations(oldValue => [...oldValue, ...cw721sExtended])

					// eslint-disable-next-line no-await-in-loop
					registeredTokensResult = await registeredTokens.next()
				}

				// Lootopians specific extra.
				if (escrowContract === LOOTOPIAN_ITEM_ESCROW_CONTRACT) {
					const lootopiansRegisteredTokens =
						cw721Migrator.fetchLootopianItemsRegisteredMigrationsUntilEnd()
					let lootopiansRegisteredTokensResult =
						await lootopiansRegisteredTokens.next()

					while (!lootopiansRegisteredTokensResult.done) {
						const cw721s = lootopiansRegisteredTokensResult.value.map(token => ({
							...token,
							...rest,
							escrowContract,
						}))

						// eslint-disable-next-line no-await-in-loop
						const cw721sExtended = await pMap(
							cw721s,
							async cw721 => parseCw721Response(cw721),
							{
								concurrency: 30,
							}
						)

						setAllMigrations(oldValue => [...oldValue, ...cw721sExtended])

						// eslint-disable-next-line no-await-in-loop
						lootopiansRegisteredTokensResult = await lootopiansRegisteredTokens.next()
					}
				}
			},
			{ concurrency: 1 }
		)
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
		allMigrations,
		loading,
		parseCw721Response,
	}
}
