import terraUtils from 'utils/blockchain/terraUtils'
import { keysToCamel } from 'utils/js/keysToCamel'

export interface ContractInfo {
	name: string
	[key: string]: unknown
}

export type TerraCurrency = string

export class Contract {
	static async getContractInfo(
		nftContractAddress: string
	): Promise<ContractInfo> {
		const result = await terraUtils.sendQuery(nftContractAddress, {
			contract_info: {},
		})

		return keysToCamel(result)
	}
}

export function getDenomForCurrency(currency: TerraCurrency) {
	if (currency.toUpperCase() === 'LUNA') {
		return 'uluna'
	}
	if (currency.toUpperCase() === 'UST') {
		return 'uusd'
	}
	throw new Error(`Unsupported currency: ${currency}`)
}

export function getCurrencyForDenom(denom: string): TerraCurrency {
	if (denom.toLowerCase() === 'uusd') {
		return 'UST'
	}
	if (denom.toLowerCase() === 'uluna') {
		return 'LUNA'
	}
	throw new Error(`Unsupported denom: ${denom}`)
}
