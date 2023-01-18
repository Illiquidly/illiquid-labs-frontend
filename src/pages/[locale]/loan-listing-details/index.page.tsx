import { useTranslation } from 'next-i18next'
import React from 'react'

import { LayoutContainer, Page } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { Flex } from 'theme-ui'

const getStaticProps = makeStaticProps(['common', 'loan-listings'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function LoanListingDetails() {
	const { t } = useTranslation(['common', 'loan-listings'])

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<Flex sx={{ py: 48 }}>
					<div>Coming soon!</div>
				</Flex>
			</LayoutContainer>
		</Page>
	)
}
