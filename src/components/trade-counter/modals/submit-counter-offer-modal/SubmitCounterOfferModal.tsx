import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import getShortText from 'utils/js/getShortText'
import {
	ModalLayoutContainer,
	OnlyMobileAndTablet,
	OnlyOnDesktop,
} from 'components/layout'
import { Trade } from 'services/api/tradesService'
import { NFT } from 'services/api/walletNFTsService'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'

import {
	HorizontalTradeLine,
	VerticalTradeLine,
} from 'components/trade-listing-details'
import { LunaIcon } from 'assets/icons/mixed'
import { TradeFee } from 'services/blockchain'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Grid,
	PreviewImageContainer,
	PreviewImage,
	CoinCard,
} from './SubmitCounterOfferModal.styled'

export interface SubmitCounterOfferModalProps {
	trade: Trade
	counterTradeNFTs: NFT[]
	counterTradeCoins: { amount: string; currency: string }[]
	fees: TradeFee
}
const SubmitCounterOfferModal = NiceModal.create(
	({
		trade,
		counterTradeNFTs,
		counterTradeCoins,
		fees,
	}: SubmitCounterOfferModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		const router = useRouter()

		const tradeNFTs = React.useMemo(
			() =>
				(trade?.tradeInfo.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin as NFT),
			[trade]
		)

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('trade-listings:submit-counter-offer-modal.title')}
								<IconButton
									sx={{
										borderRadius: '32px',
										backgroundColor: theme.colors.dark500,
									}}
									onClick={modal.remove}
								>
									<ModalCloseIcon />
								</IconButton>
							</ModalHeader>
							<ModalBody>
								<Box>
									<Title>{t('trade-listings:submit-counter-offer-modal.answer')}</Title>
								</Box>

								<Flex
									sx={{
										flexDirection: ['column', 'column', 'row'],
									}}
								>
									<Box sx={{ flex: 1 }}>
										<Title>
											{t('trade-listings:submit-counter-offer-modal.your-offer')}
										</Title>
										<Grid>
											{counterTradeNFTs.map(nft => (
												<PreviewImageContainer
													key={`${nft.collectionAddress}_${nft.tokenId}`}
												>
													{nft?.imageUrl?.every(img => img === '') ? (
														<Flex sx={{ maxWidth: '61px', maxHeight: '61px' }}>
															<ImagePlaceholder width='100%' height='100%' />
														</Flex>
													) : (
														<PreviewImage src={nft?.imageUrl ?? []} />
													)}
												</PreviewImageContainer>
											))}
										</Grid>
										<Flex sx={{ mt: 8, flexDirection: 'column', gap: 8 }}>
											{counterTradeCoins.map(({ amount, currency }) => (
												<CoinCard key={JSON.stringify({ amount, currency })}>
													<LunaIcon />
													<div>{`${Number(amount).toFixed(3)} ${currency}`}</div>
												</CoinCard>
											))}
										</Flex>
									</Box>
									<OnlyMobileAndTablet>
										<HorizontalTradeLine />
									</OnlyMobileAndTablet>
									<OnlyOnDesktop>
										<VerticalTradeLine />
									</OnlyOnDesktop>
									<Flex
										sx={{
											flexDirection: 'column',
											flex: 1,
										}}
									>
										<Title>
											{t('trade-listings:submit-counter-offer-modal.offer', {
												username: getShortText(trade?.tradeInfo?.owner, 6),
											})}
										</Title>
										<Grid>
											{tradeNFTs.map(nft => (
												<PreviewImageContainer
													key={`${nft.collectionAddress}_${nft.tokenId}`}
												>
													{nft?.imageUrl?.every(img => img === '') ? (
														<Flex sx={{ maxWidth: '61px', maxHeight: '61px' }}>
															<ImagePlaceholder width='100%' height='100%' />
														</Flex>
													) : (
														<PreviewImage src={nft?.imageUrl ?? []} />
													)}
												</PreviewImageContainer>
											))}
										</Grid>
									</Flex>
								</Flex>

								<Flex sx={{ flexDirection: 'column' }}>
									<Title>
										{t('trade-listings:submit-counter-offer-modal.withdrawal-fees')}
									</Title>
									<CoinCard>
										<LunaIcon />
										{t('common:total-fees', {
											amount: fees.amount,
											currency: fees.currency,
										})}
									</CoinCard>
								</Flex>
								<Flex
									sx={{
										justifyContent: [null, null, 'space-between'],
										flexDirection: ['column', 'column', 'row'],
										mt: ['24px', '24px', '48px'],
									}}
								>
									<Flex
										sx={{ flex: [1, 1, 'unset'], display: ['flex', 'flex', 'block'] }}
									>
										<Button
											variant='dark'
											fullWidth
											onClick={() => {
												router.push(
													`${ROUTES.TRADE_LISTING_DETAILS}?tradeId=${trade.tradeId}`
												)
												modal.remove()
											}}
										>
											{t('trade-listings:submit-counter-offer-modal.back-to-listing')}
										</Button>
									</Flex>

									<Flex
										sx={{
											justifyContent: 'space-between',
											gap: '12px',
											mt: ['12px', '12px', 0],
										}}
									>
										<Flex
											sx={{ flex: [1, 1, 'unset'], display: ['flex', 'flex', 'block'] }}
										>
											<Button variant='secondary' fullWidth onClick={modal.remove}>
												{t('trade-listings:submit-counter-offer-modal.edit-offer')}
											</Button>
										</Flex>
										<Flex
											sx={{ flex: [1, 1, 'unset'], display: ['flex', 'flex', 'block'] }}
										>
											<Button
												variant='gradient'
												fullWidth
												onClick={() => {
													modal.resolve(true)
													modal.remove()
												}}
											>
												{t('trade-listings:submit-counter-offer-modal.submit-offer')}
											</Button>
										</Flex>
									</Flex>
								</Flex>
							</ModalBody>
						</ModalContent>
					</ModalLayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default SubmitCounterOfferModal
