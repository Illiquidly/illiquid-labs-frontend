import { DevTool } from '@hookform/devtools'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { Text } from 'theme-ui'

import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'
import NiceModal from '@ebay/nice-modal-react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	Button,
	LayoutContainer,
	MobileSteps,
	Page,
	Steps,
	TxBroadcastingModal,
} from 'components'

import {
	ChooseVisibility,
	ChooseVisibilityStepSchema,
	ConfirmListing,
	SelectNFTs,
	SelectNFTStepSchema,
	TradeDetails,
	TradeDetailsStepSchema,
	TradeFormStepsProps,
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
} from 'components/trade'

import { CREATE_LISTING_FORM_STEPS } from 'constants/steps'
import { useStep } from 'hooks/react/useStep'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { listTradeOffers } from 'services/blockchain'

import * as ROUTES from 'constants/routes'
import useHeaderActions from 'hooks/useHeaderActions'
import { fromCreateTradeFormToBlockchain } from 'utils/mappers/fromCreateTradeFormToBlockchain'
import { TxReceipt } from 'services/blockchain/blockchain.interface'

const getStaticProps = makeStaticProps(['common', 'trade'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Trade() {
	const { t } = useTranslation(['common', 'trade'])
	useHeaderActions(
		<Button variant='secondary' size='medium' href={ROUTES.TRADE_LISTINGS}>
			{t('common:exit-create-listing')}
		</Button>
	)
	const stepLabels: Array<string> = t('trade:steps', { returnObjects: true })
	const { step, setStep, goNextStep, goBackStep } = useStep({ max: 3 })
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

	const getStepSchema = (currentStep: number) => {
		const formSchemas = {
			[CREATE_LISTING_FORM_STEPS.SELECT_NFTS]: SelectNFTStepSchema,
			[CREATE_LISTING_FORM_STEPS.TRADE_DETAILS]: TradeDetailsStepSchema,
			[CREATE_LISTING_FORM_STEPS.CHOOSE_VISIBILITY]: ChooseVisibilityStepSchema,
		}

		return formSchemas[currentStep] ?? SelectNFTStepSchema
	}

	const formMethods = useForm<TradeFormStepsProps>({
		mode: 'onChange',
		resolver: yupResolver(getStepSchema(step.current)),
		defaultValues: {
			selectedNFTs: [],
			collections: [],
			tokenName: 'LUNA',
			isSuccessScreen: false,
		},
	})

	const onSubmit: SubmitHandler<TradeFormStepsProps> = async values => {
		const data: {
			action: string
			tradeId: string
			trader: string
		} & TxReceipt = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: listTradeOffers(fromCreateTradeFormToBlockchain(values)),
		})

		console.warn(data)

		if (data) {
			const { tradeId, txTerraFinderUrl } = data
			const origin =
				typeof window !== 'undefined' && window.location.origin
					? window.location.origin
					: ''
			formMethods.setValue(
				'tradeDetailsUrl',
				`${origin}${ROUTES.TRADE_LISTING_DETAILS}?tradeId=${tradeId}`
			)
			formMethods.setValue('terraFinderUrl', txTerraFinderUrl)
			formMethods.setValue('isSuccessScreen', true)
		}
	}

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
								{`${step.current + 1}/${steps.length}`}
							</Text>
						</HeaderSubtitleContainer>
					</HeaderContainer>

					{/* FORM STARTS HERE */}
					<FormProvider {...formMethods}>
						<form onSubmit={formMethods.handleSubmit(onSubmit)}>
							<BodyContainer>
								{/* Only on Mobile and Tablet */}
								<MobileStepsWrapper>
									<MobileSteps steps={steps} currentStep={step.current} />
								</MobileStepsWrapper>

								{/* Only on Laptop and Desktop */}
								<StepsWrapper>
									<Steps steps={steps} currentStep={step.current} />
								</StepsWrapper>

								{/* STEP 1 */}
								{step.current === CREATE_LISTING_FORM_STEPS.SELECT_NFTS && (
									<SelectNFTs goBackStep={goBackStep} goNextStep={goNextStep} />
								)}
								{/* STEP 2 */}
								{step.current === CREATE_LISTING_FORM_STEPS.TRADE_DETAILS && (
									<TradeDetails goNextStep={goNextStep} goBackStep={goBackStep} />
								)}
								{/* STEP 3 */}
								{step.current === CREATE_LISTING_FORM_STEPS.CHOOSE_VISIBILITY && (
									<ChooseVisibility goNextStep={goNextStep} goBackStep={goBackStep} />
								)}
								{/* STEP 4 */}
								{step.current === CREATE_LISTING_FORM_STEPS.CONFIRM_LISTING && (
									<ConfirmListing goBackStep={goBackStep} setStep={setStep} />
								)}
							</BodyContainer>
						</form>
					</FormProvider>
				</Container>
				<DevTool control={formMethods.control} />
			</LayoutContainer>
		</Page>
	)
}
