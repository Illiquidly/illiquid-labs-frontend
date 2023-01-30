import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { Box, Flex } from 'theme-ui'
import moment from 'moment'
import { AccordionCard, AccordionCardText } from 'components/ui'

import { NavigationFooter } from 'components/shared/navigation-footer'
import { RaffleFormStepsProps } from 'types/raffle/types'
import {
	TextAreaField,
	TextInputField,
	TokenInputField,
	DatePickerField,
	TimePickerField,
} from 'components/form'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
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
						<Flex sx={{ flexDirection: ['column', 'row'], gap: [0, '16px'] }}>
							<DatePickerField
								label={t('raffle:raffle-details.end-date-label')}
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

							<TimePickerField
								label={t('raffle:raffle-details.end-time-label')}
								help={t('raffle:raffle-details.end-time-help')}
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
						</Flex>

						<Flex sx={{ flexDirection: ['column', 'row'], gap: [0, '16px'] }}>
							<TextInputField
								label={t('raffle:raffle-details.ticket-supply-label')}
								id='ticketSupply'
								{...register('ticketSupply')}
								fieldError={
									errors.ticketSupply &&
									t(`common:errors.${errors?.ticketSupply?.message}`)
								}
								error={!!errors.ticketSupply}
								placeholder={t('raffle:raffle-details.enter-ticket-placeholder')}
							/>

							<TokenInputField
								label={t('raffle:raffle-details.ticket-price-label')}
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
						</Flex>

						<TextAreaField
							style={{ height: '128px' }}
							label={t('raffle:raffle-details.comment-label')}
							id='comment'
							{...register('comment')}
							fieldError={
								errors.comment && t(`common:errors.${errors?.comment?.message}`)
							}
							error={!!errors.comment}
							placeholder={t('raffle:raffle-details.comment-placeholder')}
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
