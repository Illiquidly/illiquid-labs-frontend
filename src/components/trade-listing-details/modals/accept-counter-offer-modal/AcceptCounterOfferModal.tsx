import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import { CounterTrade } from 'services/api/counterTradesService'
import { FormProvider, useForm } from 'react-hook-form'
import getShortText from 'utils/js/getShortText'
import { ModalLayoutContainer } from 'components/layout'
import {
	HorizontalTradeLine,
	VerticalTradeLine,
} from 'components/trade-listing-details'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import { NFT } from 'services/api/walletNFTsService'
import { HumanCoin, Trade } from 'services/api/tradesService'
import { LunaIcon } from 'assets/icons/mixed'
import { TradeFee } from 'services/blockchain'
import { TextAreaField } from 'components/form'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Subtitle,
	Grid,
	CoinCard,
	PreviewImageContainer,
	PreviewImage,
} from './AcceptCounterOfferModal.styled'

export interface AcceptCounterOfferModalProps {
	counterTrade: CounterTrade
	trade: Trade
	fees: TradeFee
}

export interface AcceptCounterOfferModalResult {
	comment: string
}
export interface AcceptCounterOfferModalState {
	comment: string
}

const AcceptCounterOfferModal = NiceModal.create(
	({ trade, counterTrade, fees }: AcceptCounterOfferModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'trade-listings'])

		const theme = useTheme()

		const formMethods = useForm<AcceptCounterOfferModalState>({
			mode: 'all',
			defaultValues: {
				comment: '',
			},
		})

		const { register } = formMethods

		const onSubmit = ({ comment }) => {
			modal.resolve({
				comment,
			} as AcceptCounterOfferModalResult)
			modal.remove()
		}

		const tradeNFTs = React.useMemo(
			() =>
				(trade?.tradeInfo.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin as NFT),
			[trade]
		)

		const counterTradeNFTs = React.useMemo(
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
								{t('trade-listings:accept-counter-offer-modal.title')}
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
								<FormProvider {...formMethods}>
									<form onSubmit={formMethods.handleSubmit(onSubmit)}>
										<Flex sx={{ flexDirection: 'column', gap: '24px' }}>
											<Flex sx={{ flexDirection: 'column' }}>
												<Title>
													{t('trade-listings:accept-counter-offer-modal.question', {
														username: getShortText(counterTrade?.tradeInfo.owner ?? '', 8),
													})}
												</Title>
												<Subtitle>
													{t('trade-listings:accept-counter-offer-modal.note')}
												</Subtitle>
											</Flex>

											<Flex
												sx={{
													flexDirection: ['column', 'column', 'row'],
												}}
											>
												<Box sx={{ flex: 1 }}>
													<Title>
														{t('trade-listings:offer-accepted-modal.your-listing')}
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
																{`${amount} ${currency}`}
															</CoinCard>
														))}
													</Flex>
												</Flex>
											</Flex>

											<Flex sx={{ flexDirection: 'column' }}>
												<Title>
													{t('trade-listings:accept-counter-offer-modal:withdrawal-fees')}
												</Title>
												<CoinCard>
													<LunaIcon />
													{t('common:total-fees', {
														amount: fees.amount,
														currency: fees.currency,
													})}
												</CoinCard>
											</Flex>

											<Flex sx={{ flexDirection: 'column' }}>
												<TextAreaField
													label={t('trade-listings:accept-counter-offer-modal:send-message')}
													id='comment'
													style={{ height: '128px' }}
													{...register('comment')}
													placeholder={t(
														'trade-listings:accept-counter-offer-modal:enter-text'
													)}
												/>
											</Flex>
											<Flex
												sx={{
													gap: '12px',
													marginTop: '24px',
												}}
											>
												<Button onClick={modal.remove} variant='secondary' fullWidth>
													{t('trade-listings:accept-counter-offer-modal.back-to-listing')}
												</Button>
												<Button variant='gradient' fullWidth type='submit'>
													{t('trade-listings:accept-counter-offer-modal.accept-offer')}
												</Button>
											</Flex>
										</Flex>
									</form>
								</FormProvider>
							</ModalBody>
						</ModalContent>
					</ModalLayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default AcceptCounterOfferModal
