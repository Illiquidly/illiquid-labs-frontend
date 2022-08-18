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
import { ThemeProvider } from 'styled-components'
import blockchain from 'utils/blockchain/terraUtils'
import { RecoilRoot } from 'recoil'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextComponentType, NextPageContext } from 'next/types'
import { ToastContainer } from 'components/ui/Toast/Toast.styled'
import Head from 'next/head'
import { Box, Flex } from 'reflexbox/styled-components'

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
							sx={{ position: 'fixed', left: 0, top: 0, bottom: 0, right: 0 }}
							flexDirection='column'
							flex={1}
						>
							{/* <Header /> */}
							{/* Header placeholder */}
							<Box bg='secondary600' width='100%' height={[79]} />
							<Box>
								<Component {...pageProps} />
							</Box>
						</Flex>
						<ToastContainer
							theme='dark'
							position='top-right'
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
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
