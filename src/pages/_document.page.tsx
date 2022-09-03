/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

export default class extends Document {
	render() {
		let currentLocale: string
		if (typeof this.props.__NEXT_DATA__.query.locale === 'string') {
			currentLocale = this.props.__NEXT_DATA__.query.locale
		} else currentLocale = i18nextConfig.i18n.defaultLocale

		return (
			<Html lang={currentLocale}>
				<Head>
					<meta charSet='utf-8' />
					<meta name='terra-wallet' />
					<link rel='icon' href='/logo.png' />
					<link rel='apple-touch-icon' href='/logo.png' />
					<link rel='shortcut icon' href='/favicon.ico' />
					<meta name='theme-color' content='#000000' />
					<meta name='description' content='Illiquid Labs | NFT Infrastructure' />
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Heebo:wght@400;500&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
