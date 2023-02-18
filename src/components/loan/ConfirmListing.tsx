import { LunaIcon, TwitterIcon } from 'assets/icons/mixed'
import ConfirmListingSuccessImage from 'assets/images/ConfirmListingSuccessImage'
import If from 'components/core/if-statement'
import { theme } from 'constants/theme'
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
import {
	CREATE_LOAN_LISTING_FORM_STEPS,
	CREATE_TRADE_LISTING_FORM_STEPS,
} from 'constants/steps'
import { LoanFormStepsProps } from 'types'
import { NavigationFooter } from 'components/shared/navigation-footer'
import {} from 'constants/trade'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	EditButton,
	NFTCardsContainer,
	NoContent,
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
	const { t } = useTranslation(['common', 'loan'])
	const { reset, watch, getValues } = useFormContext<LoanFormStepsProps>()
	const loanDetailsUrl = getValues('loanDetailsUrl')

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
					<SuccessTitle>{t('loan:confirm-listing.congratulations')}</SuccessTitle>
					<SuccessMessage>
						{t('loan:confirm-listing.congratulations-message')}
					</SuccessMessage>
					<Flex sx={{ justifyContent: 'center', gap: '12px' }}>
						<Button
							variant='primary'
							onClick={() => {
								reset()
								setStep(CREATE_LOAN_LISTING_FORM_STEPS.SELECT_NFTS)
							}}
						>
							{t('common:create-another')}
						</Button>
						<TwitterShareButton
							title={t('common:checkout-my-loan')}
							url={loanDetailsUrl}
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
					<SuccessLabel>{t('loan:confirm-listing.your-listing-url')}</SuccessLabel>
					<CopyField data={`${watch('loanDetailsUrl')}`} />
				</Box>
				<Box>
					<SuccessLabel>{t('loan:confirm-listing.transaction-id')}</SuccessLabel>
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
	const { t } = useTranslation(['common', 'loan'])
	const { getValues, setValue, watch, handleSubmit } =
		useFormContext<LoanFormStepsProps>()

	const selectedCoverNFT = watch('coverNFT')
	const selectedNFTs = getValues('selectedNFTs')
	const selectedComment = getValues('comment') || ''
	const interestRate = getValues('interestRate')
	const loanPeriod = getValues('loanPeriod')
	const tokenAmount = getValues('tokenAmount')
	const isSuccessScreen = watch('isSuccessScreen')
	const tokenName = getValues('tokenName')

	return (
		<ContentCardWrapper>
			<If condition={isSuccessScreen}>
				<If.Then>
					<SuccessScreen setStep={setStep} />
				</If.Then>
				<If.Else>
					<ContentCard>
						<ContentCardTitle>
							{t('loan:confirm-listing.title-message')}
						</ContentCardTitle>
						<ContentCardSubtitle>
							{t('loan:confirm-listing.instruction')}
						</ContentCardSubtitle>

						{/* WHAT YOU ARE OFFERING */}
						<Box>
							<StepHeader
								onEditClick={() => setStep(CREATE_TRADE_LISTING_FORM_STEPS.SELECT_NFTS)}
							>
								<StepTitle>
									{t('loan:confirm-listing.what-are-you-offering')}
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

						{/* COMMENTS */}
						<Box>
							<StepHeader
								onEditClick={() =>
									setStep(CREATE_TRADE_LISTING_FORM_STEPS.TRADE_DETAILS)
								}
							>
								<StepTitle>{t('loan:confirm-listing.loan-details')}</StepTitle>
							</StepHeader>
							<Flex pb='24px' sx={{ gap: 8, flexWrap: 'wrap' }}>
								<Chip isViewMode>
									<Flex sx={{ mr: '2px', alignItems: 'center' }}>
										<LunaIcon />
									</Flex>
									{tokenAmount} {tokenName}
								</Chip>
								<Chip isViewMode>
									{interestRate}% {t('common:interest-rate')}
								</Chip>
								<Chip isViewMode>
									{t('loan:confirm-listing.day-loan', { day: loanPeriod })}
								</Chip>
							</Flex>
						</Box>

						{/* COMMENTS */}
						<Box>
							<StepHeader
								onEditClick={() =>
									setStep(CREATE_TRADE_LISTING_FORM_STEPS.TRADE_DETAILS)
								}
							>
								<StepTitle>{t('loan:confirm-listing.comments')}</StepTitle>
							</StepHeader>
							<Box pb='24px' style={{ width: 'fit-content' }}>
								{selectedComment ? (
									<Chip isViewMode>{`"${selectedComment}"`}</Chip>
								) : (
									<NoContent>{t('loan:confirm-listing.no-content-comments')}</NoContent>
								)}
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
