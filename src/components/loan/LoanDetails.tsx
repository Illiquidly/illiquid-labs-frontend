import { NavigationFooter } from 'components/shared/navigation-footer'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { LoanFormStepsProps } from 'types'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
} from './LoanDetails.styled'

type LoanDetailsProps = {
	goNextStep: () => void
	goBackStep: () => void
}

export const LoanDetails = ({ goNextStep, goBackStep }: LoanDetailsProps) => {
	const { t } = useTranslation(['common', 'loan'])
	const {
		// getValues,
		// watch,
		// trigger,
		formState: { isValid },
	} = useFormContext<LoanFormStepsProps>()

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('loan:loan-details.title')}</ContentCardTitle>
				<ContentCardSubtitle>{t('loan:loan-details.subtitle')}</ContentCardSubtitle>
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
