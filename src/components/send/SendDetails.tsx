import { useRouter } from 'next/router'
import { Box, Flex } from 'theme-ui'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { TextAreaField, TextInputField } from 'components/form'

import { NavigationFooter } from 'components/shared/navigation-footer'
import { SendFormStepsProps } from 'types/send/types'

import { AIRDROP_TYPE, SEND_TYPE } from 'constants/sendTypes'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
} from './SendDetails.styled'
import { NFTDetailsLabel, PreviewImage, PreviewImageContainer } from './styled'

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const SendDetails = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'send'])
	const router = useRouter()

	const { type: sendType = SEND_TYPE.MULTI_SEND_TYPE } = router.query

	const {
		control,
		register,
		watch,
		formState: { isValid, errors },
	} = useFormContext<SendFormStepsProps>()

	const { fields } = useFieldArray({
		control,
		name: 'selectedNFTs',
	})

	const airdropType = watch('airdropType')

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>
					{t(
						`send:send-details.${
							sendType === SEND_TYPE.AIRDROP_TYPE &&
							airdropType === AIRDROP_TYPE.PARTICIPANTS
								? 'question2'
								: 'question'
						}`
					)}
				</ContentCardTitle>
				<ContentCardSubtitle>
					{t(
						`send:send-details.${
							sendType === SEND_TYPE.AIRDROP_TYPE &&
							airdropType === AIRDROP_TYPE.PARTICIPANTS
								? 'instructions2'
								: 'instructions'
						}`
					)}
				</ContentCardSubtitle>
				<FormWrapper>
					{sendType === SEND_TYPE.MULTI_SEND_TYPE && (
						<Box sx={{ pt: '8px' }}>
							<TextInputField
								label={t('send:send-details.recipient-label')}
								id='recipient'
								{...register('recipient')}
								fieldError={
									errors.recipient && t(`common:errors.${errors?.recipient?.message}`)
								}
								error={!!errors.recipient}
								placeholder={t('send:send-details.recipient-placeholder')}
							/>
						</Box>
					)}

					{sendType === SEND_TYPE.AIRDROP_TYPE &&
						airdropType === AIRDROP_TYPE.PARTICIPANTS && (
							<Flex
								sx={{ flexDirection: 'column', gap: '16px', mt: '12px', mb: '25px' }}
							>
								<Flex sx={{ gap: '24px', alignItems: 'center' }}>
									<Box sx={{ width: '90px' }}>
										<NFTDetailsLabel>{t('send:send-details.nft')}</NFTDetailsLabel>
									</Box>
									<NFTDetailsLabel>
										{t('send:send-details.receiving-wallet')}
									</NFTDetailsLabel>
								</Flex>
								{fields.map((nft, index) => (
									<Flex key={nft.id} sx={{ gap: '24px', alignItems: 'center' }}>
										<PreviewImageContainer>
											{nft.imageUrl?.every(img => img === '') ? (
												<ImagePlaceholder width='80px' height='80px' />
											) : (
												<PreviewImage src={nft.imageUrl ?? []} />
											)}
										</PreviewImageContainer>
										<Flex sx={{ flex: 1, paddingTop: '26px' }}>
											<TextInputField
												{...register(`selectedNFTs.${index}.recipient`)}
												placeholder={t('send:send-details.recipient-placeholder')}
											/>
										</Flex>
									</Flex>
								))}
							</Flex>
						)}

					<Box sx={{ pt: '8px' }}>
						<TextAreaField
							style={{ height: '128px' }}
							label={t('send:send-details.memo-label')}
							id='memo'
							{...register('memo')}
							fieldError={errors.memo && t(`common:errors.${errors?.memo?.message}`)}
							error={!!errors.memo}
							placeholder={t('send:send-details.memo-placeholder')}
						/>
					</Box>
				</FormWrapper>
			</ContentCard>

			{/* Footer Navigation Section */}
			<NavigationFooter
				goBackStep={goBackStep}
				goNextStep={goNextStep}
				isNextButtonDisabled={!isValid}
			/>
		</ContentCardWrapper>
	)
}
