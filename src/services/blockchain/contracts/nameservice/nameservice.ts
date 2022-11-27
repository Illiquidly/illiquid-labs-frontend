import { CONTRACT_NAME } from 'constants/addresses'
import terraUtils from 'utils/blockchain/terraUtils'
import { keysToCamel } from 'utils/js/keysToCamel'
import { Contract } from '../shared'

export type Binary = string
export type EmbeddedLogo =
	| {
			svg: Binary
	  }
	| {
			png: Binary
	  }

export type Logo =
	| {
			url: string
	  }
	| {
			embedded: EmbeddedLogo
	  }
export interface Metadata {
	contractAddress?: string | null
	discord?: string | null
	email?: string | null
	externalUrl?: string | null
	github?: string | null
	image?: string | null
	imageData?: Logo | null
	name?: string | null
	parentTokenId?: string | null
	pgpPublicKey?: string | null
	publicBio?: string | null
	publicName?: string | null
	telegram?: string | null
	twitter?: string | null
	[k: string]: unknown
}
export interface ReverseRecordResponse {
	name: string
	tokenId: string
	[k: string]: unknown
}
export interface ReverseRecordsItemResponse {
	address: string
	record?: ReverseRecordResponse | null
	[k: string]: unknown
}
export interface ReverseRecordsResponse {
	records: ReverseRecordsItemResponse[]
	[k: string]: unknown
}

export interface NftInfoResponse {
	extension: Metadata
	tokenUri?: string | null
	[k: string]: unknown
}

class NameServiceContract extends Contract {
	static async getOwnerOfDomain(tokenId: string): Promise<string> {
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

	static async reverseRecords(
		addresses: string[]
	): Promise<ReverseRecordsResponse> {
		const contractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.nameService
		)

		const response = await terraUtils.sendQuery(contractAddress, {
			reverse_records: {
				addresses,
			},
		})

		return keysToCamel(response)
	}

	static async getDomainInfo(tokenId: string): Promise<NftInfoResponse> {
		const contractAddress = terraUtils.getContractAddress(
			CONTRACT_NAME.nameService
		)

		const response = await terraUtils.sendQuery(contractAddress, {
			nft_info: {
				token_id: tokenId,
			},
		})

		return keysToCamel(response)
	}
}

export default NameServiceContract
