import {
	CreateTxFailed,
	Timeout,
	TxFailed,
	TxUnspecifiedError,
	UserDenied,
} from '@illiquid-labs/use-wallet'
import { toast } from 'react-toastify'

export default function useTransactionError() {
	const parseError = (error: unknown) => {
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

	const showTransactionError = (error: unknown) => {
		toast.warn(parseError(error), {
			position: 'top-right',
			autoClose: 3500,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			pauseOnFocusLoss: false,
		})
	}

	return [showTransactionError]
}
