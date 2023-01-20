import { assetsAxios } from 'services/axios'
import { NetworkId } from 'types'

type SupportedToken = {
	token: string
	symbol: string
	name: string
	icon: string
	protocol: string
	contractAddress: string
	decimals?: number
}

type SupportedCoin = {
	token: string
	symbol: string
	name: string
	icon: string
	chains: NetworkId[]
	decimals?: number
	denom?: string
}

type TokenResponse = (SupportedToken | SupportedCoin)[]

const chainIdMap = {
	'phoenix-1': 'mainnet',
	'pisco-1': 'testnet',
	'columbus-5': 'classic',
}

export class SupportedCurrenciesService {
	public static async getSupportedCurrencies(
		chainId: string
	): Promise<TokenResponse> {
		const cw20sResponse = await assetsAxios.get('cw20/tokens.json')

		const cw20s: SupportedToken[] = Object.entries(
			cw20sResponse?.data[chainIdMap[chainId] ?? 'phoenix-1'] ?? []
		).map(([key, value]: any) => ({
			...value,
			contractAddress: key,
		}))

		const coinsResponse = await assetsAxios.get('station/coins.json')

		const coins: SupportedCoin[] = Object.entries(coinsResponse?.data)
			.filter(([, value]: any) => (value?.chains ?? []).includes(chainId))
			.map(([key, value]: any) => ({
				...value,
				denom: key,
			}))

		return [...cw20s, ...coins]
	}
}
