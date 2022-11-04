import { useTranslation } from 'next-i18next'
import React from 'react'

import { LayoutContainer, Page } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'
import PageNotFound from 'components/shared/page-not-found/PageNotFound'

const getStaticProps = makeStaticProps(['common'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function LoanListings() {
	const { t } = useTranslation(['common'])

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<PageNotFound />
			</LayoutContainer>
		</Page>
	)
}
