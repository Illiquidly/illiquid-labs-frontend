import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Button, Modal } from 'components/ui'

import * as ROUTES from 'constants/routes'
import { useRouter } from 'next/router'
import {
	ModalLayoutContainer,
	OnlyMobileAndTablet,
	OnlyOnDesktop,
} from 'components/layout'
import { NFT } from 'services/api/walletNFTsService'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'

import { LunaIcon } from 'assets/icons/mixed'

import { Loan } from 'services/api/loansService'
import {
	HorizontalLoanLine,
	VerticalLoanLine,
} from 'components/loan-listing-details'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Subtitle,
	Grid,
	PreviewImageContainer,
	PreviewImage,
	OfferCard,
	OfferCardTitle,
	OfferCardSubtitle,
} from './SubmitLoanOfferModal.styled'

export interface SubmitLoanOfferModalProps {
	loan: Loan
	tokenAmount: string
	tokenName: string
	interestRate: string
	loanPeriod: string
}
const SubmitLoanOfferModal = NiceModal.create(
	({
		loan,
		tokenAmount,
		tokenName,
		interestRate,
		loanPeriod,
	}: SubmitLoanOfferModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common', 'loan-listings'])

		const theme = useTheme()

		const router = useRouter()

		const loanNFTs = React.useMemo(
			() =>
				(loan?.loanInfo?.associatedAssets ?? [])
					.filter(({ cw721Coin }) => cw721Coin)
					.map(({ cw721Coin }) => cw721Coin as NFT),
			[loan]
		)

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalLayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('loan-listings:submit-loan-offer-modal.title')}
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
									<Title>{t('loan-listings:submit-loan-offer-modal.question')}</Title>
									<Subtitle>
										{t('loan-listings:submit-loan-offer-modal.answer')}
									</Subtitle>
								</Box>

								<Flex
									sx={{
										flexDirection: ['column', 'column', 'row'],
									}}
								>
									<Box sx={{ flex: 1 }}>
										<Title>
											{t('loan-listings:submit-loan-offer-modal.counter-offer')}
										</Title>
										<Flex sx={{ flexDirection: 'column', gap: 8 }}>
											<OfferCard>
												<OfferCardTitle>
													{t('loan-listings:submit-loan-offer-modal.loan-period')}
												</OfferCardTitle>
												<OfferCardSubtitle>
													{t('loan-listings:days', {
														count: +loanPeriod,
													})}
												</OfferCardSubtitle>
											</OfferCard>

											<OfferCard>
												<OfferCardTitle>
													{t('loan-listings:submit-loan-offer-modal.loan-amount')}
												</OfferCardTitle>
												<OfferCardSubtitle>
													<Flex>
														{t('loan-listings:submit-loan-offer-modal.loan-currency', {
															tokenAmount: Number(tokenAmount).toFixed(3),
															tokenName,
														})}
														<Box sx={{ ml: 8 }}>
															<LunaIcon />
														</Box>
													</Flex>
												</OfferCardSubtitle>
											</OfferCard>

											<OfferCard>
												<OfferCardTitle>
													{t('loan-listings:submit-loan-offer-modal.interest')}
												</OfferCardTitle>
												<OfferCardSubtitle>
													{t('loan-listings:submit-loan-offer-modal.interest-description', {
														apr: interestRate,
														amount: (+interestRate / 100) * +tokenAmount,
													})}
												</OfferCardSubtitle>
											</OfferCard>
										</Flex>
									</Box>
									<OnlyMobileAndTablet>
										<HorizontalLoanLine />
									</OnlyMobileAndTablet>
									<OnlyOnDesktop>
										<VerticalLoanLine />
									</OnlyOnDesktop>
									<Flex
										sx={{
											flexDirection: 'column',
											flex: 1,
										}}
									>
										<Title>
											{t('loan-listings:submit-loan-offer-modal.nft-collateral')}
										</Title>
										<Grid>
											{loanNFTs.map(nft => (
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
													`${ROUTES.LOAN_LISTING_DETAILS}?loanId=${loan?.loanId}&borrower=${loan?.borrower}`
												)
												modal.remove()
											}}
										>
											{t('loan-listings:submit-loan-offer-modal.back-to-listing')}
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
												{t('loan-listings:submit-loan-offer-modal.edit-offer')}
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
												{t('loan-listings:submit-loan-offer-modal.submit-offer')}
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
export default SubmitLoanOfferModal
