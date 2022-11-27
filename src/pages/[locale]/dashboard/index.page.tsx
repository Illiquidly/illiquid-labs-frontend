import { useTranslation } from 'next-i18next'
import React from 'react'

import { LayoutContainer, Page, Tab, Tabs } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'
import { Title, SectionTitle } from 'components/dashboard'
import { Flex } from 'theme-ui'
import IncomingTradeOffers from 'components/dashboard/IncomingTradeOffers'
import OutgoingTradeOffers from 'components/dashboard/OutgoingTradeOffers'
import { DefaultActions } from 'components/shared/header-actions'
import useHeaderActions from 'hooks/useHeaderActions'

const getStaticProps = makeStaticProps([
	'common',
	'dashboard',
	'trade-listings',
	'trade',
])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export enum ACTIVITY_TYPE {
	outgoingOffers = '0',
	incomingOffers = '1',
	raffles = '2',
}

export default function Dashboard() {
	const { t } = useTranslation(['common', 'dashboard'])
	const [activityType, setActivityType] = React.useState(
		ACTIVITY_TYPE.incomingOffers
	)

	useHeaderActions(<DefaultActions />)

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<Flex sx={{ flexDirection: 'column', pt: ['24px', '32px'] }}>
					<Title>{t('dashboard:activity.title')}</Title>
					<Flex
						sx={{
							justifyContent: 'space-between',
							maxWidth: [null, null, '410px'],
							my: '24px',
						}}
					>
						<Tabs
							onChange={e => setActivityType(e.target.value as ACTIVITY_TYPE)}
							value={activityType}
							name='activityType'
						>
							<Tab value={ACTIVITY_TYPE.incomingOffers}>
								{t('dashboard:activity.tabs.incoming-offers')}
							</Tab>
							<Tab value={ACTIVITY_TYPE.outgoingOffers}>
								{t('dashboard:activity.tabs.outgoing-offers')}
							</Tab>
						</Tabs>
					</Flex>
					<SectionTitle />
				</Flex>
				{activityType === ACTIVITY_TYPE.incomingOffers && <IncomingTradeOffers />}
				{activityType === ACTIVITY_TYPE.outgoingOffers && <OutgoingTradeOffers />}
			</LayoutContainer>
		</Page>
	)
}
