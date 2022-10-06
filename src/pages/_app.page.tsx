import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import {
	getChainOptions,
	StaticWalletProvider,
	WalletControllerChainOptions,
	WalletProvider,
} from '@terra-money/wallet-provider'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { NextComponentType, NextPageContext } from 'next/types'
import { ThemeProvider } from 'theme-ui'

import { theme } from 'components'
import blockchain from 'utils/blockchain/terraUtils'
import './styles.css'

import 'rc-tooltip/assets/bootstrap_white.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import i18nConfig from '../../next-i18next.config'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			staleTime: 0,
			cacheTime: 0,
		},
	},
})

const Main = ({
	Component,
	pageProps,
}: {
	Component: NextComponentType<NextPageContext, any, {}>
	pageProps: any
}) => {
	const wallet = useWallet()

	blockchain.setWallet(wallet)

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<NiceModal.Provider>
					<Component {...pageProps} />
				</NiceModal.Provider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

const App = (props: AppProps) => {
	const [chainOptions, setChainOptions] =
		React.useState<WalletControllerChainOptions | null>(null)

	async function fetchChainOptions() {
		const options = await getChainOptions()

		setChainOptions(options)
	}
	React.useEffect(() => {
		fetchChainOptions()
	}, [])

	if (!chainOptions) {
		return null
	}
	const { defaultNetwork, walletConnectChainIds } = chainOptions
	return typeof window !== 'undefined' ? (
		<WalletProvider
			defaultNetwork={defaultNetwork}
			walletConnectChainIds={walletConnectChainIds}
		>
			<Main {...props} />
		</WalletProvider>
	) : (
		<StaticWalletProvider defaultNetwork={defaultNetwork}>
			<Main {...props} />
		</StaticWalletProvider>
	)
}

export default appWithTranslation(App, i18nConfig)
