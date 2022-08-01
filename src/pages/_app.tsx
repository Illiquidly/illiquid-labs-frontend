import {
	getChainOptions,
	StaticWalletProvider,
	WalletControllerChainOptions,
	WalletProvider,
} from '@terra-money/wallet-provider'
import { AppProps } from 'next/app'
import Link from 'next/link'
import React from 'react'
import { theme } from 'src/components/theme'
import { ThemeProvider } from 'styled-components'

export default function App({
	Component,
	defaultNetwork,
	walletConnectChainIds,
	pageProps,
}: AppProps & WalletControllerChainOptions) {
	const main = (
		<ThemeProvider theme={theme}>
			<main>
				<header style={{ display: 'flex', gap: '1em' }}>
					<Link href='/'>Main</Link>
				</header>
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
