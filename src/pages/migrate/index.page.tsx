import React from 'react'

export default function Migrate() {
	React.useEffect(() => {
		window.location.href = 'https://migrate.illiquidlabs.io/migrate'
	}, [])

	return null
}
