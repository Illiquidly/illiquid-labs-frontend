import { useConnectedWallet } from '@terra-money/wallet-provider'

const useAddress = () => {
	const connectedWallet = useConnectedWallet()
	return connectedWallet?.terraAddress ?? 'no-wallet'
}

export default useAddress
