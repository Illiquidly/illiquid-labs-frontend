import { TextAreaField, TextInputField } from 'components'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { NavigationFooter } from 'components/shared/navigation-footer'
import { SendFormStepsProps } from 'types/send/types'
import { Box } from 'theme-ui'

import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
} from './SendDetails.styled'

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const SendDetails = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'send'])

	const {
		register,
		formState: { isValid, errors },
	} = useFormContext<SendFormStepsProps>()

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('send:send-details.question')}</ContentCardTitle>
				<ContentCardSubtitle>
					{t('send:send-details.instructions')}
				</ContentCardSubtitle>
				<FormWrapper>
					<Box sx={{ pt: '8px' }}>
						<TextInputField
							label={t('send:send-details.recipient-label')}
							id='recipient'
							{...register('recipient')}
							fieldError={
								errors.recipient && t(`common:errors.${errors?.recipient?.message}`)
							}
							error={!!errors.recipient}
							placeholder={t('send:send-details.recipient-placeholder')}
						/>
					</Box>

					<Box sx={{ pt: '8px' }}>
						<TextAreaField
							style={{ height: '128px' }}
							label={t('send:send-details.memo-label')}
							id='memo'
							{...register('memo')}
							fieldError={errors.memo && t(`common:errors.${errors?.memo?.message}`)}
							error={!!errors.memo}
							placeholder={t('send:send-details.memo-placeholder')}
						/>
					</Box>
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
