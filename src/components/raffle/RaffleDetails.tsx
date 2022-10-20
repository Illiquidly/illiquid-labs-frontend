import {
	AccordionCard,
	AccordionCardText,
	TextInputField,
	TokenInputField,
} from 'components'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { NavigationFooter } from 'components/shared/navigation-footer'
import { RaffleFormStepsProps } from 'types/raffle/types'
import { Box, Flex } from 'theme-ui'
import { DatePickerField } from 'components/form/fields/date-picker-field'
import { TimePickerField } from 'components/form/fields/time-picker-field'
import moment from 'moment'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
	Label,
} from './RaffleDetails.styled'

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const RaffleDetails = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'raffle'])

	const terms: Array<string> = t('raffle:raffle-details.terms', {
		returnObjects: true,
	})

	const {
		getValues,
		register,
		setValue,

		formState: { isValid, errors },
	} = useFormContext<RaffleFormStepsProps>()

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('raffle:raffle-details.question')}</ContentCardTitle>
				<ContentCardSubtitle>
					{t('raffle:raffle-details.instructions')}
				</ContentCardSubtitle>
				<FormWrapper>
					<Box sx={{ pt: '8px' }}>
						<Label htmlFor='endDate'>
							{t('raffle:raffle-details.end-date-label')}
						</Label>
						<DatePickerField
							id='endDate'
							value={getValues('endDate')}
							onChange={([date]) =>
								setValue('endDate', date, {
									shouldValidate: true,
								})
							}
							minDate={moment().add('1', 'day').startOf('day').toDate()}
							fieldError={
								errors.endDate && t(`common:errors.${errors?.endDate?.message}`)
							}
							error={!!errors.endDate}
							placeholder={t('raffle:raffle-details.enter-date')}
						/>

						<Label htmlFor='endTime'>
							{t('raffle:raffle-details.end-time-label')}
						</Label>
						<TimePickerField
							id='endTime'
							value={getValues('endTime')}
							onChange={([date]) =>
								setValue('endTime', date, {
									shouldValidate: true,
								})
							}
							fieldError={
								errors.endTime && t(`common:errors.${errors?.endTime?.message}`)
							}
							error={!!errors.endTime}
							placeholder={t('raffle:raffle-details.enter-time')}
						/>

						<Label htmlFor='ticketSupply'>
							{t('raffle:raffle-details.ticket-supply-label')}
						</Label>
						<TextInputField
							id='ticketSupply'
							{...register('ticketSupply')}
							fieldError={
								errors.ticketSupply &&
								t(`common:errors.${errors?.ticketSupply?.message}`)
							}
							error={!!errors.ticketSupply}
							placeholder={t('raffle:raffle-details.enter-ticket-placeholder')}
						/>

						<Label htmlFor='ticketPrice'>
							{t('raffle:raffle-details.ticket-price-label')}
						</Label>
						<TokenInputField
							id='ticketPrice'
							{...register('ticketPrice')}
							fieldError={
								errors.ticketPrice && t(`common:errors.${errors.ticketPrice.message}`)
							}
							error={!!errors.ticketPrice}
							placeholder={t('raffle:raffle-details.tokens-placeholder', {
								token: getValues('ticketPriceCurrency'),
							})}
							tokenName={getValues('ticketPriceCurrency')}
						/>
					</Box>

					<AccordionCard title={t('raffle:raffle-details.terms-title')}>
						<Flex sx={{ flexDirection: 'column', pr: ['44px', '63px'] }}>
							{terms.map((term, index) => (
								<AccordionCardText key={term}>{`${
									index + 1
								}. ${term}`}</AccordionCardText>
							))}
						</Flex>
					</AccordionCard>
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
