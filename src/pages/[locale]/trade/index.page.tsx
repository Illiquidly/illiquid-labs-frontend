import { DevTool } from '@hookform/devtools'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { Text } from 'theme-ui'

import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, LayoutContainer, MobileSteps, Page, Steps } from 'components'
import { SelectNFTs, TradeDetails } from 'components/ui/forms'
import {
	ChooseVisibility,
	ChooseVisibilityStepSchema,
	ConfirmListing,
	SelectNFTStepSchema,
	TradeDetailsStepSchema,
	TradeFormStepsProps,
} from 'components/ui/forms/trade-form-steps'
import { CREATE_LISTING_FORM_STEPS } from 'constants/steps'
import { useStep } from 'hooks/react/useStep'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { listTradeOffers } from 'services/blockchain'

import * as ROUTES from 'constants/routes'
import { useBroadcastingTx } from 'hooks'
import useHeaderActions from 'hooks/useHeaderActions'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { asyncAction } from 'utils/js/asyncAction'
import { fromCreateTradeFormToBlockchain } from 'utils/mappers/fromCreateTradeFormToBlockchain'
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
	const [txReceipt, setTxReceipt] = React.useState<TxReceipt | null>(null)
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
		switch (currentStep) {
			case 0:
				return SelectNFTStepSchema
			case 1:
				return TradeDetailsStepSchema
			case 2:
				return ChooseVisibilityStepSchema
			default:
				return SelectNFTStepSchema
		}
	}

	const formMethods = useForm<TradeFormStepsProps>({
		mode: 'all',
		resolver: yupResolver(getStepSchema(step.current)),
		defaultValues: {
			selectedNFTs: [],
			collections: [],
			tokenName: 'LUNA',
		},
	})

	const onSuccessBroadcast = async ({ tradeId }: { tradeId: string }) => {
		// TODO: use this tradeId for URL
		console.log(tradeId)
	}

	const { setLoading, loading } = useBroadcastingTx(
		txReceipt?.txId,
		onSuccessBroadcast
	)

	const onSubmit: SubmitHandler<TradeFormStepsProps> = async values => {
		setLoading({ ...loading, send: true })

		const [error, txResponse] = await asyncAction(
			listTradeOffers(fromCreateTradeFormToBlockchain(values))
		)

		if (txResponse) {
			setTxReceipt(txResponse)
		}
		if (error) {
			// TODO: show errors, in toast or something
			console.error(error)
		}
		setLoading({ ...loading, send: false })
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
