import { LayoutContainer, Page } from 'components'
import { SendTransactionsTable, Title } from 'components/send-transactions'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Flex } from 'theme-ui'

const getStaticProps = makeStaticProps(['common', 'send-transactions'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Send() {
	const { t } = useTranslation(['common', 'send-transactions'])

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<Flex sx={{ mt: '24px', flexDirection: 'column', gap: '12px' }}>
					<Title>{t('send-transactions:previous-transactions')}</Title>
					<SendTransactionsTable />
				</Flex>
			</LayoutContainer>
		</Page>
	)
}
