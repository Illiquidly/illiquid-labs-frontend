import NiceModal from '@ebay/nice-modal-react'
import EmptyBox from 'assets/images/EmptyBox'
import { LinkButton } from 'components/link'
import React from 'react'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'

import {
	Accordion,
	AccordionTitle,
	Button,
	Loader,
	MultiSelectAccordionInput,
	Pagination,
} from 'components/ui'
import { CollectionsBoxesIcon, TargetIcon } from 'assets/icons/mixed'
import { NFT } from 'services/api/walletNFTsService'
import { useTranslation } from 'next-i18next'
import { VERIFIED_COLLECTIONS } from 'constants/useQueryKeys'
import { useWallet, WalletStatus } from '@terra-money/wallet-kit'
import { SupportedCollectionsService } from 'services/api'
import { useQuery } from '@tanstack/react-query'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import { RafflesResponse } from 'services/api/rafflesService'
import moment from 'moment'
import { getNetworkName } from 'utils/blockchain/terraUtils'
import { ConnectWalletModal } from 'components/shared/modals/connect-wallet-modal/ConnectWalletModal'
import {
	AccordionContentWrapper,
	ActivityCard,
	ActivityCardEmptyContainer,
	ActivityCardEmptyTitle,
	ActivityLoadingContainer,
	SectionTitle,
} from './styled'
import RaffleOfferCard from './RaffleOfferCard'

interface RaffleOffersProps {
	allRaffles?: RafflesResponse
	isLoading: boolean
	raffles?: RafflesResponse
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	statuses: MultiSelectAccordionInputOption[]
	setStatuses: React.Dispatch<
		React.SetStateAction<MultiSelectAccordionInputOption[]>
	>
	collections: MultiSelectAccordionInputOption[]
	setCollections: React.Dispatch<
		React.SetStateAction<MultiSelectAccordionInputOption[]>
	>
	statusOptions: MultiSelectAccordionInputOption[]
	rafflesFetched: boolean
}

function RaffleOffers({
	isLoading,
	allRaffles,
	rafflesFetched,
	page,
	setPage,
	raffles,
	statuses,
	setStatuses,
	collections,
	setCollections,
	statusOptions,
}: RaffleOffersProps) {
	const { t } = useTranslation()
	const wallet = useWallet()
	const networkName = getNetworkName()

	const { data: verifiedCollections } = useQuery(
		[VERIFIED_COLLECTIONS, networkName],
		async () => SupportedCollectionsService.getSupportedCollections(networkName),
		{
			retry: true,
		}
	)

	const connectWallet = () => {
		NiceModal.show(ConnectWalletModal)
	}

	return (
		<Flex sx={{ flexDirection: 'column', gap: '24px', pb: '48px' }}>
			<SectionTitle>{t('dashboard:raffles:title')}</SectionTitle>

			{!allRaffles?.total && rafflesFetched ? (
				<ActivityCard>
					<ActivityCardEmptyContainer>
						<EmptyBox />

						<Box sx={{ maxWidth: '524px' }}>
							<ActivityCardEmptyTitle>
								{t('dashboard:raffles:no-offers')}
								<br />
								{t('dashboard:raffles:make-offer-to-appear')}
							</ActivityCardEmptyTitle>
						</Box>

						{wallet.status === WalletStatus.NOT_CONNECTED ? (
							<Button onClick={connectWallet} variant='gradient' size='large'>
								{t('common:connect-wallet')}
							</Button>
						) : (
							<LinkButton
								href={ROUTES.RAFFLE_LISTINGS}
								variant='gradient'
								size='large'
							>
								{t('dashboard:raffles:explore-listings')}
							</LinkButton>
						)}
					</ActivityCardEmptyContainer>
				</ActivityCard>
			) : (
				<Flex
					sx={{
						flexDirection: ['column'],
						alignItems: 'center',
						minHeight: '960px',
						pb: ['47px'],
					}}
				>
					<Flex
						sx={{
							flex: [null, null, 1],
							width: '100%',
							flexDirection: ['column', 'column', 'row'],
							gap: ['12px', '12px', '24px'],
						}}
					>
						<Flex
							sx={{
								flex: 1,
								flexDirection: ['column', 'row', 'column'],
								maxWidth: [null, null, '308px'],
								gap: [null, '8px', null],
							}}
						>
							<Box sx={{ flex: [null, 1, 'unset'] }}>
								<Accordion
									icon={<TargetIcon />}
									title={
										<AccordionTitle>
											{t('dashboard:raffles:filters:status-label')}
										</AccordionTitle>
									}
								>
									<AccordionContentWrapper>
										<MultiSelectAccordionInput
											value={statuses}
											onChange={v => setStatuses(v)}
											accordionTitle={t('dashboard:raffles:filters:status-label')}
											options={statusOptions}
										/>
									</AccordionContentWrapper>
								</Accordion>
							</Box>
							<Box sx={{ flex: [null, 1, 'unset'] }}>
								<Accordion
									icon={<CollectionsBoxesIcon />}
									title={
										<AccordionTitle>
											{t('dashboard:raffles:filters:collections-label')}
										</AccordionTitle>
									}
								>
									<AccordionContentWrapper>
										<MultiSelectAccordionInput
											value={collections}
											onChange={v => setCollections(v)}
											accordionTitle={t(
												'dashboard:raffles:filters:nft-collections-search-label'
											)}
											options={(verifiedCollections ?? [])?.map(
												({ collectionAddress, collectionName }) => ({
													label: collectionName,
													value: collectionAddress,
												})
											)}
											placeholder={t(
												'dashboard:raffles:filters:search-collections-placeholder'
											)}
										/>
									</AccordionContentWrapper>
								</Accordion>
							</Box>
						</Flex>

						<Flex
							sx={{
								flexDirection: 'column',
								flex: 1,
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<Box
								sx={{
									display: 'grid',
									width: ['100%'],
									overflow: 'auto',
									gridTemplateColumns: '1fr',
									gridColumnGap: ['16px', '25px', '14px'],
									gridRowGap: ['8px', '16px', '18px'],
								}}
							>
								{isLoading && (
									<ActivityLoadingContainer>
										<Loader />
									</ActivityLoadingContainer>
								)}
								{!isLoading &&
									(raffles?.data ?? []).map(raffle => {
										const {
											raffleId,
											participants,

											raffleInfo: {
												raffleTicketPrice,
												raffleOptions,
												allAssociatedAssets,
												state,
											},
										} = raffle

										const ticketsSold =
											(raffleOptions?.maxParticipantNumber ?? 0) -
											(participants ?? [])
												.map(p => p.ticketNumber)
												.reduce((a, b) => a + b, 0)

										return (
											<Box key={raffleId}>
												<RaffleOfferCard
													state={state}
													raffle={raffle}
													description={
														raffleOptions?.rafflePreview?.cw721Coin?.description ?? ''
													}
													attributes={
														raffleOptions?.rafflePreview?.cw721Coin?.attributes ?? []
													}
													tokenId={raffleOptions?.rafflePreview?.cw721Coin?.tokenId ?? ''}
													collectionAddress={
														raffleOptions?.rafflePreview?.cw721Coin?.collectionAddress ?? ''
													}
													href={`${ROUTES.RAFFLE_LISTING_DETAILS}?raffleId=${raffleId}`}
													nfts={(allAssociatedAssets || [])
														.filter(nft => nft.cw721Coin)
														.map(({ cw721Coin }) => cw721Coin as NFT)}
													imageUrl={raffleOptions?.rafflePreview?.cw721Coin?.imageUrl ?? []}
													name={raffleOptions?.rafflePreview?.cw721Coin?.name ?? ''}
													verified={(verifiedCollections ?? []).some(
														({ collectionAddress }) =>
															raffleOptions?.rafflePreview?.cw721Coin?.collectionAddress ===
															collectionAddress
													)}
													collectionName={
														raffleOptions?.rafflePreview?.cw721Coin?.collectionName || ''
													}
													ticketPrice={
														raffleTicketPrice?.coin?.amount ??
														raffleTicketPrice?.cw20Coin?.amount ??
														0
													}
													ticketCurrency={
														raffleTicketPrice?.coin?.currency ??
														raffleTicketPrice?.cw20Coin?.currency
													}
													ticketNumber={raffleOptions.maxParticipantNumber}
													ticketsSold={ticketsSold}
													endsIn={moment(raffleOptions?.raffleStartDate)
														.add(raffleOptions?.raffleDuration ?? 0, 'seconds')
														.toDate()}
												/>
											</Box>
										)
									})}
							</Box>
							<Box sx={{ mt: 'auto', pt: '24px' }}>
								<Pagination
									currentPage={page}
									pageCount={raffles?.pageCount}
									setPage={setPage}
								/>
							</Box>
						</Flex>
					</Flex>
				</Flex>
			)}
		</Flex>
	)
}

RaffleOffers.defaultProps = {
	allRaffles: undefined,
	raffles: undefined,
}

export default RaffleOffers
