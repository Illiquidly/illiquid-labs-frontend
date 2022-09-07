import React from 'react'
import { useTranslation } from 'next-i18next'

import { LayoutContainer, Page, Tab, Tabs } from 'components/ui'
import { getStaticPaths, makeStaticProps } from 'lib'
import { Flex } from 'theme-ui'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

enum ListingsType {
	ALL_LISTINGS = '0',
	MY_LISTINGS = '1',
}

export default function TradeListings() {
	const { t } = useTranslation('common')
	const [listingsType, setListingsType] = React.useState(
		ListingsType.ALL_LISTINGS
	)
	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<Flex sx={{ mt: ['12px', '24px'], display: ['flex', 'flex', 'none'] }}>
					<Tabs
						onChange={e => setListingsType(e.target.value as ListingsType)}
						value={listingsType}
						name='listings'
					>
						<Tab value={ListingsType.ALL_LISTINGS}>All Listings</Tab>
						<Tab value={ListingsType.MY_LISTINGS}>My Listings</Tab>
					</Tabs>
				</Flex>
			</LayoutContainer>
		</Page>
	)
}
