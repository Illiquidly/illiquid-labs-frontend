import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import TradeDetailsSpecifiedCollection from 'assets/images/TradeDetailsSpecifiedCollection'
import {
	RadioCard as RadioCardSelector,
	RadioInputGroupProvider,
} from 'components'
import { TextInputField } from 'components/form/fields/text-input-field'
import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
import useIsMobile from 'hooks/react/useIsMobile'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { Box, Flex } from 'theme-ui'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
	Label,
	MessageBox,
	RadioWrapper,
	RadioWrapperSubtitle,
} from './ChooseVisibility.styled'
import { TradeFormStepsProps, VISIBILITY_TYPE } from './formProps'
import { NavigationFooter } from './NavigationFooter'

const ChooseVisibilityCollectionSelector = () => {
	const { t } = useTranslation(['common', 'trade'])
	const { register } = useFormContext<TradeFormStepsProps>()

	return (
		<Flex sx={{ gap: '8px' }}>
			<RadioCardSelector
				value={VISIBILITY_TYPE.PUBLIC}
				title={t('trade:choose-visibility.option-1')}
				subtitle={t('trade:choose-visibility.option-1-subtitle')}
				Image={<TradeDetailsOpenToOffers />}
				{...register('visibilityType')}
			/>
			<RadioCardSelector
				value={VISIBILITY_TYPE.PRIVATE}
				title={t('trade:choose-visibility.option-2')}
				subtitle={t('trade:choose-visibility.option-2-subtitle')}
				Image={<TradeDetailsSpecifiedCollection />}
				{...register('visibilityType')}
			/>
		</Flex>
	)
}

const ChooseVisibilityForm = () => {
	const { t } = useTranslation(['common', 'trade'])
	const isMobile = useIsMobile()
	const {
		register,
		setValue,
		getValues,
		formState: { errors },
	} = useFormContext<TradeFormStepsProps>()

	return (
		<FormWrapper>
			<RadioInputGroupProvider
				value={getValues('visibilityType')}
				name={register('visibilityType').name}
				onChange={e =>
					setValue('visibilityType', e.target.value as VISIBILITY_TYPE)
				}
			>
				<RadioWrapper>
					<RadioCard value={VISIBILITY_TYPE.PUBLIC}>
						<RadioCardText>
							{t('trade:choose-visibility.option-1')}
							{isMobile && (
								<RadioWrapperSubtitle>
									{t('trade:choose-visibility.option-1-subtitle-mobile')}
								</RadioWrapperSubtitle>
							)}
						</RadioCardText>
					</RadioCard>

					<RadioCard value={VISIBILITY_TYPE.PRIVATE}>
						<RadioCardText>
							{t('trade:choose-visibility.option-2')}
							{isMobile && (
								<RadioWrapperSubtitle>
									{t('trade:choose-visibility.option-2-subtitle-mobile')}
								</RadioWrapperSubtitle>
							)}
						</RadioCardText>
					</RadioCard>
				</RadioWrapper>
			</RadioInputGroupProvider>
			<Box pt='24px'>
				{getValues('visibilityType') === VISIBILITY_TYPE.PUBLIC && (
					<MessageBox>{t('trade:choose-visibility.public-message')}</MessageBox>
				)}
				{getValues('visibilityType') === VISIBILITY_TYPE.PRIVATE && (
					<>
						<Label htmlFor='walletAddress'>
							{t('trade:choose-visibility.wallet-address-label')}
						</Label>
						<TextInputField
							id='walletAddress'
							{...register('walletAddress')}
							fieldError={
								errors.walletAddress &&
								t(`common:errors.${errors.walletAddress.message}`)
							}
							error={!!errors.walletAddress}
							placeholder={t('trade:choose-visibility.wallet-address-placeholder')}
						/>
					</>
				)}
			</Box>
		</FormWrapper>
	)
}

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const ChooseVisibility = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { getValues, watch, trigger } = useFormContext<TradeFormStepsProps>()
	const watchVisibilityType = watch('visibilityType', undefined)
	const isMobile = useIsMobile()
	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('trade:choose-visibility.question')}</ContentCardTitle>
				<ContentCardSubtitle>
					{t('trade:choose-visibility.instruction')}
				</ContentCardSubtitle>
				{!watchVisibilityType && !isMobile ? (
					<ChooseVisibilityCollectionSelector />
				) : (
					<ChooseVisibilityForm />
				)}
			</ContentCard>

			{/* Footer Navigation Section */}
			<NavigationFooter
				goBackStep={goBackStep}
				goNextStep={async () => {
					const isValidWalletAddress = await trigger(['walletAddress'])
					if (isValidWalletAddress) {
						goNextStep()
					}
				}}
				isNextButtonDisabled={!getValues('visibilityType')}
			/>
		</ContentCardWrapper>
	)
}
