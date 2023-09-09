import { useConnectedWallet } from '@terra-money/wallet-kit'
import { getChainId } from 'utils/blockchain/terraUtils'

export const NO_WALLET = 'no-wallet'

const useAddress = () => {
	const connectedWallet = useConnectedWallet()

	if (!connectedWallet?.network) {
		return NO_WALLET
	}

	return connectedWallet?.addresses[getChainId()] ?? NO_WALLET
}

export default useAddress
