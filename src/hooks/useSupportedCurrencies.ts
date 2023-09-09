import { useQuery } from '@tanstack/react-query'
import { SUPPORTED_CURRENCIES } from 'constants/useQueryKeys'
import { SupportedCurrenciesService } from 'services/api/supportedCurrenciesService'
import { getChainId } from 'utils/blockchain/terraUtils'

export default function useSupportedCurrencies() {
	const chainId = getChainId()

	const { data: supportedCurrencies } = useQuery(
		[SUPPORTED_CURRENCIES, chainId],
		async () => SupportedCurrenciesService.getSupportedCurrencies(chainId),
		{
			enabled: !!chainId,
			retry: 5,
		}
	)

	return supportedCurrencies
}
