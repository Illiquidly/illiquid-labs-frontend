import { Head, Html, Main, NextScript } from 'next/document'

import Modal from 'react-modal'

Modal.setAppElement('#__next')

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
				<link
					href='https://fonts.googleapis.com/css2?family=Biryani:wght@200;300;400;600;700;800;900&display=swap'
					rel='stylesheet'
				/>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
