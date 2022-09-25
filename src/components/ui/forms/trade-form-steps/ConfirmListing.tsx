import { PrivateIcon, PublicIcon } from 'assets/icons/mixed'
import If from 'components/core/if-statement'
import { Chip, VisibilityChip } from 'components/ui/chip'
import { NFTCard } from 'components/ui/nft-card'
import { StepProps } from 'hooks/react/useStep'
import { useTranslation } from 'next-i18next'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Flex } from 'theme-ui'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	EditButton,
	NFTCardsContainer,
	NoContent,
	StepTitle,
} from './ConfirmListing.styled'
import { TradeFormStepsProps, VISIBILITY_TYPE } from './formProps'
import { NavigationFooter } from './NavigationFooter'

interface StepHeaderProps {
	children: ReactNode
	onEditClick: () => void
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

interface Props {
	goBackStep: () => void
	setStep: Dispatch<SetStateAction<StepProps>>
}

export const ConfirmListing = ({ goBackStep, setStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { getValues, setValue, watch } = useFormContext<TradeFormStepsProps>()
	const selectedCoverNFT = watch('coverNFT')
	const selectedNFTs = getValues('selectedNFTs')
	const selectedCollections = getValues('collections') || []
	const selectedComment = getValues('comment') || ''
	const selectedVisibilityType = getValues('visibilityType')
	const selectedWalletAddress = getValues('walletAddress')

	return (
		<ContentCardWrapper>
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
									onCoverClick={() => setValue('coverNFT', selectedNFT)}
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
				goNextStep={() => console.log('call terra station')}
				isNextButtonDisabled={false}
			/>
		</ContentCardWrapper>
	)
}
