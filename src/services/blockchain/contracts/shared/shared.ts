import terraUtils from 'utils/blockchain/terraUtils'

export interface ContractInfo {
	name: string
	[key: string]: unknown
}

export type TerraCurrency = string

export class Contract {
	static async getContractInfo(
		nftContractAddress: string
	): Promise<ContractInfo> {
		const { name } = await terraUtils.sendQuery(nftContractAddress, {
			contract_info: {},
		})

		return {
			name,
		}
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

// function getCurrencyForDenom(denom: 'uusd' | 'uluna'): TerraCurrency {
// 	if (denom === 'uusd') {
// 		return 'UST'
// 	}
// 	if (denom === 'uluna') {
// 		return 'LUNA'
// 	}
// 	throw new Error(`Unsupported denom: ${denom}`)
// }
