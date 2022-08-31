import '@djthoms/pretty-checkbox'
import { useWallet } from '@illiquid-labs/use-wallet'
import {
	getChainOptions,
	StaticWalletProvider,
	WalletControllerChainOptions,
	WalletProvider,
} from '@illiquid-labs/wallet-provider'
import { theme } from 'components/theme/theme'
import { AppProps } from 'next/app'
import 'rc-tooltip/assets/bootstrap_white.css'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'
import { Flex, ThemeProvider } from 'theme-ui'
import blockchain from 'utils/blockchain/terraUtils'
import './styles.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from 'components/ui/footer/Footer'
import Header from 'components/ui/header/Header'
import { ModalProvider } from 'context/modalContext'
import Head from 'next/head'
import { NextComponentType, NextPageContext } from 'next/types'

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
					<ModalProvider>
						<RecoilRoot>
							<Flex variant='appContainer'>
								<Header />
								<Component {...pageProps} />
								<Footer />
							</Flex>
						</RecoilRoot>
					</ModalProvider>
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
