import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const LinkComponent = ({
	children,
	skipLocaleHandling = false,
	disabled = false,
	...rest
}) => {
	const router = useRouter()
	const locale = rest.locale || router.query.locale || ''
	let href = rest.href || router.asPath
	let skip = skipLocaleHandling
	if (href.indexOf('http') === 0) skip = true
	if (locale && !skip) {
		href = href
			? `/${locale}${href}`
			: router.pathname.replace('[locale]', locale)
	}

	if (disabled) {
		return children
	}

	return (
		<>
			<Link href={href}>{children}</Link>
		</>
	)
}

export default LinkComponent
