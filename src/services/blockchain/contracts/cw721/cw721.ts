import { TxReceipt } from 'services/blockchain/blockchain.interface'

import terraUtils from 'utils/blockchain/terraUtils'

import type { TransactionDetails } from 'utils/blockchain/terraUtils'
import { NFT } from 'services/api/walletNFTsService'
import { Contract } from '../shared'

class Cw721Contract extends Contract {
	static async transferMultipleToken(
		nfts: (NFT & { recipient: string })[],
		memo?: string
	): Promise<TxReceipt> {
		const txs: TransactionDetails[] = nfts
			.map(nft => ({
				contractAddress: nft.collectionAddress,
				message: {
					transfer_nft: {
						token_id: nft.tokenId,
						recipient: nft.recipient,
					},
				},
			}))
			.filter(nft => nft.contractAddress)
		return terraUtils.postManyTransactions(txs, memo)
	}

	static async transferToken(
		nft: NFT,
		recipient: string,
		memo?: string
	): Promise<TxReceipt> {
		return this.transferMultipleToken([{ ...nft, recipient }], memo)
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
}

export default Cw721Contract
