import pMap from 'p-map'
import pMemoize from 'p-memoize'
import { migratorClient } from 'services/axios'
import cw721Migrator from 'services/blockchain/contracts/cw721Migrator'
import { asyncAction } from 'utils/js/asyncAction'
import { keysToCamel } from 'utils/js/keysToCamel'

const memoizedAxiosGet = pMemoize(migratorClient.get)

export type MigratableCollection = {
	name: string
	escrowContract: string
	contract1: string
	contract2: string
	minterContract: string
	feeInfo: {
		projectPrice: string
		feePrice: string
	}
}

export type MigrationCollectionListResponse = {
	[key: string]: MigratableCollection
}

export class MigratableCollectionsService {
	static async getMigratableCollections(): Promise<MigrationCollectionListResponse> {
		const migrationListResponse = await memoizedAxiosGet(
			'/migrator/contract_list'
		)

		const migrationList = await pMap(
			Object.entries(keysToCamel(migrationListResponse.data)) as any,
			async ([key, value]: [string, any]) => {
				const [, feeInfo] = await asyncAction(
					cw721Migrator.getClaimFeePrice(value.minterContract)
				)
				return [
					key,
					{
						...value,
						feeInfo: feeInfo ?? {
							projectPrice: '0',
							feePrice: '0',
						},
					},
				]
			},
			{ concurrency: 5 }
		)

		return Object.fromEntries(migrationList)
	}
}
