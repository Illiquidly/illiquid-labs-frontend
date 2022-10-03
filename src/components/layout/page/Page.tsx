import React from 'react'
import Head from 'next/head'
import { Flex } from 'theme-ui'
import { Footer } from '../footer'
import Header from '../header/Header'

export interface PageProps {
	children?: React.ReactNode | React.ReactNode[]
	title: string
}

export const Page = (props: PageProps) => {
	const { title, children } = props
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				/>
				<title>{title}</title>
			</Head>
			<Flex variant='appContainer'>
				<Header />
				{children}
				<Footer />
			</Flex>
		</>
	)
}

export default Page
