import React from 'react'

import { useTranslation } from 'next-i18next'

import { Page } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'

const getStaticProps = makeStaticProps(['common'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function RaffleListings() {
	const { t } = useTranslation(['common'])
	React.useEffect(() => {
		window.location.assign('https://migrate.illiquidlabs.io/migrate')
	}, [])

	return <Page title={t('common:title')} />
}
