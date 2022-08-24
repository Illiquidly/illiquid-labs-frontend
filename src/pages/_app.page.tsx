import './styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'rc-tooltip/assets/bootstrap_white.css'
import '@djthoms/pretty-checkbox'
import {
	getChainOptions,
	StaticWalletProvider,
	WalletControllerChainOptions,
	WalletProvider,
} from '@illiquid-labs/wallet-provider'
import { useWallet } from '@illiquid-labs/use-wallet'
import { AppProps } from 'next/app'
import React from 'react'
import { theme } from 'components/theme/theme'
import { ThemeProvider, Flex, Box } from 'theme-ui'
import blockchain from 'utils/blockchain/terraUtils'
import { RecoilRoot } from 'recoil'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextComponentType, NextPageContext } from 'next/types'
import Head from 'next/head'
import { OnlyOnDesktop } from 'components/ui/layout-1/Layout'
import Footer from 'components/ui/footer-1/Footer'

const queryClient = new QueryClient()

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
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				/>
				<title>Illiquid Labs | NFT Infrastructure</title>
			</Head>

			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<RecoilRoot>
						<Flex
							sx={{
								position: 'fixed',
								inset: 0,
								flexDirection: 'column',
							}}
						>
							{/* <Header /> */}
							<Box sx={{ height: '79px', width: '100%', bg: 'secondary600' }}>
								Header
							</Box>
							<Component {...pageProps} />
							<OnlyOnDesktop>
								<Footer />
							</OnlyOnDesktop>
						</Flex>
					</RecoilRoot>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	)
}
export default function App({
	Component,
	defaultNetwork,
	walletConnectChainIds,
	pageProps,
}: AppProps & WalletControllerChainOptions) {
	return typeof window !== 'undefined' ? (
		<WalletProvider
			defaultNetwork={defaultNetwork}
			walletConnectChainIds={walletConnectChainIds}
		>
			<Main {...{ Component, pageProps }} />
		</WalletProvider>
	) : (
		<StaticWalletProvider defaultNetwork={defaultNetwork}>
			<Main {...{ Component, pageProps }} />
		</StaticWalletProvider>
	)
}

App.getInitialProps = async () => {
	const chainOptions = await getChainOptions()
	return {
		...chainOptions,
	}
}
