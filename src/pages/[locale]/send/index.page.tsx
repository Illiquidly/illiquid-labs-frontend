import { useTranslation } from 'next-i18next'
import React from 'react'

import { LayoutContainer, Page } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'
import PageNotFound from 'components/shared/page-not-found/PageNotFound'

const getStaticProps = makeStaticProps(['common', 'send'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Send() {
	const { t } = useTranslation(['common', 'send'])

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<PageNotFound />
			</LayoutContainer>
		</Page>
	)
}
