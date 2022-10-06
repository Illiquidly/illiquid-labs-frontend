import {
	CreateTxFailed,
	Timeout,
	TxFailed,
	TxUnspecifiedError,
	UserDenied,
} from '@terra-money/use-wallet'
import { AxiosError } from 'axios'

export function parseTxError(error: AxiosError<{ message?: string }>) {
	if (error instanceof UserDenied) {
		return 'User Denied'
	}
	if (error instanceof CreateTxFailed) {
		return `Create Tx Failed: ${error.message}`
	}
	if (error instanceof TxFailed) {
		return `Tx Failed: ${error.message}`
	}
	if (error instanceof Timeout) {
		return 'Timeout'
	}
	if (error instanceof TxUnspecifiedError) {
		return `Unspecified Error: ${error.message}`
	}

	if (error?.response?.data?.message) {
		return String(error?.response?.data?.message)
	}

	return `Unknown Error: ${
		error instanceof Error ? error.message : String(error)
	}`
}

export default parseTxError
