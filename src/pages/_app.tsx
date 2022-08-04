import {
	getChainOptions,
	StaticWalletProvider,
	WalletControllerChainOptions,
	WalletProvider,
} from '@illiquid-labs/wallet-provider'
import { AppProps } from 'next/app'
import React from 'react'
import { theme } from 'components/theme'
import { ThemeProvider } from 'theme-ui'
import './styles.css'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../components/ui/Header/Header'), {
	ssr: false,
})
export default function App({
	Component,
	defaultNetwork,
	walletConnectChainIds,
	pageProps,
}: AppProps & WalletControllerChainOptions) {
	const main = (
		<ThemeProvider theme={theme}>
			<main>
				<Header />
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	)

	return typeof window !== 'undefined' ? (
		<WalletProvider
			defaultNetwork={defaultNetwork}
			walletConnectChainIds={walletConnectChainIds}
		>
			{main}
		</WalletProvider>
	) : (
		<StaticWalletProvider defaultNetwork={defaultNetwork}>
			{main}
		</StaticWalletProvider>
	)
}

App.getInitialProps = async () => {
	const chainOptions = await getChainOptions()
	return {
		...chainOptions,
	}
}
