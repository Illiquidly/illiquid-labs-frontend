import ConfirmListingSuccessImage from 'assets/images/ConfirmListingSuccessImage'
import If from 'components/core/if-statement'
import { Button } from 'components/ui/button'
import { Chip } from 'components/ui/chip'
import { CopyField } from 'components/shared'
import { NFTCard } from 'components/shared/nft-card'
import { useTranslation } from 'next-i18next'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Flex } from 'theme-ui'
import { noop } from 'lodash'

import { NavigationFooter } from 'components/shared/navigation-footer'
import { SendFormStepsProps } from 'types/send'
import { CREATE_SEND_FORM_STEPS } from 'constants/steps'
import { useRouter } from 'next/router'
import { SEND_TYPE } from 'constants/sendTypes'
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
} from './ConfirmSend.styled'
import RecipientTable from './RecipientTable'

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
	const { t } = useTranslation(['common', 'send'])
	const { reset, watch } = useFormContext<SendFormStepsProps>()

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
					<SuccessTitle>{t('send:confirm-send.congratulations')}</SuccessTitle>
					<SuccessMessage>
						{t('send:confirm-send.congratulations-message')}
					</SuccessMessage>
					<Flex sx={{ justifyContent: 'center', gap: '12px' }}>
						<Button
							variant='primary'
							onClick={() => {
								reset()
								setStep(CREATE_SEND_FORM_STEPS.SELECT_NFTS)
							}}
						>
							{t('common:send-another')}
						</Button>
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
					<SuccessLabel>{t('send:confirm-send.transaction-id')}</SuccessLabel>
					<CopyField data={`${watch('terraFinderUrl')}`} />
				</Box>
			</ContentCard>
		</Flex>
	)
}

export const ConfirmSend = ({
	goBackStep,
	setStep,
	canGoToNextStep,
}: Props) => {
	const { t } = useTranslation(['common', 'send'])
	const { getValues, watch, handleSubmit } = useFormContext<SendFormStepsProps>()

	const selectedNFTs = getValues('selectedNFTs')
	const memo = getValues('memo') || ''
	const recipient = getValues('recipient') || ''
	const isSuccessScreen = watch('isSuccessScreen')
	const router = useRouter()

	const { type: sendType = SEND_TYPE.MULTI_SEND_TYPE } = router.query

	return (
		<ContentCardWrapper>
			<If condition={isSuccessScreen}>
				<If.Then>
					<SuccessScreen setStep={setStep} />
				</If.Then>
				<If.Else>
					<ContentCard>
						<ContentCardTitle>
							{t('send:confirm-send.title-message')}
						</ContentCardTitle>
						<ContentCardSubtitle>
							{t('send:confirm-send.instruction')}
						</ContentCardSubtitle>

						{/* WHAT YOU ARE SENDING */}
						<Box>
							<StepHeader
								onEditClick={() => setStep(CREATE_SEND_FORM_STEPS.SELECT_NFTS)}
							>
								<StepTitle>
									{t('send:confirm-send.what-are-you-sending')}
									<span>{t('common:nft', { count: selectedNFTs.length })}</span>
								</StepTitle>
							</StepHeader>

							{sendType === SEND_TYPE.MULTI_SEND_TYPE && (
								<NFTCardsContainer>
									{selectedNFTs.map(selectedNFT => {
										return (
											<NFTCard
												key={`${selectedNFT.collectionAddress}_${selectedNFT.tokenId}`}
												{...selectedNFT}
												size='small'
											/>
										)
									})}
								</NFTCardsContainer>
							)}

							{sendType === SEND_TYPE.AIRDROP_TYPE && (
								<RecipientTable nfts={selectedNFTs} />
							)}
						</Box>

						{/* Memo */}
						<Box>
							<StepHeader
								onEditClick={() => setStep(CREATE_SEND_FORM_STEPS.RECIPIENT_DETAILS)}
							>
								<StepTitle>{t('send:confirm-send.memo')}</StepTitle>
							</StepHeader>
							<Box pb='24px' style={{ width: 'fit-content' }}>
								{memo ? (
									<Chip isViewMode>{`"${memo}"`}</Chip>
								) : (
									<NoContent>{t('send:confirm-send.no-content-memo')}</NoContent>
								)}
							</Box>
						</Box>

						{/* Recipient */}
						{sendType === SEND_TYPE.MULTI_SEND_TYPE && (
							<Box>
								<StepHeader
									onEditClick={() => setStep(CREATE_SEND_FORM_STEPS.RECIPIENT_DETAILS)}
								>
									<StepTitle>{t('send:confirm-send.recipient')}</StepTitle>
								</StepHeader>
								<Box pb='24px' style={{ width: 'fit-content' }}>
									{recipient ? (
										<Chip isViewMode>{`"${recipient}"`}</Chip>
									) : (
										<NoContent>{t('send:confirm-send.no-content-recipient')}</NoContent>
									)}
								</Box>
							</Box>
						)}
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
