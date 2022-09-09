import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import TradeDetailsSpecifiedCollection from 'assets/images/TradeDetailsSpecifiedCollection'
import {
	Button,
	RadioInputGroupProvider,
	TextArea,
	TextInput,
} from 'components'
import { Chip } from 'components/ui/chip'
import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Flex } from 'theme-ui'
import { COLLECTION_TYPE, TradeFormStepsProps } from './formProps'
import {
	CardItem,
	CardItemInput,
	CardItemText,
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
			<CardItem>
				<CardItemInput
					type='radio'
					{...register('collectionType')}
					value={COLLECTION_TYPE.SPECIFIC}
				/>
				<TradeDetailsSpecifiedCollection />
				<CardItemText>{t('trade:trade-details.option-1')}</CardItemText>
			</CardItem>

			<CardItem>
				<CardItemInput
					type='radio'
					{...register('collectionType')}
					value={COLLECTION_TYPE.ANY}
				/>
				<TradeDetailsOpenToOffers />
				<CardItemText>{t('trade:trade-details.option-2')}</CardItemText>
			</CardItem>
		</Flex>
	)
}

const TradeDetailsForm = () => {
	const { t } = useTranslation(['trade'])
	const { register, setValue, getValues, control } =
		useFormContext<TradeFormStepsProps>()
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
				value={getValues('collectionType')}
				name={register('collectionType').name}
				onChange={e =>
					setValue('collectionType', e.target.value as COLLECTION_TYPE)
				}
			>
				<RadioWrapper>
					<RadioCard value={COLLECTION_TYPE.SPECIFIC}>
						<RadioCardText>{t('trade:trade-details.option-1')}</RadioCardText>
					</RadioCard>

					<RadioCard value={COLLECTION_TYPE.ANY}>
						<RadioCardText>{t('trade:trade-details.option-2')}</RadioCardText>
					</RadioCard>
				</RadioWrapper>
			</RadioInputGroupProvider>

			{getValues('collectionType') === COLLECTION_TYPE.ANY && (
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

			{getValues('collectionType') === COLLECTION_TYPE.SPECIFIC && (
				<>
					<div style={{ paddingTop: '24px' }}>
						<Label htmlFor='collections'>
							{t('trade:trade-details.collections-label')}
						</Label>
						<TextInput
							onKeyDown={e => onEnter(e)}
							id='collection'
							{...register('collection')}
							placeholder={t('trade:trade-details.collections-placeholder')}
						/>
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
	const { getValues, watch } = useFormContext<TradeFormStepsProps>()
	const watchCollectionType = watch('collectionType', undefined)

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('trade:trade-details.question')}</ContentCardTitle>
				<ContentCardSubtitle>
					{!watchCollectionType
						? t('trade:trade-details.instructions')
						: t('trade:trade-details.instruction-2')}
				</ContentCardSubtitle>
				{!watchCollectionType ? (
					<TradeDetailsCollectionSelector />
				) : (
					<TradeDetailsForm />
				)}
			</ContentCard>

			{/* Footer Navigation Section */}
			<Flex sx={{ justifyContent: 'space-between', paddingTop: '12px' }}>
				<Button onClick={() => goBackStep()} variant='secondary'>
					{t('common:buttons.previous-step')}
				</Button>
				<Button
					variant='gradient'
					onClick={() => goNextStep()}
					disabled={!getValues('collectionType')}
				>
					{t('common:buttons.save-and-continue')}
				</Button>
			</Flex>
		</ContentCardWrapper>
	)
}
