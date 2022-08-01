import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<meta charSet='utf-8' />
				<meta name='terra-wallet' />
				<link rel='icon' href='/logo.png' />
				<link rel='apple-touch-icon' href='/logo.png' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				/>
				<link rel='shortcut icon' href='/favicon.ico' />
				<meta name='theme-color' content='#000000' />
				<meta name='description' content='Illiquid Labs | NFT Infrastructure' />
				<title>Illiquid Labs | NFT Infrastructure</title>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
