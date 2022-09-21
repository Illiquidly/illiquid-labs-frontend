import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import TradeDetailsSpecifiedCollection from 'assets/images/TradeDetailsSpecifiedCollection'
import {
	RadioCard as RadioCardSelector,
	RadioInputGroupProvider,
	TextArea,
	TextInput,
	MultiSelectInput
} from 'components'
import { Chip } from 'components/ui/chip'
import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
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

	const { register } = useFormContext<TradeFormStepsProps>()
	return (
		<Flex sx={{ gap: '8px' }}>
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
		</Flex>
	)
}

const TradeDetailsForm = () => {
	const { t } = useTranslation(['trade'])
	const {
		register,
		setValue,
		getValues,
		control,
		formState: { errors },
	} = useFormContext<TradeFormStepsProps>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'collections',
	})

	const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			e.preventDefault()
			append({
				value: e.target.value,
			})
			e.target.value = ''
		}
	}

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
						<MultiSelectInput
							dropdownTitle='hehe'
							options={[
								{
									label: 'Abc',
									value: 'okada',
								},
								{
									label: 'Abc saokd',
									value: 'a',
								},
							]}
						/>
						{/* <TextInput
							onKeyDown={e => onEnter(e)}
							id='collection'
							{...register('collection')}
							placeholder={t('trade:trade-details.collections-placeholder')}
						/> */}
					</div>

					<ChipsWrapper>
						{fields.map((field, index) => (
							<Chip key={field.id} onClick={() => remove(index)}>
								{field.value}
							</Chip>
						))}
					</ChipsWrapper>

					<div style={{ paddingTop: '24px' }}>
						<Label htmlFor='tokenAmount'>
							{t('trade:trade-details.tokens-label')}
						</Label>
						<TextInput
							id='tokenAmount'
							{...register('tokenAmount')}
							fieldError={errors.tokenAmount}
							error={!!errors.tokenAmount}
							placeholder={t('trade:trade-details.tokens-placeholder', {
								token: 'Luna',
							})}
						/>
					</div>
					<div style={{ paddingTop: '24px' }}>
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
	const {
		getValues,
		watch,
		trigger,
		formState: { errors },
	} = useFormContext<TradeFormStepsProps>()
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
					await trigger(['tokenAmount']).then(() => isEmpty(errors) && goNextStep())
				}}
				isNextButtonDisabled={!getValues('lookingForType')}
			/>
		</ContentCardWrapper>
	)
}
