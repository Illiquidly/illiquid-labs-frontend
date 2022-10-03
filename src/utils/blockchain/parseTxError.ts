import {
	CreateTxFailed,
	Timeout,
	TxFailed,
	TxUnspecifiedError,
	UserDenied,
} from '@terra-money/use-wallet'

export function parseTxError(error: unknown) {
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
	return `Unknown Error: ${
		error instanceof Error ? error.message : String(error)
	}`
}

export default parseTxError
