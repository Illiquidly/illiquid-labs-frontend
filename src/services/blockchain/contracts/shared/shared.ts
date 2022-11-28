import terraUtils from 'utils/blockchain/terraUtils'
import { keysToCamel } from 'utils/js/keysToCamel'

export interface ContractInfo {
	name: string
	[key: string]: unknown
}

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
