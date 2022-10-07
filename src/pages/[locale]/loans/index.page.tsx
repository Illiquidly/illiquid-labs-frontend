import { useTranslation } from 'next-i18next'
import React from 'react'

import { LayoutContainer, Page } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'

const getStaticProps = makeStaticProps(['common'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Trade() {
	const { t } = useTranslation(['common'])

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<div>404</div>
			</LayoutContainer>
		</Page>
	)
}
