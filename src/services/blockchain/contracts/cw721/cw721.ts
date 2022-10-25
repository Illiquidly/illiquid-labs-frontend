import { TxReceipt } from 'services/blockchain/blockchain.interface'

import terraUtils from 'utils/blockchain/terraUtils'

import type { TransactionDetails } from 'utils/blockchain/terraUtils'
import { Contract } from '../shared'

const LIMIT = 30

export interface NFTWithRecipient {
	nftAddress: string
	tokenId: string
	recipient: string
}

class Cw721Contract extends Contract {
	static async transferToken(
		nftContractAddress: string,
		tokenId: string,
		userAddress: string
	): Promise<TxReceipt> {
		return terraUtils.postTransaction({
			contractAddress: nftContractAddress,
			message: {
				transfer_nft: {
					token_id: tokenId,
					recipient: userAddress,
				},
			},
		})
	}

	static async transferMultipleToken(
		nfts: NFTWithRecipient[]
	): Promise<TxReceipt> {
		const txs: TransactionDetails[] = nfts
			.map(nft => ({
				contractAddress: nft.nftAddress,
				message: {
					transfer_nft: {
						token_id: nft.tokenId,
						recipient: nft.recipient,
					},
				},
			}))
			.filter(nft => nft.contractAddress)
		return terraUtils.postManyTransactions(txs)
	}

	static async getTokenIdsOwnedByUserWithOffset(
		nftContractAddress: string,
		userAddress: string,
		startAfterTokenId?: string
	): Promise<string[]> {
		const response = await terraUtils.sendQuery(nftContractAddress, {
			tokens: {
				limit: LIMIT,
				owner: userAddress,
				start_after: startAfterTokenId,
			},
		})

		// Unstables: Guardians of Terra returns different data
		if (response.tokens?.[0]?.token_id) {
			return response.tokens.map((token: any) => token.token_id)
		}

		return response.tokens
	}

	static async getTokensOwnedByUserCountInCollection(
		nftContractAddress: string
	): Promise<number> {
		const userAddress = await terraUtils.getWalletAddress()

		const tokenIds = await this.getTokenIdsOwnedByUserWithOffset(
			nftContractAddress,
			userAddress
		)

		return tokenIds ? tokenIds.length : 0
	}

	static async getOwnerOfToken(
		nftContractAddress: string,
		tokenId: string
	): Promise<string> {
		const response = await terraUtils.sendQuery(nftContractAddress, {
			owner_of: {
				token_id: tokenId,
			},
		})

		return response.owner
	}

	static async getNFTInfo(
		nftContractAddress: string,
		tokenId: string
	): Promise<any> {
		return terraUtils.sendQuery(nftContractAddress, {
			nft_info: {
				token_id: tokenId,
			},
		})
	}
}

export default Cw721Contract
