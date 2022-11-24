import { CONTRACT_NAME } from 'constants/addresses'
import terraUtils from 'utils/blockchain/terraUtils'
import { Contract } from '../shared'

class NameServiceContract extends Contract {
	static async reverseRecord(tokenId: string): Promise<string> {
		const contractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.nameService
		)

		const response = await terraUtils.sendQuery(contractAddress, {
			owner_of: {
				token_id: tokenId,
			},
		})

		return response.owner
	}
}

export default NameServiceContract
