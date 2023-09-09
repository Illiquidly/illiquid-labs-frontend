import { useConnectedWallet } from '@terra-money/wallet-kit'
import { getChainId } from 'utils/blockchain/terraUtils'

export const NO_WALLET = 'no-wallet'

const useAddress = () => {
	const connectedWallet = useConnectedWallet()

	return connectedWallet?.addresses[getChainId()] ?? NO_WALLET
}

export default useAddress
