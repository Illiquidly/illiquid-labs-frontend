import Router from 'next/router'
import React from 'react'

export default function Index() {
	React.useEffect(() => {
		const { pathname } = Router
		if (pathname === '/') {
			Router.push('/migrate')
		}
	})

	return <></>
}
