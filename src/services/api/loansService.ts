import { axios } from 'services/axios'
import { keysToCamel } from 'utils/js/keysToCamel'

type Principle = {
	denom: string
	amount: string
}

type Terms = {
	principle: Principle
	interest: string
	durationInBlocks: number
}

type DepositedFunds = {
	denom: string
	amount: string
}

type Offer = {
	id: number
	network: string
	globalOfferId: string
	borrower: string
	loanId: number
	lender: string
	loan: string
	terms: Terms
	state: string
	listDate: string
	depositedFunds: DepositedFunds
	comment: string
}

type LoanFavorites = {
	id: number
	network: string
	user: string
	loans: string[]
}

type Loan = {
	id: number
	network: string
	borrower: string
	loanId: number
	state: string
	listDate: string
	offerAmount: number
	loanFavorites: LoanFavorites[]
	terms: Terms
	startBlock: number
	comment: string
	activeOfferId: string
	offers: Offer[]
	cw721Assets: any[]
	cw1155Assets: any[]
	loanPreview: string
}

export class LoansService {
	public static async getLoan(
		network: string,
		loanId: string,
		borrower: string
	): Promise<Loan> {
		const response = await axios.patch(
			`loans?network=${network}&loanId=${loanId}&borrower=${borrower}`
		)

		return keysToCamel(response.data)
	}
}
