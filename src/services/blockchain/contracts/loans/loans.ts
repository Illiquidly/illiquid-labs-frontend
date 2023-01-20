import { CONTRACT_NAME } from 'constants/addresses'
import { BLOCKS_PER_DAY } from 'constants/core'
import { NFT } from 'services/api/walletNFTsService'
import terraUtils, { amountConverter } from 'utils/blockchain/terraUtils'
import { Contract } from '../shared'

class LoansContract extends Contract {
	static async cancelLoanListing(loanId: string | number) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				withdraw_collaterals: {
					loan_id: loanId,
				},
			},
		})
	}

	static async createLoanListing(
		nfts: NFT[],
		durationInDays: number,
		interestRate: number,
		amountNative: number | string,
		previewNFT: NFT,
		comment?: string
	) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				deposit_collaterals: {
					tokens: nfts.map(({ collectionAddress, tokenId }) => ({
						cw721_coin: {
							address: collectionAddress,
							token_id: tokenId,
						},
					})),
					terms: {
						duration_in_blocks: durationInDays * BLOCKS_PER_DAY,
						interest: interestRate,
						principle: {
							amount:
								amountConverter.default.userFacingToBlockchainValue(amountNative),
							denom: terraUtils.getDefaultChainDenom(),
						},
					},
					comment,
					loan_preview: {
						cw721_coin: {
							address: previewNFT.collectionAddress,
							token_id: previewNFT.tokenId,
						},
					},
				},
			},
		})
	}
}

export default LoansContract
