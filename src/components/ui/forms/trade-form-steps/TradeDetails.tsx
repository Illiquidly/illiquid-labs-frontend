import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@terra-money/use-wallet'
import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import TradeDetailsSpecifiedCollection from 'assets/images/TradeDetailsSpecifiedCollection'
import {
	MultiSelectInput,
	RadioCard as RadioCardSelector,
	RadioInputGroupProvider,
	TextArea,
	TextInput,
} from 'components'
import If from 'components/core/if-statement'
import { Chip } from 'components/ui/chip'
import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
import useIsMobile from 'hooks/react/useIsMobile'
import { useTranslation } from 'next-i18next'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { SupportedCollectionsService } from 'services/api'
import { Flex } from 'theme-ui'
import { LOOKING_FOR_TYPE, TradeFormStepsProps } from './formProps'
import { NavigationFooter } from './NavigationFooter'
import {
	ChipsWrapper,
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
	Label,
	RadioWrapper,
} from './TradeDetails.styled'

const TradeDetailsCollectionSelector = () => {
	const { t } = useTranslation(['common', 'trade'])
	const { register, setValue, getValues } = useFormContext<TradeFormStepsProps>()
	const isMobile = useIsMobile()

	return (
		<Flex sx={{ gap: '8px' }}>
			<If condition={isMobile}>
				<If.Then>
					<RadioInputGroupProvider
						value={getValues('lookingForType')}
						name={register('lookingForType').name}
						onChange={e =>
							setValue('lookingForType', e.target.value as LOOKING_FOR_TYPE)
						}
					>
						<RadioWrapper>
							<RadioCard value={LOOKING_FOR_TYPE.SPECIFIC}>
								<RadioCardText>{t('trade:trade-details.option-1')}</RadioCardText>
							</RadioCard>

							<RadioCard value={LOOKING_FOR_TYPE.ANY}>
								<RadioCardText>{t('trade:trade-details.option-2')}</RadioCardText>
							</RadioCard>
						</RadioWrapper>
					</RadioInputGroupProvider>
				</If.Then>

				<If.Else>
					<RadioCardSelector
						value={LOOKING_FOR_TYPE.SPECIFIC}
						title={t('trade:trade-details.option-1')}
						Image={<TradeDetailsSpecifiedCollection />}
						{...register('lookingForType')}
					/>
					<RadioCardSelector
						value={LOOKING_FOR_TYPE.ANY}
						title={t('trade:trade-details.option-2')}
						Image={<TradeDetailsOpenToOffers />}
						{...register('lookingForType')}
					/>
				</If.Else>
			</If>
		</Flex>
	)
}

const TradeDetailsForm = () => {
	const { t } = useTranslation(['common', 'trade'])
	const {
		register,
		setValue,
		getValues,
		control,

		formState: { errors },
	} = useFormContext<TradeFormStepsProps>()
	const wallet = useWallet()

	const { remove } = useFieldArray({
		control,
		name: 'collections',
	})

	const { data: verifiedCollections } = useQuery(
		['verifiedCollections'],
		async () =>
			SupportedCollectionsService.getSupportedCollections(wallet.network.name),
		{
			enabled: !!wallet.network,
			retry: true,
		}
	)

	return (
		<FormWrapper>
			<RadioInputGroupProvider
				value={getValues('lookingForType')}
				name={register('lookingForType').name}
				onChange={e =>
					setValue('lookingForType', e.target.value as LOOKING_FOR_TYPE)
				}
			>
				<RadioWrapper>
					<RadioCard value={LOOKING_FOR_TYPE.SPECIFIC}>
						<RadioCardText>{t('trade:trade-details.option-1')}</RadioCardText>
					</RadioCard>

					<RadioCard value={LOOKING_FOR_TYPE.ANY}>
						<RadioCardText>{t('trade:trade-details.option-2')}</RadioCardText>
					</RadioCard>
				</RadioWrapper>
			</RadioInputGroupProvider>

			{getValues('lookingForType') === LOOKING_FOR_TYPE.ANY && (
				<div style={{ paddingTop: '48px' }}>
					<Label htmlFor='comment'>{t('trade:trade-details.text-area-label')}</Label>
					<TextArea
						id='comment'
						style={{ height: '128px' }}
						{...register('comment')}
						placeholder={t('trade:trade-details.text-area-placeholder')}
					/>
				</div>
			)}

			{getValues('lookingForType') === LOOKING_FOR_TYPE.SPECIFIC && (
				<>
					<div style={{ paddingTop: '24px' }}>
						<Label htmlFor='collections'>
							{t('trade:trade-details.collections-label')}
						</Label>
						<Controller
							name='collections'
							control={control}
							render={({ field: { value, onChange, onBlur } }) => (
								<MultiSelectInput
									error={!!errors.collections}
									placeholder={t('trade:trade-details.collections-placeholder')}
									dropdownTitle={t('trade:trade-details.nft-name')}
									value={value}
									onBlur={onBlur}
									onChange={onChange}
									dismissOnOutsideClick
									options={(verifiedCollections ?? []).map(collection => {
										return {
											label: collection.collectionName,
											value: collection.collectionAddress,
										}
									})}
								/>
							)}
						/>
					</div>

					<ChipsWrapper>
						{getValues('collections').map((collection, index) => (
							<Chip key={collection.value} onClick={() => remove(index)}>
								{collection.label}
							</Chip>
						))}
					</ChipsWrapper>

					<div style={{ paddingTop: '8px' }}>
						<Label htmlFor='tokenAmount'>
							{t('trade:trade-details.tokens-label')}
						</Label>
						<TextInput
							id='tokenAmount'
							{...register('tokenAmount')}
							fieldError={
								errors.tokenAmount && t(`common:errors.${errors.tokenAmount.message}`)
							}
							error={!!errors.tokenAmount}
							placeholder={t('trade:trade-details.tokens-placeholder', {
								token: 'Luna',
							})}
						/>
					</div>
					<div style={{ paddingTop: '8px' }}>
						<Label htmlFor='comment'>
							{t('trade:trade-details.text-area-label')}
						</Label>
						<TextInput
							id='comment'
							{...register('comment')}
							placeholder={t('trade:trade-details.text-area-placeholder')}
						/>
					</div>
				</>
			)}
		</FormWrapper>
	)
}

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const TradeDetails = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { getValues, watch, trigger } = useFormContext<TradeFormStepsProps>()
	const watchLookingForType = watch('lookingForType', undefined)

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('trade:trade-details.question')}</ContentCardTitle>
				<ContentCardSubtitle>
					{!watchLookingForType
						? t('trade:trade-details.instructions')
						: t('trade:trade-details.instruction-2')}
				</ContentCardSubtitle>
				{!watchLookingForType ? (
					<TradeDetailsCollectionSelector />
				) : (
					<TradeDetailsForm />
				)}
			</ContentCard>

			{/* Footer Navigation Section */}
			<NavigationFooter
				goBackStep={goBackStep}
				goNextStep={async () => {
					const isValidTokenAmount = await trigger(['tokenAmount'])
					if (isValidTokenAmount) {
						goNextStep()
					}
				}}
				isNextButtonDisabled={!getValues('lookingForType')}
			/>
		</ContentCardWrapper>
	)
}
