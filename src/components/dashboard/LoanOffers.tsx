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
import { LATEST_BLOCK, VERIFIED_COLLECTIONS } from 'constants/useQueryKeys'
import { ConnectType, useWallet, WalletStatus } from '@terra-money/use-wallet'
import { SupportedCollectionsService } from 'services/api'
import { useQuery } from '@tanstack/react-query'
import { MultiSelectAccordionInputOption } from 'components/ui/multi-select-accordion-input/MultiSelectAccordionInput'
import useIsTablet from 'hooks/react/useIsTablet'
import { LoansResponse, LOAN_STATE } from 'services/api/loansService'
import { BLOCKS_PER_DAY } from 'constants/core'
import { calculateRangePercentage } from 'utils/js/calculateRangePercentage'
import terraUtils from 'utils/blockchain/terraUtils'
import LoanOfferCard from './LoanOfferCard'
import {
	AccordionContentWrapper,
	ActivityCard,
	ActivityCardEmptyContainer,
	ActivityCardEmptyTitle,
	ActivityLoadingContainer,
	SectionTitle,
} from './styled'

interface LoanOffersProps {
	allLoans?: LoansResponse
	refetch: () => void
	isLoading: boolean
	loans?: LoansResponse
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
	loansFetched: boolean
}

function LoanOffers({
	isLoading,
	allLoans,
	loansFetched,
	refetch,
	page,
	setPage,
	loans,
	statuses,
	setStatuses,
	collections,
	setCollections,
	statusOptions,
}: LoanOffersProps) {
	const { t } = useTranslation()
	const wallet = useWallet()
	const isTablet = useIsTablet()

	const { data: verifiedCollections } = useQuery(
		[VERIFIED_COLLECTIONS, wallet.network],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	const { data: latestBlockHeight } = useQuery(
		[LATEST_BLOCK, wallet.network],
		async () => terraUtils.getLatestBlockHeight(),
		{
			enabled: !!wallet.network,
			retry: true,
			refetchInterval: 60 * 1000,
		}
	)

	const connectWallet = () => {
		wallet.connect(isTablet ? ConnectType.WALLETCONNECT : undefined)
	}

	return (
		<Flex sx={{ flexDirection: 'column', gap: '24px', pb: '48px' }}>
			<SectionTitle>{t('dashboard:loans:title')}</SectionTitle>

			{!allLoans?.total && loansFetched ? (
				<ActivityCard>
					<ActivityCardEmptyContainer>
						<EmptyBox />

						<Box sx={{ maxWidth: '524px' }}>
							<ActivityCardEmptyTitle>
								{t('dashboard:loans:no-offers')}
								<br />
								{t('dashboard:loans:make-offer-to-appear')}
							</ActivityCardEmptyTitle>
						</Box>

						{wallet.status === WalletStatus.WALLET_NOT_CONNECTED ? (
							<Button onClick={connectWallet} variant='gradient' size='large'>
								{t('common:connect-wallet')}
							</Button>
						) : (
							<LinkButton href={ROUTES.LOAN_LISTINGS} variant='gradient' size='large'>
								{t('dashboard:loans:explore-listings')}
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
											{t('dashboard:loans:filters:status-label')}
										</AccordionTitle>
									}
								>
									<AccordionContentWrapper>
										<MultiSelectAccordionInput
											value={statuses}
											onChange={v => setStatuses(v)}
											accordionTitle={t('dashboard:loans:filters:status-label')}
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
											{t('dashboard:loans:filters:collections-label')}
										</AccordionTitle>
									}
								>
									<AccordionContentWrapper>
										<MultiSelectAccordionInput
											value={collections}
											onChange={v => setCollections(v)}
											accordionTitle={t(
												'dashboard:loans:filters:nft-collections-search-label'
											)}
											options={(verifiedCollections ?? [])?.map(
												({ collectionAddress, collectionName }) => ({
													label: collectionName,
													value: collectionAddress,
												})
											)}
											placeholder={t(
												'dashboard:loans:filters:search-collections-placeholder'
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
									(loans?.data ?? []).map(loan => {
										const {
											loanId,
											borrower,
											loanInfo: {
												loanPreview,
												associatedAssets,
												activeOffer,
												state,
												terms,
												startBlock,
											},
										} = loan

										const defaultBlock =
											(startBlock ?? 0) +
											(activeOffer?.offerInfo?.terms?.durationInBlocks ?? 0)

										return (
											<Box key={`${loanId}_${borrower}`}>
												<LoanOfferCard
													ended={[
														LOAN_STATE.Withdrawn,
														LOAN_STATE.Defaulted,
														LOAN_STATE.Ended,
													].includes(state)}
													published={[LOAN_STATE.Published].includes(state)}
													funded={[LOAN_STATE.Started].includes(state)}
													defaulted={[LOAN_STATE.PendingDefault].includes(state)}
													description={loanPreview?.cw721Coin?.description ?? ''}
													attributes={loanPreview?.cw721Coin?.attributes ?? []}
													tokenId={loanPreview?.cw721Coin?.tokenId ?? ''}
													collectionAddress={loanPreview?.cw721Coin?.collectionAddress ?? ''}
													href={`${ROUTES.LOAN_LISTING_DETAILS}?loanId=${loanId}&borrower=${borrower}`}
													nfts={(associatedAssets || [])
														.filter(nft => nft.cw721Coin)
														.map(({ cw721Coin }) => cw721Coin as NFT)}
													imageUrl={loanPreview?.cw721Coin?.imageUrl ?? []}
													name={loanPreview?.cw721Coin?.name ?? ''}
													apr={Number(
														activeOffer?.offerInfo?.terms?.interestRate ??
															terms?.interestRate ??
															0
													)}
													borrowAmount={Number(
														activeOffer?.offerInfo?.terms?.principle?.amount ??
															terms?.principle.amount ??
															0
													)}
													timeFrame={Math.floor(
														Number(
															(activeOffer?.offerInfo?.terms?.durationInBlocks ??
																terms?.durationInBlocks) / BLOCKS_PER_DAY
														)
													)}
													verified={(verifiedCollections ?? []).some(
														({ collectionAddress }) =>
															loanPreview?.cw721Coin?.collectionAddress === collectionAddress
													)}
													defaultPercentage={
														startBlock
															? calculateRangePercentage(
																	Number(latestBlockHeight) ?? 0,
																	startBlock ?? 0,
																	defaultBlock ?? 0
															  )
															: 0
													}
													daysUntilDefault={
														[LOAN_STATE.Started].includes(state)
															? (
																	((startBlock ?? 0) +
																		(activeOffer?.offerInfo?.terms?.durationInBlocks ?? 0) -
																		(Number(latestBlockHeight) ?? 0)) /
																	BLOCKS_PER_DAY
															  ).toFixed(2)
															: undefined
													}
													defaultThreshold={90}
													refetchLoan={refetch}
													loan={loan}
													collectionName={loanPreview?.cw721Coin?.collectionName || ''}
												/>
											</Box>
										)
									})}
							</Box>
							<Box sx={{ mt: 'auto', pt: '24px' }}>
								<Pagination
									currentPage={page}
									pageCount={loans?.pageCount}
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

LoanOffers.defaultProps = {
	allLoans: undefined,
	loans: undefined,
}

export default LoanOffers
