import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useTranslation } from 'next-i18next'
import { Text } from 'theme-ui'
import NiceModal from '@ebay/nice-modal-react'
import { yupResolver } from '@hookform/resolvers/yup'

import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'

import {
	ChooseVisibility,
	ConfirmListing,
	SelectNFTs,
	TradeDetails,
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

import { CREATE_TRADE_LISTING_FORM_STEPS } from 'constants/steps'
import { useStep } from 'hooks/react/useStep'
import { makeStaticPaths, makeStaticProps } from 'lib'

import * as ROUTES from 'constants/routes'
import useHeaderActions from 'hooks/useHeaderActions'
import { fromCreateTradeFormToBlockchain } from 'utils/mappers/fromCreateTradeFormToBlockchain'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { TradesService } from 'services/api/tradesService'
import ExitCreateTradeListing from 'components/shared/header-actions/exit-create-trade-listing/ExitCreateTradeListing'
import {
	ChooseVisibilityStepSchema,
	SelectNFTStepSchema,
	TradeDetailsStepSchema,
} from 'constants/validation-schemas/trade'
import { TradeFormStepsProps } from 'types'
import { P2PTradingContract } from 'services/blockchain'
import { TxBroadcastingModal } from 'components/shared'
import { LayoutContainer, Page } from 'components/layout'
import { MobileSteps, Steps } from 'components/ui'
import { getNetworkName } from 'utils/blockchain/terraUtils'

const getStaticProps = makeStaticProps(['common', 'trade'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Trade() {
	useHeaderActions(<ExitCreateTradeListing />)

	const { t } = useTranslation(['common', 'trade'])
	const [
		selectNFTsLabel,
		tradeDetailsLabel,
		chooseVisibilityLabel,
		confirmListingLabel,
	]: Array<string> = t('trade:steps', {
		returnObjects: true,
	})
	const [step, { setStep, goToNextStep, goToPrevStep, canGoToNextStep }] =
		useStep(4)
	const [steps] = useState([
		{
			id: CREATE_TRADE_LISTING_FORM_STEPS.SELECT_NFTS,
			label: selectNFTsLabel,
		},
		{
			id: CREATE_TRADE_LISTING_FORM_STEPS.TRADE_DETAILS,
			label: tradeDetailsLabel,
		},
		{
			id: CREATE_TRADE_LISTING_FORM_STEPS.CHOOSE_VISIBILITY,
			label: chooseVisibilityLabel,
		},
		{
			id: CREATE_TRADE_LISTING_FORM_STEPS.CONFIRM_LISTING,
			label: confirmListingLabel,
		},
	])

	const getStepSchema = (currentStep: number) => {
		const formSchemas = {
			[CREATE_TRADE_LISTING_FORM_STEPS.SELECT_NFTS]: SelectNFTStepSchema,
			[CREATE_TRADE_LISTING_FORM_STEPS.TRADE_DETAILS]: TradeDetailsStepSchema,
			[CREATE_TRADE_LISTING_FORM_STEPS.CHOOSE_VISIBILITY]:
				ChooseVisibilityStepSchema,
		}

		return formSchemas[currentStep] ?? SelectNFTStepSchema
	}

	const formMethods = useForm<TradeFormStepsProps>({
		mode: 'onChange',
		resolver: yupResolver(getStepSchema(step)),
		defaultValues: {
			selectedNFTs: [],
			collections: [],
			tokenName: 'Luna',
			isSuccessScreen: false,
		},
	})

	const onSubmit: SubmitHandler<TradeFormStepsProps> = async values => {
		const data: {
			action: string
			tradeId: string
			trader: string
		} & TxReceipt = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: P2PTradingContract.listTradeOffers(
				fromCreateTradeFormToBlockchain(values)
			),
			closeOnFinish: true,
		})

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

			// NOTE: backend is doing refetch on it's own,over sockets, but trigger for safety
			await TradesService.getTrade(getNetworkName(), tradeId)
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
								{`${step}/${steps.length}`}
							</Text>
						</HeaderSubtitleContainer>
					</HeaderContainer>

					{/* FORM STARTS HERE */}
					<FormProvider {...formMethods}>
						<form onSubmit={formMethods.handleSubmit(onSubmit)}>
							<BodyContainer>
								{/* Only on Mobile and Tablet */}
								<MobileStepsWrapper>
									<MobileSteps steps={steps} currentStep={step} />
								</MobileStepsWrapper>

								{/* Only on Laptop and Desktop */}
								<StepsWrapper>
									<Steps steps={steps} currentStep={step} />
								</StepsWrapper>

								{/* STEP 1 */}
								{step === CREATE_TRADE_LISTING_FORM_STEPS.SELECT_NFTS && (
									<SelectNFTs goBackStep={goToPrevStep} goNextStep={goToNextStep} />
								)}
								{/* STEP 2 */}
								{step === CREATE_TRADE_LISTING_FORM_STEPS.TRADE_DETAILS && (
									<TradeDetails goNextStep={goToNextStep} goBackStep={goToPrevStep} />
								)}
								{/* STEP 3 */}
								{step === CREATE_TRADE_LISTING_FORM_STEPS.CHOOSE_VISIBILITY && (
									<ChooseVisibility
										goNextStep={goToNextStep}
										goBackStep={goToPrevStep}
									/>
								)}
								{/* STEP 4 */}
								{step === CREATE_TRADE_LISTING_FORM_STEPS.CONFIRM_LISTING && (
									<ConfirmListing
										canGoToNextStep={canGoToNextStep}
										goBackStep={goToPrevStep}
										setStep={setStep}
									/>
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
