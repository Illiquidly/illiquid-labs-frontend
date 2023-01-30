import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { Box, Flex } from 'theme-ui'

import { WalletIcon } from 'assets/icons/mixed'
import {
	RadioCard as RadioCardSelector,
	RadioInputGroupProvider,
} from 'components/ui'
import { TextInputField } from 'components/form/fields/text-input-field'
import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
import useIsMobile from 'hooks/react/useIsMobile'
import PublicTradeListing from 'assets/images/PublicTradeListing'
import PrivateTradeListing from 'assets/images/PrivateTradeListing'
import { TradeFormStepsProps } from 'types'
import { NavigationFooter } from 'components/shared/navigation-footer'
import { VISIBILITY_TYPE } from 'constants/trade'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
	MessageBox,
	RadioWrapper,
	RadioWrapperSubtitle,
} from './ChooseVisibility.styled'

const ChooseVisibilityCollectionSelector = () => {
	const { t } = useTranslation(['common', 'trade'])
	const { register } = useFormContext<TradeFormStepsProps>()

	return (
		<Flex sx={{ gap: '8px' }}>
			<RadioCardSelector
				value={VISIBILITY_TYPE.PUBLIC}
				title={t('trade:choose-visibility.option-1')}
				subtitle={t('trade:choose-visibility.option-1-subtitle')}
				Image={<PublicTradeListing />}
				{...register('visibilityType')}
			/>
			<RadioCardSelector
				value={VISIBILITY_TYPE.PRIVATE}
				title={t('trade:choose-visibility.option-2')}
				subtitle={t('trade:choose-visibility.option-2-subtitle')}
				Image={<PrivateTradeListing />}
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
		unregister,
		formState: { errors },
	} = useFormContext<TradeFormStepsProps>()

	const visibilityType = getValues('visibilityType')

	useEffect(() => {
		if (visibilityType === VISIBILITY_TYPE.PUBLIC) {
			unregister('walletAddress', { keepValue: true })
		}
	}, [visibilityType, unregister])

	return (
		<FormWrapper>
			<RadioInputGroupProvider
				value={visibilityType}
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
					<TextInputField
						label={t('trade:choose-visibility.wallet-address-label')}
						id='walletAddress'
						iconLeft={<WalletIcon />}
						{...register('walletAddress')}
						fieldError={
							errors.walletAddress &&
							t(`common:errors.${errors.walletAddress.message}`)
						}
						error={!!errors.walletAddress}
						placeholder={t('trade:choose-visibility.wallet-address-placeholder')}
					/>
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
	const {
		getValues,
		watch,
		trigger,
		formState: { isValid },
	} = useFormContext<TradeFormStepsProps>()
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
				isNextButtonDisabled={!getValues('visibilityType') || !isValid}
			/>
		</ContentCardWrapper>
	)
}
