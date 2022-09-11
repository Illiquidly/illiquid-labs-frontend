import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import TradeDetailsSpecifiedCollection from 'assets/images/TradeDetailsSpecifiedCollection'
import {
	RadioCard as RadioCardSelector,
	RadioInputGroupProvider,
	TextInput,
} from 'components'
import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
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
	const { register, setValue, getValues } = useFormContext<TradeFormStepsProps>()

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
						<RadioCardText>{t('trade:choose-visibility.option-1')}</RadioCardText>
					</RadioCard>

					<RadioCard value={VISIBILITY_TYPE.PRIVATE}>
						<RadioCardText>{t('trade:choose-visibility.option-2')}</RadioCardText>
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
						<TextInput
							id='walletAddress'
							{...register('walletAddress')}
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
	const { getValues, watch } = useFormContext<TradeFormStepsProps>()
	const watchVisibilityType = watch('visibilityType', undefined)
	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('trade:choose-visibility.question')}</ContentCardTitle>
				<ContentCardSubtitle>
					{t('trade:choose-visibility.instruction')}
				</ContentCardSubtitle>
				{!watchVisibilityType ? (
					<ChooseVisibilityCollectionSelector />
				) : (
					<ChooseVisibilityForm />
				)}
			</ContentCard>

			{/* Footer Navigation Section */}
			<NavigationFooter
				goBackStep={goBackStep}
				goNextStep={goNextStep}
				isNextButtonDisabled={!getValues('visibilityType')}
			/>
		</ContentCardWrapper>
	)
}