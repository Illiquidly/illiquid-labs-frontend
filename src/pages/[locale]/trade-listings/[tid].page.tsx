import React from 'react'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'

import {
	AttributeCard,
	BlueWarning,
	Button,
	ConnectButton,
	LayoutContainer,
	Page,
	Wallet,
	WalletItem,
} from 'components/ui'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { Box, Flex } from 'theme-ui'

import {
	CounterOffers,
	Row,
	ButtonsRow,
	ImageRow,
	DescriptionRow,
	LookingForRow,
} from 'components/listing-details'
import {
	EditModal,
	RemoveModal,
	AcceptCounterOfferModal,
} from 'components/listing-details/modals'
import { CreateListingAddIcon } from 'assets/icons/mixed'
import useHeaderActions from 'hooks/useHeaderActions'
import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Coin, TradesService } from 'services/api/tradesService'
import { useWallet } from '@terra-money/use-wallet'
import { NFT } from 'services/api/walletNFTsService'
import { noop } from 'lodash'
import { SupportedCollectionsService } from 'services/api'

const getStaticProps = makeStaticProps(['common', 'trade-listings'])
const getStaticPaths = makeStaticPaths({ tid: Number(0).toString() })
export { getStaticPaths, getStaticProps }

export default function ListingDetails() {
	const { t } = useTranslation(['common', 'trade-listings'])

	const route = useRouter()

	const wallet = useWallet()

	const { data: verifiedCollections } = useQuery(
		['verifiedCollections', wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data } = useQuery(
		['trade', route?.query?.tid, wallet.network],
		async () =>
			TradesService.getTrade(
				wallet.network.name,
				(route?.query?.tid ?? '').toString()
			),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { tradeInfo } = data ?? {}
	const {
		additionalInfo,
		// associatedAssetsWithInfo,
		whitelistedUsers,
	} = tradeInfo ?? {}

	const [tradePreview, setTradePreview] = React.useState<{
		coin?: Coin
		cw721Coin?: NFT
		cw1155Coin?: any
	} | null>(null)

	React.useEffect(() => {
		setTradePreview(additionalInfo?.tradePreview ?? null)
	}, [data])

	useHeaderActions(
		<Flex sx={{ gap: '8px', height: '40px' }}>
			<Button variant='gradient' size='medium' href={ROUTES.CREATE_TRADE_LISTING}>
				<CreateListingAddIcon />
				<Box sx={{ display: ['none', 'block'], ml: '8px' }}>
					{t('common:create-listing')}
				</Box>
			</Button>
			<ConnectButton />
		</Flex>
	)

	const handleEditClick = () => {
		NiceModal.show(EditModal, {})
	}

	const handleRemoveClick = () => {
		NiceModal.show(RemoveModal, {
			remove: {},
		})
	}

	const onAcceptOffer = (/* offer: CounterOffer */) => {
		// console.log('accept offer')
	}

	const handleApprove = () => {
		// console.log('handle approve')
		NiceModal.show(AcceptCounterOfferModal, { acceptCounterOffer: onAcceptOffer })
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const handleDeny = (/* offer */) => {}

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
					nfts={[]}
					// nfts={(associatedAssetsWithInfo || [])
					// 	.filter(nft => nft.cw721Coin)
					// 	.map(({ cw721Coin }) => cw721Coin as NFT)}
					imageUrl={additionalInfo?.tradePreview?.cw721Coin?.imageUrl ?? []}
					NFTProps={tradePreview}
					onLike={noop}
					liked={false}
				/>
				<Row>
					<DescriptionRow
						name={tradePreview?.cw721Coin?.collectionName}
						isPrivate={(whitelistedUsers ?? []).length > 0}
						collectionName={tradePreview?.cw721Coin?.collectionName ?? ''}
						verified={(verifiedCollections ?? []).some(
							({ collectionAddress }) =>
								tradePreview?.cw721Coin?.collectionAddress === collectionAddress
						)}
					/>
				</Row>
				{Boolean(tradePreview?.cw721Coin?.attributes?.length) && (
					<Row>
						<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
							{(additionalInfo?.tradePreview?.cw721Coin?.attributes ?? []).map(
								attribute => (
									<AttributeCard
										key={JSON.stringify(attribute)}
										name={attribute.traitType}
										value={attribute.value}
									/>
								)
							)}
						</Flex>
					</Row>
				)}
				<Row>
					<Wallet>
						<WalletItem>Listed 3 weeks ago</WalletItem>
						<WalletItem>Listed 3 weeks ago</WalletItem>
					</Wallet>
				</Row>
				{tradeInfo && (
					<Row>
						<LookingForRow lookingFor={additionalInfo?.lookingFor ?? []} />
					</Row>
				)}
				<Row>
					<CounterOffers handleApprove={handleApprove} handleDeny={handleDeny} />
				</Row>
			</LayoutContainer>
		</Page>
	)
}
