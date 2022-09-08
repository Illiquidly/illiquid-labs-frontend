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
				<CardItemText>{t('trade:tradeDetails.option-1')}</CardItemText>
			</CardItem>

			<CardItem>
				<CardItemInput
					type='radio'
					{...register('collectionType')}
					value={COLLECTION_TYPE.ANY}
				/>
				<TradeDetailsOpenToOffers />
				<CardItemText>{t('trade:tradeDetails.option-2')}</CardItemText>
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
						<RadioCardText>{t('trade:tradeDetails.option-1')}</RadioCardText>
					</RadioCard>

					<RadioCard value={COLLECTION_TYPE.ANY}>
						<RadioCardText>{t('trade:tradeDetails.option-2')}</RadioCardText>
					</RadioCard>
				</RadioWrapper>

				{getValues('collectionType') === COLLECTION_TYPE.ANY && (
					<div style={{ paddingTop: '48px' }}>
						<Label htmlFor='comment'>{t('trade:tradeDetails.text-area-label')}</Label>
						<TextArea
							id='comment'
							style={{ height: '128px' }}
							{...register('comment')}
							placeholder={t('trade:tradeDetails.text-area-placeholder')}
						/>
					</div>
				)}

				{getValues('collectionType') === COLLECTION_TYPE.SPECIFIC && (
					<>
						<div style={{ paddingTop: '24px' }}>
							<Label htmlFor='collections'>
								{t('trade:tradeDetails.collections-label')}
							</Label>
							<TextInput
								onKeyDown={e => onEnter(e)}
								id='collection'
								{...register('collection')}
								placeholder={t('trade:tradeDetails.collections-placeholder')}
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
								{t('trade:tradeDetails.tokens-label')}
							</Label>
							<TextInput
								id='tokenAmount'
								{...register('tokenAmount')}
								placeholder={t('trade:tradeDetails.tokens-placeholder', {
									token: 'Luna',
								})}
							/>
						</div>
						<div style={{ paddingTop: '24px' }}>
							<Label htmlFor='comment'>
								{t('trade:tradeDetails.text-area-label')}
							</Label>
							<TextInput
								id='comment'
								{...register('comment')}
								placeholder={t('trade:tradeDetails.text-area-placeholder')}
							/>
						</div>
					</>
				)}
			</RadioInputGroupProvider>
		</FormWrapper>
	)
}

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const TradeDetails = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { getValues } = useFormContext<TradeFormStepsProps>()

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('trade:tradeDetails.question')}</ContentCardTitle>
				<ContentCardSubtitle>
					{!getValues('collectionType')
						? t('trade:tradeDetails.instructions')
						: t('trade:tradeDetails.instruction-2')}
				</ContentCardSubtitle>
				{!getValues('collectionType') ? (
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
