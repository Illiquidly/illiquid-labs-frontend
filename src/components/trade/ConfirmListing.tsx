import { PrivateIcon, PublicIcon } from 'assets/icons/mixed'
import { TwitterIcon } from 'assets/icons/social'
import ConfirmListingSuccessImage from 'assets/images/ConfirmListingSuccessImage'
import If from 'components/core/if-statement'
import { theme } from 'components/theme/theme'
import { Button } from 'components/ui/button'
import { Chip, VisibilityChip } from 'components/ui/chip'
import { CopyField } from 'components/shared'
import { NFTCard } from 'components/shared/nft-card'
import { StepProps } from 'hooks/react/useStep'
import { useTranslation } from 'next-i18next'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Flex } from 'theme-ui'
import { noop } from 'lodash'

import { TwitterShareButton } from 'react-share'
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
import { TradeFormStepsProps, VISIBILITY_TYPE } from './types'
import { NavigationFooter } from './NavigationFooter'

interface StepHeaderProps {
	children: ReactNode
	onEditClick: () => void
}

interface SuccessScreenProps {
	setStep: Dispatch<SetStateAction<StepProps>>
}
interface Props {
	goBackStep: () => void
	setStep: Dispatch<SetStateAction<StepProps>>
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
	const { t } = useTranslation(['common', 'trade'])
	const { reset, watch, getValues } = useFormContext<TradeFormStepsProps>()
	const tradeDetailsUrl = getValues('tradeDetailsUrl')

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
					<SuccessTitle>{t('trade:confirm-listing.congratulations')}</SuccessTitle>
					<SuccessMessage>
						{t('trade:confirm-listing.congratulations-message')}
					</SuccessMessage>
					<Flex sx={{ justifyContent: 'center', gap: '12px' }}>
						<Button
							variant='primary'
							onClick={() => {
								reset()
								setStep(prevStep => ({ ...prevStep, current: 0 }))
							}}
						>
							{t('common:create-another')}
						</Button>
						<TwitterShareButton
							title={t('trade-listings:checkout-my-trade')}
							url={tradeDetailsUrl}
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
					<SuccessLabel>{t('trade:confirm-listing.your-listing-url')}</SuccessLabel>
					<CopyField data={`${watch('tradeDetailsUrl')}`} />
				</Box>
				<Box>
					<SuccessLabel>{t('trade:confirm-listing.transaction-id')}</SuccessLabel>
					<CopyField data={`${watch('terraFinderUrl')}`} />
				</Box>
			</ContentCard>
		</Flex>
	)
}

export const ConfirmListing = ({ goBackStep, setStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { getValues, setValue, watch, handleSubmit } =
		useFormContext<TradeFormStepsProps>()

	const selectedCoverNFT = watch('coverNFT')
	const selectedNFTs = getValues('selectedNFTs')
	const selectedCollections = getValues('collections') || []
	const selectedComment = getValues('comment') || ''
	const selectedVisibilityType = getValues('visibilityType')
	const selectedWalletAddress = getValues('walletAddress')
	const isSuccessScreen = watch('isSuccessScreen')

	return (
		<ContentCardWrapper>
			<If condition={isSuccessScreen}>
				<If.Then>
					<SuccessScreen setStep={setStep} />
				</If.Then>
				<If.Else>
					<ContentCard>
						<ContentCardTitle>
							{t('trade:confirm-listing.title-message')}
						</ContentCardTitle>
						<ContentCardSubtitle>
							{t('trade:confirm-listing.instruction')}
						</ContentCardSubtitle>

						{/* WHAT YOU ARE OFFERING */}
						<Box>
							<StepHeader
								onEditClick={() => setStep(prevStep => ({ ...prevStep, current: 0 }))}
							>
								<StepTitle>
									{t('trade:confirm-listing.what-are-you-offering')}
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

						{/* WHAT YOU ARE LOOKING FOR */}
						<Box>
							<StepHeader
								onEditClick={() => setStep(prevStep => ({ ...prevStep, current: 1 }))}
							>
								<StepTitle>
									{t('trade:confirm-listing.what-are-you-looking-for')}
								</StepTitle>
							</StepHeader>
							<Flex pb='24px' style={{ flexWrap: 'wrap', gap: '8px 4px' }}>
								<If condition={selectedCollections.length > 0}>
									<If.Then>
										{selectedCollections.map(selectedCollection => (
											<Chip isViewMode flexGrowItems key={selectedCollection.value}>
												{selectedCollection.label}
											</Chip>
										))}
									</If.Then>

									<If.Else>
										<NoContent>
											{t('trade:confirm-listing.no-content-what-are-you-looking-for')}
										</NoContent>
									</If.Else>
								</If>
							</Flex>
						</Box>

						{/* COMMENTS */}
						<Box>
							<StepHeader
								onEditClick={() => setStep(prevStep => ({ ...prevStep, current: 1 }))}
							>
								<StepTitle>{t('trade:confirm-listing.comments')}</StepTitle>
							</StepHeader>
							<Box pb='24px' style={{ width: 'fit-content' }}>
								{selectedComment ? (
									<Chip isViewMode>{`"${selectedComment}"`}</Chip>
								) : (
									<NoContent>{t('trade:confirm-listing.no-content-comments')}</NoContent>
								)}
							</Box>
						</Box>

						{/* TRADE VISIBILITY */}
						<Box>
							<StepHeader
								onEditClick={() => setStep(prevStep => ({ ...prevStep, current: 2 }))}
							>
								<StepTitle>{t('trade:confirm-listing.trade-visibility')}</StepTitle>
							</StepHeader>
							<Box pb='24px'>
								{selectedVisibilityType === VISIBILITY_TYPE.PUBLIC ? (
									<VisibilityChip
										icon={<PublicIcon />}
										leftText={t('trade:confirm-listing.public')}
										rightText={t('trade:confirm-listing.public-message')}
									/>
								) : (
									<VisibilityChip
										icon={<PrivateIcon />}
										leftText={t('trade:confirm-listing.private')}
										rightText={selectedWalletAddress}
									/>
								)}
							</Box>
						</Box>
					</ContentCard>

					{/* Footer Navigation Section */}
					<NavigationFooter
						goBackStep={goBackStep}
						goNextStep={() => handleSubmit(noop)}
						isNextButtonDisabled={false}
					/>
				</If.Else>
			</If>
		</ContentCardWrapper>
	)
}
