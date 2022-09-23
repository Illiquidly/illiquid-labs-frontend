import React from 'react'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'

import {
	AttributeCard,
	BlueWarning,
	LayoutContainer,
	Page,
	Wallet,
	WalletItem,
} from 'components/ui'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { Flex } from 'theme-ui'

import {
	CounterOffers,
	Row,
	ButtonsRow,
	ImageRow,
	DescriptionRow,
	LookingForRow,
} from 'components/listing-details'
import { EditModal, RemoveModal } from 'components/listing-details/modals'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
/** todo: generate the static paths to tids */
const getStaticPaths = makeStaticPaths({ tid: Number(1).toString() })
export { getStaticPaths, getStaticProps }

/** todo remove */
const attributes = [
	{
		traitType: 'gang',
		value: 'The Firest',
	},
	{
		traitType: 'background',
		value: 'SnowDrift',
	},
	{
		traitType: 'splatter',
		value: 'Flesh Wound',
	},
	{
		traitType: 'body',
		value: 'Standard',
	},
	{
		traitType: 'weapon',
		value: 'Standard',
	},
	{
		traitType: 'weapon 2',
		value: 'Standard',
	},
]

const lookingForStart = [
	{
		amount: '10',
		denom: 'Luna',
	},
	{
		denom: 'DeGods',
		amount: '1',
	},
	{
		denom: 'Galactic Punks',
		amount: '2',
	},
	{
		denom: 'Skeleton Punks',
		amount: '3',
	},
	{
		denom: 'Lovely Punks',
		amount: '4',
	},
	{
		denom: 'Scary Punks',
		amount: '5',
	},
	{
		denom: 'yLuna',
		amount: '20',
	},
]

/** todo remove */

const nfts = [
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
]

const liked = false
const previewItemsLimit = 4
const isPrivate = false
const verified = true
const onLike = n => console.warn(n)
const lookingForItemsLimit = 4
const NFTProps = {}

const imageUrl = [
	'https://d1mx8bduarpf8s.cloudfront.net/QmNuYa4ruNsRgfzRPizxCfaWFZTFJLaeuSjR6XuMu1s4zL',
]
const name = 'Fox #7561'
const collectionName = 'Mutant Ape Yacht Club'

export default function ListingDetails() {
	const { t } = useTranslation(['common', 'trade-listings'])

	const [lookingFor, setLookingFor] = React.useState(lookingForStart)

	const removeLookingFor = item => {
		// remove looking for
		setLookingFor(lookingFor.filter(l => l.denom !== item.denom))
	}

	const handleEditClick = () => {
		NiceModal.show(EditModal, {
			lookingFor,
			lookingForItemsLimit,
			removeLookingFor,
		})
	}

	const remove = () => {
		/** todo */
	}

	const handleRemoveClick = () => {
		NiceModal.show(RemoveModal, {
			remove,
		})
	}

	return (
		<Page title={t('title')}>
			<LayoutContainer>
				<Row
					sx={{
						justifyContent: 'space-between',
					}}
				>
					<ButtonsRow
						handleEditClick={handleEditClick}
						handleRemoveClick={handleRemoveClick}
					/>
				</Row>
				<Row>
					<BlueWarning sx={{ width: '100%', height: '49px' }}>
						{t('trade-listings:item-not-available')}
					</BlueWarning>
				</Row>
				<ImageRow
					nfts={nfts}
					imageUrl={imageUrl}
					NFTProps={NFTProps}
					onLike={onLike}
					liked={liked}
					previewItemsLimit={previewItemsLimit}
				/>
				<Row>
					<DescriptionRow
						name={name}
						isPrivate={isPrivate}
						collectionName={collectionName}
						verified={verified}
					/>
				</Row>
				{attributes && (
					<Row>
						<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
							{attributes.map(attribute => (
								<AttributeCard
									key={JSON.stringify(attribute)}
									name={attribute.traitType}
									value={attribute.value}
								/>
							))}
						</Flex>
					</Row>
				)}
				<Row>
					<Wallet>
						<WalletItem>Listed 3 weeks ago</WalletItem>
						<WalletItem>Listed 3 weeks ago</WalletItem>
					</Wallet>
				</Row>
				{lookingFor && (
					<Row>
						<LookingForRow
							lookingFor={lookingFor}
							lookingForItemsLimit={lookingForItemsLimit}
						/>
					</Row>
				)}
				<Row>
					<CounterOffers />
				</Row>
			</LayoutContainer>
		</Page>
	)
}
