import {
	CreateTxFailed,
	Timeout,
	TxFailed,
	TxUnspecifiedError,
	UserDenied,
} from '@terra-money/use-wallet'
import { AxiosError } from 'axios'
import { amountConverter } from './terraUtils'

const processErrorMessage = message => {
	const coins = [...message.matchAll(/(\s+)([0-9]+)(u[a-zA-Z]+)/g)]
	let processedMessage = message
	coins.forEach(([toReplace, , amount, denom]) => {
		processedMessage = processedMessage.replace(
			toReplace,
			` ${Number(
				amountConverter.default.blockchainValueToUserFacing(amount)
			).toFixed(3)} ${denom.substring(1)}`
		)
	})

	return processedMessage
}

export function parseTxError(error: AxiosError<{ message?: string }>) {
	if (error instanceof UserDenied) {
		return 'User Denied'
	}
	if (error instanceof CreateTxFailed) {
		return processErrorMessage(`Create Tx Failed: ${error.message}`)
	}
	if (error instanceof TxFailed) {
		return processErrorMessage(`Tx Failed: ${error.message}`)
	}
	if (error instanceof Timeout) {
		return 'Timeout'
	}
	if (error instanceof TxUnspecifiedError) {
		return processErrorMessage(`Unspecified Error: ${error.message}`)
	}

	if (error?.response?.data?.message) {
		return processErrorMessage(error.response.data.message)
	}

	return `Unknown Error: ${
		error instanceof Error ? error.message : String(error)
	}`
}

export default parseTxError
