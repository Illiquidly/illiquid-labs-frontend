import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Text } from 'theme-ui'

import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'

import { yupResolver } from '@hookform/resolvers/yup'
import { LayoutContainer, MobileSteps, Page, Steps } from 'components'
import { SelectNFTs, TradeDetails } from 'components/ui/forms'
import { TradeFormStepsProps } from 'components/ui/forms/trade-form-steps'
import { ChooseVisibility } from 'components/ui/forms/trade-form-steps/ChooseVisiblity'
import { CREATE_LISTING_FORM_STEPS } from 'constants/steps'
import { useStep } from 'hooks/react/useStep'
import { getStaticPaths, makeStaticProps } from 'lib'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
	BodyContainer,
	Container,
	HeaderContainer,
	HeaderSubtitleContainer,
	HeaderTitle,
	HeaderTitleContainer,
	MobileStepsWrapper,
	StepsWrapper,
	TradeBackgroundBlobContainer,
	TradeBackgroundLogoContainer,
} from './trade.styled'

const schema = yup.object().shape({
	selectedNFTs: yup.array().min(1, 'atleast 1').required('required'),
})

const getStaticProps = makeStaticProps(['common', 'trade'])
export { getStaticPaths, getStaticProps }

export default function Trade() {
	const { t } = useTranslation(['common', 'trade'])

	const formMethods = useForm<TradeFormStepsProps>({
		mode: 'onTouched',
		resolver: yupResolver(schema),
		defaultValues: {
			selectedNFTs: [],
		},
	})

	const stepLabels: Array<string> = t('trade:steps', { returnObjects: true })
	const { step, goNextStep, goBackStep } = useStep({ max: 3 })
	const [steps] = useState([
		{
			id: 0,
			label: stepLabels[0],
		},
		{
			id: 1,
			label: stepLabels[1],
		},
		{
			id: 2,
			label: stepLabels[2],
		},
		{
			id: 3,
			label: stepLabels[3],
		},
	])

	const onSubmit: SubmitHandler<TradeFormStepsProps> = data => {
		console.log('submit data', data)
	}

	// console.log(formMethods.watch()) // watch input value by passing the name of it

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<TradeBackgroundLogoContainer>
					<TradeBackgroundLogo />
				</TradeBackgroundLogoContainer>
				<TradeBackgroundBlobContainer>
					<TradeBackgroundBlob />
				</TradeBackgroundBlobContainer>
				<Container>
					<HeaderContainer>
						<HeaderTitleContainer>
							<HeaderTitle>{t('trade:title')}</HeaderTitle>
						</HeaderTitleContainer>
						{/* Only Mobile And Tablet */}
						<HeaderSubtitleContainer>
							<Text color='gray1000' variant='textMdBold'>
								1/4
							</Text>
						</HeaderSubtitleContainer>
					</HeaderContainer>

					{/* FORM STARTS HERE */}
					<FormProvider {...formMethods}>
						<form onSubmit={formMethods.handleSubmit(onSubmit)}>
							<BodyContainer>
								<MobileStepsWrapper>
									<MobileSteps steps={steps} currentStep={step.current} />
								</MobileStepsWrapper>

								{/* Only on Laptop and Desktop */}
								<StepsWrapper>
									<Steps steps={steps} currentStep={step.current} />
								</StepsWrapper>

								{/* STEP 1 */}
								{step.current === CREATE_LISTING_FORM_STEPS.SELECT_NFTS && (
									<SelectNFTs step={step} goNextStep={goNextStep} />
								)}
								{/* STEP 2 */}
								{step.current === CREATE_LISTING_FORM_STEPS.TRADE_DETAILS && (
									<TradeDetails goNextStep={goNextStep} goBackStep={goBackStep} />
								)}
								{/* STEP 3 */}
								{step.current === CREATE_LISTING_FORM_STEPS.CHOOSE_VISIBILITY && (
									<ChooseVisibility goNextStep={goNextStep} goBackStep={goBackStep} />
								)}
							</BodyContainer>
							<button type='submit'>test submit</button>
						</form>
					</FormProvider>
				</Container>
			</LayoutContainer>
		</Page>
	)
}
