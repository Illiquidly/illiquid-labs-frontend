import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<meta charSet='utf-8' />
				<meta name='terra-wallet' />
				<link rel='icon' href='/logo.png' />
				<link rel='apple-touch-icon' href='/logo.png' />
				<link rel='shortcut icon' href='/favicon.ico' />
				<meta name='theme-color' content='#000000' />
				<meta name='description' content='Illiquid Labs | NFT Infrastructure' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
