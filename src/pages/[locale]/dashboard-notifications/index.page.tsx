import { useTranslation } from 'next-i18next'
import React from 'react'
import { Flex } from 'theme-ui'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { LayoutContainer, Page } from 'components/layout'
import { Notifications } from 'components/shared'

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
