import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { LayoutContainer, Page, Tab, Tabs } from 'components'

import { makeStaticPaths, makeStaticProps } from 'lib'
import {
	Title,
	SectionTitle,
	WatchListTrade,
	WatchListRaffles,
	OutgoingRaffleOffers,
	IncomingRaffleOffers,
} from 'components/dashboard'
import { Flex } from 'theme-ui'
import IncomingTradeOffers from 'components/dashboard/IncomingTradeOffers'
import OutgoingTradeOffers from 'components/dashboard/OutgoingTradeOffers'
import If from 'components/core/if-statement'

const getStaticProps = makeStaticProps([
	'common',
	'dashboard',
	'trade-listings',
	'trade',
	'raffle',
	'raffle-listings',
])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export enum ACTIVITY_TYPE {
	outgoingActivity = 'outgoing',
	incomingActivity = 'incoming',
}

export enum FEATURE_TYPE {
	trade = 'trade',
	raffle = 'raffle',
	// loan = 'loan',
}

export default function Dashboard() {
	const { t } = useTranslation(['common', 'dashboard'])
	const [activityType, setActivityType] = React.useState(
		ACTIVITY_TYPE.incomingActivity
	)

	const [feature, setFeature] = useState(FEATURE_TYPE.trade)

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<Flex sx={{ flexDirection: 'column', pt: ['12px', '32px'] }}>
					<Title>{t('dashboard:watch-list.title')}</Title>
					<Flex
						sx={{
							justifyContent: 'space-between',
							maxWidth: [null, null, '410px'],
							my: '12px',
							mb: '24px',
						}}
					>
						<Tabs
							onChange={e => setFeature(e.target.value as FEATURE_TYPE)}
							value={feature}
							name='feature'
						>
							{Object.values(FEATURE_TYPE).map(feat => (
								<Tab key={feat} value={feat}>
									{t(`dashboard:features.${feat}`)}
								</Tab>
							))}
						</Tabs>
					</Flex>
					<Flex sx={{ mb: ['24px', '24px'] }}>
						<If condition={feature === FEATURE_TYPE.trade}>
							<WatchListTrade />
						</If>
						<If condition={feature === FEATURE_TYPE.raffle}>
							<WatchListRaffles />
						</If>
					</Flex>

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
							<Tab value={ACTIVITY_TYPE.incomingActivity}>
								{t('dashboard:activity.tabs.incoming-offers')}
							</Tab>
							<Tab value={ACTIVITY_TYPE.outgoingActivity}>
								{t('dashboard:activity.tabs.outgoing-offers')}
							</Tab>
						</Tabs>
					</Flex>
					<SectionTitle />
					<If condition={feature === FEATURE_TYPE.trade}>
						<>
							{activityType === ACTIVITY_TYPE.incomingActivity && (
								<IncomingTradeOffers />
							)}
							{activityType === ACTIVITY_TYPE.outgoingActivity && (
								<OutgoingTradeOffers />
							)}
						</>
					</If>
					<If condition={feature === FEATURE_TYPE.raffle}>
						<>
							{activityType === ACTIVITY_TYPE.incomingActivity && (
								<IncomingRaffleOffers />
							)}
							{activityType === ACTIVITY_TYPE.outgoingActivity && (
								<OutgoingRaffleOffers />
							)}
						</>
					</If>
				</Flex>
			</LayoutContainer>
		</Page>
	)
}
