import { useConnectedWallet } from '@terra-money/wallet-provider'

export const NO_WALLET = 'no-wallet'

const useAddress = () => {
	const connectedWallet = useConnectedWallet()
	return connectedWallet?.terraAddress ?? NO_WALLET
}

export default useAddress
