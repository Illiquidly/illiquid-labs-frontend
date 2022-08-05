import { Migration } from 'pages/migrate/hooks/useMyMigrations'
import promiseRetry from 'promise-retry'
import { migratorClient } from 'services/axios'
import { keysToCamel } from 'utils/js/keysToCamel'

const getMigratorURL = (myAddress: string, migration: Migration): string => {
	// If a lootopianTokenId was specified, we need to use the special API

	if (migration.lootopianTokenId) {
		return `/migrator/migrate/lootopian-item/${myAddress}/${migration.contractAddress}/${migration.lootopianTokenId}/${migration.tokenId}`
	}

	// If not, use the standard API
	return `/migrator/migrate/${myAddress}/${migration.contractAddress}/${migration.tokenId}`
}

export class MigratorService {
	static async getClaimRequest(myAddress: string, migration: Migration) {
		const apiResponse = await promiseRetry(
			{ minTimeout: 200, retries: 5, factor: 2, randomize: true },
			async () => migratorClient.get(getMigratorURL(myAddress, migration))
		)
		return keysToCamel(apiResponse.data)
	}
}
