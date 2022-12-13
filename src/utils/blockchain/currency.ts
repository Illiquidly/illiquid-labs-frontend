import numeral from 'numeral'
import big, { BigSource } from 'big.js'

export const LUNA_MAX_DECIMALS_POINTS = 6

export const toDecimal = (num: BigSource, decimalPoints = 2): string => {
	const decimalNum = big(
		big(num)
			.mul(10 ** decimalPoints)
			.toFixed()
			.split('.')[0]
	).div(10 ** decimalPoints)

	return (Math.floor(parseFloat(decimalNum.toString()) * 100) / 100)
		.toFixed(decimalPoints)
		.toString()
}

export const formatDecimal = (num: BigSource) => {
	const decimalNum = toDecimal(num)

	const [integer, decimal] = decimalNum.split('.')

	// eslint-disable-next-line sonarjs/no-nested-template-literals
	return `${numeral(integer).format('0,0')}${decimal ? `.${decimal}` : ''}`
}

export const formatUSTDecimal = (num: BigSource) => `${formatDecimal(num)} UST`

export const formatLUNADecimal = (num: BigSource) =>
	`${formatDecimal(num)} LUNA`
