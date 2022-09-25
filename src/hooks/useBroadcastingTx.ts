import { useEffect, useState } from 'react'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { parseTxResult } from 'utils/blockchain/parseTxResult'
import terraUtils from 'utils/blockchain/terraUtils'
import scrollToBottom from 'utils/react/scrollToBottom'
import useIsTablet from './react/useIsTablet'

export const useBroadcastingTx = (
	txId?: TxReceipt['txId'],
	onSuccessBroadcast?: (data: any) => void,
	scrollAfterTx = false
) => {
	const initialLoading = {
		send: false,
		broadcasting: false,
	}

	const [loading, setLoading] = useState(initialLoading)
	const [broadcasted, setBroadcasted] = useState(false)

	const isTablet = useIsTablet()

	const desktopLoadingText = loading.send
		? 'Check your wallet...'
		: 'Broadcasting transaction...'
	const mobileLoadingText = ''

	const loadingText =
		// eslint-disable-next-line no-nested-ternary
		loading.send || loading.broadcasting
			? isTablet
				? mobileLoadingText
				: desktopLoadingText
			: false

	useEffect(() => {
		if (txId) {
			setLoading({
				send: false,
				broadcasting: true,
			})
		}
	}, [txId])

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>

		if (txId && loading.broadcasting) {
			interval = setInterval(async () => {
				try {
					const txResult = await terraUtils.getTxResult(txId)

					if (txResult?.logs) {
						setLoading(initialLoading)

						// eslint-disable-next-line no-unused-expressions
						onSuccessBroadcast && onSuccessBroadcast(parseTxResult(txResult))

						setBroadcasted(true)

						// eslint-disable-next-line no-unused-expressions
						scrollAfterTx && scrollToBottom()
					}
				} catch (error) {
					setBroadcasted(true)
					setLoading(initialLoading)
					// eslint-disable-next-line no-unused-expressions
					scrollAfterTx && scrollToBottom()
				}
			}, 2000)
		}

		return () => {
			clearInterval(interval as ReturnType<typeof setInterval>)
		}
	}, [txId, loading])

	return {
		loading,
		setLoading,
		loadingText,
		broadcasted,
		setBroadcasted,
	}
}

export default useBroadcastingTx
