import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Text } from 'theme-ui'

import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'

import { yupResolver } from '@hookform/resolvers/yup'
import { LayoutContainer, MobileSteps, Page, Steps } from 'components'
import { TradeFormStep1 } from 'components/ui/forms'
import { TradeFormStepsProps } from 'components/ui/forms/tradeFormSteps'
import { TradeFormStep2 } from 'components/ui/forms/tradeFormSteps/TradeFormStep2'
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
			selectedNFts: [],
		},
	})

	const stepLabels: Array<string> = t('trade:steps', { returnObjects: true })
	// const [currentStep, setCurrentStep] = useState<number>(0)
	const { step, goNextStep } = useStep({ max: 3 })
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

	console.log(formMethods.watch()) // watch input value by passing the name of it

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
								{step.current === 0 && (
									<TradeFormStep1 step={step} goNextStep={goNextStep} />
								)}
								{/* STEP 2 */}
								{step.current === 1 && (
									<TradeFormStep2 step={step} goNextStep={goNextStep} />
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
