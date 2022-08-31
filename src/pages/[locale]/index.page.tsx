import React from 'react'
import { useTranslation } from 'next-i18next'
import { Flex, Box } from 'theme-ui'

import { Page } from 'components/ui/page'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default function Index() {
	const { t } = useTranslation('common')
	return (
		<Page title={t('title')}>
			<Flex sx={{ flex: 1 }}>
				<Box sx={{ display: ['block', 'none'] }}> Mobile</Box>
				<Box sx={{ display: ['none', 'block', 'none'] }}>Tablet</Box>
				<Box sx={{ display: ['none', 'none', 'block', 'none'] }}> Laptop</Box>
				<Box sx={{ display: ['none', 'none', 'none', 'block', 'none'] }}>
					Desktop
				</Box>
				<Box sx={{ display: ['none', 'none', 'none', 'none', 'block'] }}>
					Large Desktop
				</Box>
			</Flex>
		</Page>
	)
}
