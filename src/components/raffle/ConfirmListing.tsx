import { LunaIcon, TwitterIcon } from 'assets/icons/mixed'
import ConfirmListingSuccessImage from 'assets/images/ConfirmListingSuccessImage'
import If from 'components/core/if-statement'
import { theme } from 'components/theme/theme'
import { Button } from 'components/ui/button'
import { Chip } from 'components/ui/chip'
import { CopyField } from 'components/shared'
import { NFTCard } from 'components/shared/nft-card'
import { useTranslation } from 'next-i18next'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Flex } from 'theme-ui'
import { noop } from 'lodash'

import { TwitterShareButton } from 'react-share'
import { NavigationFooter } from 'components/shared/navigation-footer'
import { RaffleFormStepsProps } from 'types/raffle'
import { CREATE_RAFFLE_LISTING_FORM_STEPS } from 'constants/steps'
import moment from 'moment'
import { TicketOutlineIcon } from 'assets/icons/20ptOutline'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	EditButton,
	NFTCardsContainer,
	StepTitle,
	SuccessLabel,
	SuccessMessage,
	SuccessTitle,
} from './ConfirmListing.styled'

interface StepHeaderProps {
	children: ReactNode
	onEditClick: () => void
}

interface SuccessScreenProps {
	setStep: Dispatch<SetStateAction<number>>
}
interface Props {
	goBackStep: () => void
	setStep: Dispatch<SetStateAction<number>>
	canGoToNextStep: boolean
}

const StepHeader = ({ children, onEditClick }: StepHeaderProps) => {
	const { t } = useTranslation(['common'])

	return (
		<Flex style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
			{children}
			<EditButton onClick={onEditClick}>{t('common:edit')}</EditButton>
		</Flex>
	)
}

const SuccessScreen = ({ setStep }: SuccessScreenProps) => {
	const { t } = useTranslation(['common', 'raffle'])
	const { reset, watch, getValues } = useFormContext<RaffleFormStepsProps>()
	const raffleDetailsUrl = getValues('raffleDetailsUrl')

	return (
		<Flex sx={{ flexDirection: 'column', gap: '16px' }}>
			<ContentCard sx={{ padding: ['16px 12px 32px', '24px 12px 40px'] }}>
				<Flex
					sx={{
						margin: 'auto',
						alignItems: 'center',
						flexDirection: 'column',
						maxWidth: '314px',
					}}
				>
					<ConfirmListingSuccessImage />
					<SuccessTitle>{t('raffle:confirm-listing.congratulations')}</SuccessTitle>
					<SuccessMessage>
						{t('raffle:confirm-listing.congratulations-message')}
					</SuccessMessage>
					<Flex sx={{ justifyContent: 'center', gap: '12px' }}>
						<Button
							variant='primary'
							onClick={() => {
								reset()
								setStep(CREATE_RAFFLE_LISTING_FORM_STEPS.SELECT_NFTS)
							}}
						>
							{t('common:create-another')}
						</Button>
						<TwitterShareButton
							title={t('common:checkout-my-raffle')}
							url={raffleDetailsUrl}
						>
							<Button onClick={e => e.preventDefault()} variant='dark'>
								<Flex pr={2}>
									<TwitterIcon fill={theme.colors.natural50} />
								</Flex>
								{t('common:tweet')}
							</Button>
						</TwitterShareButton>
					</Flex>
				</Flex>
			</ContentCard>
			<ContentCard
				sx={{
					padding: ['16px 16px 28px', '24px 24px 36px'],
					display: 'flex',
					flexDirection: 'column',
					gap: '36px',
				}}
			>
				<Box>
					<SuccessLabel>{t('raffle:confirm-listing.your-listing-url')}</SuccessLabel>
					<CopyField data={`${watch('raffleDetailsUrl')}`} />
				</Box>
				<Box>
					<SuccessLabel>{t('raffle:confirm-listing.transaction-id')}</SuccessLabel>
					<CopyField data={`${watch('terraFinderUrl')}`} />
				</Box>
			</ContentCard>
		</Flex>
	)
}

export const ConfirmListing = ({
	goBackStep,
	setStep,
	canGoToNextStep,
}: Props) => {
	const { t } = useTranslation(['common', 'raffle'])
	const { getValues, setValue, watch, handleSubmit } =
		useFormContext<RaffleFormStepsProps>()

	const selectedCoverNFT = watch('coverNFT')
	const selectedNFTs = getValues('selectedNFTs')
	// const selectedComment = getValues('comment') || ''
	const isSuccessScreen = watch('isSuccessScreen')
	const ticketSupply = getValues('ticketSupply')
	const ticketPrice = getValues('ticketPrice')
	const ticketPriceCurrency = getValues('ticketPriceCurrency')
	const endTime = getValues('endTime')
	const endDate = getValues('endDate')

	return (
		<ContentCardWrapper>
			<If condition={isSuccessScreen}>
				<If.Then>
					<SuccessScreen setStep={setStep} />
				</If.Then>
				<If.Else>
					<ContentCard>
						<ContentCardTitle>
							{t('raffle:confirm-listing.title-message')}
						</ContentCardTitle>
						<ContentCardSubtitle>
							{t('raffle:confirm-listing.instruction')}
						</ContentCardSubtitle>

						{/* WHAT YOU ARE RAFFLING */}
						<Box>
							<StepHeader
								onEditClick={() =>
									setStep(CREATE_RAFFLE_LISTING_FORM_STEPS.SELECT_NFTS)
								}
							>
								<StepTitle>
									{t('raffle:confirm-listing.what-are-you-raffling')}
									<span>{t('common:nft', { count: selectedNFTs.length })}</span>
								</StepTitle>
							</StepHeader>

							<NFTCardsContainer>
								{selectedNFTs.map(selectedNFT => {
									return (
										<NFTCard
											key={`${selectedNFT.collectionAddress}_${selectedNFT.tokenId}`}
											{...selectedNFT}
											size='small'
											isCover={
												`${selectedNFT.collectionAddress}_${selectedNFT.tokenId}` ===
												`${selectedCoverNFT.collectionAddress}_${selectedCoverNFT.tokenId}`
											}
											hasCoverSelector
											onCardClick={() => setValue('coverNFT', selectedNFT)}
										/>
									)
								})}
							</NFTCardsContainer>
						</Box>

						{/* RAFFLE END AND START TIME */}
						<Box>
							<StepHeader
								onEditClick={() =>
									setStep(CREATE_RAFFLE_LISTING_FORM_STEPS.RAFFLE_DETAILS)
								}
							>
								<StepTitle>
									{t('raffle:confirm-listing.raffle-end-time-and-start-time')}
								</StepTitle>
							</StepHeader>
							<Box pb='24px' style={{ width: 'fit-content' }}>
								<Chip isViewMode>
									{moment(
										`${moment(endDate).format('YYYY-MM-DD')} ${moment(endTime).format(
											'HH:mm'
										)}`
									).toLocaleString()}
								</Chip>
							</Box>
						</Box>
						{/* Ticket Supply */}
						<Box>
							<StepHeader
								onEditClick={() =>
									setStep(CREATE_RAFFLE_LISTING_FORM_STEPS.RAFFLE_DETAILS)
								}
							>
								<StepTitle>
									{t('raffle:confirm-listing.raffle-ticket-supply-label')}
								</StepTitle>
							</StepHeader>
							<Box pb='24px' style={{ width: 'fit-content' }}>
								<Chip isViewMode>
									<TicketOutlineIcon />
									{ticketSupply}
								</Chip>
							</Box>
						</Box>
						{/* Ticket Supply */}
						<Box>
							<StepHeader
								onEditClick={() =>
									setStep(CREATE_RAFFLE_LISTING_FORM_STEPS.RAFFLE_DETAILS)
								}
							>
								<StepTitle>
									{t('raffle:confirm-listing.raffle-ticket-price-label')}
								</StepTitle>
							</StepHeader>
							<Box pb='24px' style={{ width: 'fit-content' }}>
								<Chip isViewMode>
									<LunaIcon />
									<div>{`${ticketPrice} ${ticketPriceCurrency}`}</div>
								</Chip>
							</Box>
						</Box>
					</ContentCard>

					{/* Footer Navigation Section */}
					<NavigationFooter
						canGoToNextStep={canGoToNextStep}
						goBackStep={goBackStep}
						goNextStep={() => handleSubmit(noop)}
						isNextButtonDisabled={false}
					/>
				</If.Else>
			</If>
		</ContentCardWrapper>
	)
}
