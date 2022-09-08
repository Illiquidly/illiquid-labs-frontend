import React from 'react'
import { useTranslation } from 'next-i18next'

import { LayoutContainer, ListingCard, Page, Tab, Tabs } from 'components/ui'
import { getStaticPaths, makeStaticProps } from 'lib'
import { Flex } from 'theme-ui'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
export { getStaticPaths, getStaticProps }

enum ListingsType {
	ALL_LISTINGS = '0',
	MY_LISTINGS = '1',
}

export default function TradeListings() {
	const { t } = useTranslation(['common', 'trade-listings'])
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
				<Flex sx={{ mt: ['12px', '20px'], gap: '12px', minHeight: '48px' }}>
					<Flex sx={{ flex: 1, bg: 'red' }}>TODO</Flex>

					<Flex sx={{ flex: 1, maxWidth: 50, bg: 'red' }}>TODO</Flex>
				</Flex>
				<Flex
					sx={{
						mt: ['12px', '32px'],
						flexDirection: 'column',
						gap: '8px',
						overflow: 'auto',
						mb: ['12px'],
					}}
				>
					<ListingCard
						verified
						unavailableText={t('trade-listings:listing-unavailable')}
						description='2'
						attributes={[]}
						onLike={n => console.warn(n)}
						tokenId='Something'
						collectionAddress='Something'
						href={`/listing-details/${1}`}
						nfts={[]}
						imageUrl={[
							'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
						]}
						unavailable
						name='Fox #7561'
						collectionName='Mutant Ape Yacht Club'
					/>
					<ListingCard
						verified
						unavailableText={t('trade-listings:listing-unavailable')}
						description='2'
						attributes={[]}
						onLike={n => console.warn(n)}
						tokenId='Something'
						collectionAddress='Something'
						href={`/listing-details/${1}`}
						nfts={[
							{
								collectionAddress: '1',
								collectionName: '1',
								attributes: [],
								imageUrl: [
									'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
								],
								tokenId: '1',
								description: 'test',
							},
							{
								collectionAddress: '2',
								collectionName: '2',
								attributes: [],
								imageUrl: [
									'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
								],
								tokenId: '2',
								description: 'test',
							},
							{
								collectionAddress: '3',
								collectionName: '3',
								attributes: [],
								imageUrl: [
									'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
								],
								tokenId: '3',
								description: 'test',
							},
							{
								collectionAddress: '4',
								collectionName: '4',
								attributes: [],
								imageUrl: [
									'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
								],
								tokenId: '4',
								description: 'test',
							},
							{
								collectionAddress: '5',
								collectionName: '5',
								attributes: [],
								imageUrl: [
									'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
								],
								tokenId: '5',
								description: 'test',
							},
						]}
						lookingFor={[
							{
								amount: '10',
								denom: 'Luna',
							},
							{
								collectionName: 'DeGods',
								collectionAddress: '1',
							},
							{
								collectionName: 'Galactic Punks',
								collectionAddress: '2',
							},
							{
								collectionName: 'Skeleton Punks',
								collectionAddress: '3',
							},
							{
								collectionName: 'Lovely Punks',
								collectionAddress: '4',
							},
							{
								collectionName: 'Scary Punks',
								collectionAddress: '5',
							},
							{
								denom: 'yLuna',
								amount: '20',
							},
						]}
						imageUrl={[
							'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
						]}
						name='Fox #7561'
						liked
						isPrivate
						collectionName='Mutant Ape Yacht Club'
					/>
				</Flex>
			</LayoutContainer>
		</Page>
	)
}
