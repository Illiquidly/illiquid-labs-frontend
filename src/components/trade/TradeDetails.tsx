import { Flex } from 'theme-ui'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import TradeDetailsSpecifiedCollection from 'assets/images/TradeDetailsSpecifiedCollection'
import {
	MultiSelectInput,
	RadioCard as RadioCardSelector,
	RadioInputGroupProvider,
} from 'components/ui'
import If from 'components/core/if-statement'
import { Chip } from 'components/ui/chip'
import { TextInputField } from 'components/form/fields/text-input-field'
import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
import useIsMobile from 'hooks/react/useIsMobile'
import { SupportedCollectionsService } from 'services/api'
import { VERIFIED_COLLECTIONS } from 'constants/useQueryKeys'
import { TradeFormStepsProps } from 'types'
import { NavigationFooter } from 'components/shared/navigation-footer'
import { FieldLabel } from 'components/form/components'
import { LOOKING_FOR_TYPE } from 'constants/trade'
import { TextAreaField, TokenInputField } from 'components/form'
import { getNetworkName } from 'utils/blockchain/terraUtils'
import {
	ChipsWrapper,
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
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
		watch,
		formState: { errors },
	} = useFormContext<TradeFormStepsProps>()

	const networkName = getNetworkName()

	const { remove } = useFieldArray({
		control,
		name: 'collections',
	})

	const { data: verifiedCollections } = useQuery(
		[VERIFIED_COLLECTIONS],
		async () => SupportedCollectionsService.getSupportedCollections(networkName),
		{
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
					<TextAreaField
						label={t('trade:trade-details.text-area-label')}
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
						<FieldLabel htmlFor='collections'>
							{t('trade:trade-details.collections-label')}
						</FieldLabel>
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
						{watch('collections').map((collection, index) => (
							<Chip key={collection.value} onClick={() => remove(index)}>
								{collection.label}
							</Chip>
						))}
					</ChipsWrapper>

					<div style={{ paddingTop: '8px' }}>
						<TokenInputField
							label={t('trade:trade-details.tokens-label')}
							id='tokenAmount'
							{...register('tokenAmount')}
							fieldError={
								errors.tokenAmount && t(`common:errors.${errors.tokenAmount.message}`)
							}
							error={!!errors.tokenAmount}
							placeholder={t('trade:trade-details.tokens-placeholder', {
								token: getValues('tokenName'),
							})}
							tokenName={getValues('tokenName')}
						/>
					</div>
					<TextInputField
						label={t('trade:trade-details.text-area-label')}
						id='comment'
						{...register('comment')}
						placeholder={t('trade:trade-details.text-area-placeholder')}
					/>
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
		formState: { isValid },
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
					const isValidTokenAmount = await trigger(['tokenAmount'])
					if (isValidTokenAmount) {
						goNextStep()
					}
				}}
				isNextButtonDisabled={!getValues('lookingForType') || !isValid}
			/>
		</ContentCardWrapper>
	)
}
