import { AxiosError } from 'axios'
import { amountConverter } from './terraUtils'

// TODO: this can be written cleaner, but okay for now.
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
	if (error?.response?.data?.message) {
		return processErrorMessage(error.response.data.message)
	}

	return `Unknown Error: ${
		error instanceof Error ? error.message : String(error)
	}`
}

export default parseTxError
