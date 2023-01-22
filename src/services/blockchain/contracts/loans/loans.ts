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

	static async modifyLoanListing(
		loanId: string | number,
		durationInDays: number | string,
		interestRate: number | string,
		amountNative: number | string,
		comment?: string
	) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				modify_collaterals: {
					loan_id: loanId,
					terms: {
						duration_in_blocks: +durationInDays * BLOCKS_PER_DAY,
						interest: String(interestRate),
						principle: {
							amount:
								amountConverter.default.userFacingToBlockchainValue(amountNative),
							denom: terraUtils.getDefaultChainDenom(),
						},
					},
					...(comment ? { comment } : {}),
				},
			},
		})
	}

	static async createLoanListing(
		nfts: NFT[],
		durationInDays: number | string,
		interestRate: number | string,
		amountNative: number | string,
		previewNFT: NFT,
		comment?: string
	) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postManyTransactions([
			...nfts.flatMap(({ collectionAddress, tokenId }) => [
				{
					contractAddress: collectionAddress,
					message: {
						approve: {
							spender: loanContractAddress,
							token_id: tokenId,
						},
					},
				},
			]),
			{
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
							duration_in_blocks: +durationInDays * BLOCKS_PER_DAY,
							interest: String(interestRate),
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
			},
		])
	}

	static async makeLoanOffer(
		loanId: string | number,
		borrower: string,
		durationInDays: number | string,
		interestRate: number | string,
		amountNative: number | string,
		comment?: string
	) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				make_offer: {
					borrower,
					loan_id: +loanId,
					terms: {
						duration_in_blocks: +durationInDays * BLOCKS_PER_DAY,
						interest: String(interestRate),
						principle: {
							amount:
								amountConverter.default.userFacingToBlockchainValue(amountNative),
							denom: terraUtils.getDefaultChainDenom(),
						},
					},
					comment,
				},
			},
		})
	}

	static async cancelOffer(globalOfferId: string) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				cancel_offer: {
					global_offer_id: globalOfferId,
				},
			},
		})
	}

	static async refuseOffer(globalOfferId: string) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				refuse_offer: {
					global_offer_id: globalOfferId,
				},
			},
		})
	}

	static async withdrawRefusedOffer(globalOfferId: string) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				withdraw_refused_offer: {
					global_offer_id: globalOfferId,
				},
			},
		})
	}

	static async acceptOffer(globalOfferId: string) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				accept_offer: {
					global_offer_id: globalOfferId,
				},
			},
		})
	}

	static async fundLoan(
		loanId: number,
		borrower: string,
		amountNative: number | string,
		comment?: string
	) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				accept_loan: {
					loan_id: loanId,
					borrower,
					...(comment ? { comment } : {}),
				},
			},
			coins: {
				luna: amountConverter.default.userFacingToBlockchainValue(amountNative),
			},
		})
	}

	static async repayBorrowedFunds(loanId: number, amountNative: number) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				repay_borrowed_funds: {
					loan_id: loanId,
				},
			},
			coins: {
				luna: amountConverter.default.userFacingToBlockchainValue(amountNative),
			},
		})
	}

	static async withdrawDefaultedLoan(loanId: number, borrower: string) {
		const loanContractAddress = terraUtils.getContractAddress(CONTRACT_NAME.loan)

		return terraUtils.postTransaction({
			contractAddress: loanContractAddress,
			message: {
				withdraw_defaulted_loan: {
					loan_id: loanId,
					borrower,
				},
			},
		})
	}
}

export default LoansContract
