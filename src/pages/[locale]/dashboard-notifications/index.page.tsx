import { useTranslation } from 'next-i18next'
import React from 'react'

import { LayoutContainer, Notifications, Page } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { Flex } from 'theme-ui'

const getStaticProps = makeStaticProps(['common', 'dashboard'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Dashboard() {
	const { t } = useTranslation(['common', 'dashboard'])

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<Flex sx={{ py: 48 }}>
					<Notifications fullWidth />
				</Flex>
			</LayoutContainer>
		</Page>
	)
}
