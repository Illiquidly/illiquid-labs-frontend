import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import { CounterTrade } from 'services/api/counterTradesService'
import getShortText from 'utils/js/getShortText'
import { ModalLayoutContainer } from 'components/layout'
import { HumanCoin, Trade } from 'services/api/tradesService'
import { NFT } from 'services/api/walletNFTsService'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'

import {
	HorizontalTradeLine,
	VerticalTradeLine,
} from 'components/trade-listing-details'
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
} from './OfferAcceptedModal.styled'

export interface OfferAcceptedModalProps {
	trade: Trade
	counterTrade: CounterTrade
}
const OfferAcceptedModal = NiceModal.create(
	({ trade, counterTrade }: OfferAcceptedModalProps) => {
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

		const counterTradeNFTss = React.useMemo(
			() =>
				(counterTrade?.tradeInfo.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin as NFT),
			[counterTrade]
		)

		const counterTradeCoins = React.useMemo(
			() =>
				(counterTrade?.tradeInfo?.associatedAssets ?? [])
					.filter(x => x.coin)
					.map(x => x.coin) as HumanCoin[],
			[counterTrade]
		)

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('trade-listings:offer-accepted-modal.title')}
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
									<Title>
										{t('trade-listings:offer-accepted-modal.answer', {
											username: getShortText(counterTrade?.tradeInfo?.owner ?? '', 8),
										})}
									</Title>
								</Box>

								<Flex
									sx={{
										flexDirection: ['column', 'column', 'row'],
									}}
								>
									<Box sx={{ flex: 1 }}>
										<Title>{t('trade-listings:offer-accepted-modal.your-listing')}</Title>
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
									</Box>
									<Box sx={{ display: ['block', 'block', 'none'] }}>
										<HorizontalTradeLine />
									</Box>
									<Box sx={{ display: ['none', 'none', 'block'] }}>
										<VerticalTradeLine />
									</Box>
									<Flex
										sx={{
											flexDirection: 'column',
											flex: 1,
										}}
									>
										<Title>
											{t('trade-listings:offer-accepted-modal.offer', {
												username: getShortText(counterTrade?.tradeInfo?.owner, 6),
											})}
										</Title>
										<Grid>
											{counterTradeNFTss.map(nft => (
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
													{`${amount} ${currency}`}
												</CoinCard>
											))}
										</Flex>
									</Flex>
								</Flex>

								<Flex
									sx={{
										justifyContent: 'space-between',
										gap: '12px',
										marginTop: '24px',
									}}
								>
									<Button
										variant='secondary'
										fullWidth
										onClick={() => {
											modal.remove()
										}}
									>
										{t('trade-listings:offer-accepted-modal.back-to-listing')}
									</Button>
									<Button
										variant='gradient'
										fullWidth
										onClick={() => {
											router.push(ROUTES.DASHBOARD)
											modal.remove()
										}}
									>
										{t('trade-listings:offer-accepted-modal.go-to-dashboard')}
									</Button>
								</Flex>
							</ModalBody>
						</ModalContent>
					</ModalLayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default OfferAcceptedModal
