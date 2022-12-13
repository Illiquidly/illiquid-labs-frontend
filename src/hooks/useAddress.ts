import { useConnectedWallet } from '@terra-money/wallet-provider'

export const NO_WALLET = 'no-wallet'

// TODO: rename this to useMyAddress to be more specific
const useAddress = () => {
	const connectedWallet = useConnectedWallet()
	return connectedWallet?.terraAddress ?? NO_WALLET
}

export default useAddress
