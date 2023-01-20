import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import { SUPPORTED_CURRENCIES } from 'constants/useQueryKeys'
import { SupportedCurrenciesService } from 'services/api/supportedCurrenciesService'

export default function useSupportedCurrencies() {
	const wallet = useWallet()

	const { data: supportedCurrencies } = useQuery(
		[SUPPORTED_CURRENCIES, wallet.network.chainID],
		async () =>
			SupportedCurrenciesService.getSupportedCurrencies(wallet.network.chainID),
		{
			enabled: !!wallet.network.chainID,
			retry: 5,
		}
	)

	return supportedCurrencies
}
