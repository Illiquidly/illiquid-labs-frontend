import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
	InfoResponse,
	WalletProvider,
	getInitialConfig,
	useConnectedWallet,
	useLcdClient,
	useWallet,
} from '@terra-money/wallet-kit'
import TerraStationMobileWallet from '@terra-money/terra-station-mobile'

import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { NextComponentType, NextPageContext } from 'next/types'
import { ThemeProvider } from 'theme-ui'
import { GoogleAnalytics } from 'nextjs-google-analytics'

import { theme } from 'constants/theme'
import blockchain from 'utils/blockchain/terraUtils'
import './styles.css'

import 'rc-tooltip/assets/bootstrap_white.css'

import React, { useEffect, useState } from 'react'
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
	const connectedWallet = useConnectedWallet()
	const lcdClient = useLcdClient()

	blockchain.setWallet(wallet)
	blockchain.setConnectedWallet(connectedWallet)
	blockchain.setLcdClient(lcdClient)

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<NiceModal.Provider>
					<GoogleAnalytics trackPageViews />
					<Component {...pageProps} />
				</NiceModal.Provider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

const App = (props: AppProps) => {
	const [defaultNetworks, setDefaultNetworks] = useState<InfoResponse | null>(
		null
	)

	useEffect(() => {
		getInitialConfig().then(networks => setDefaultNetworks(networks))
	}, [])

	if (!defaultNetworks) {
		return null
	}
	return (
		<WalletProvider
			defaultNetworks={defaultNetworks}
			extraWallets={[new TerraStationMobileWallet()]}
		>
			<Main {...props} />
		</WalletProvider>
	)
}

export default appWithTranslation(App, i18nConfig)
