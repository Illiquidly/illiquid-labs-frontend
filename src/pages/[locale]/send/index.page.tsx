import { DevTool } from '@hookform/devtools'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { Text } from 'theme-ui'

import SendBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import SendBackgroundLogo from 'assets/images/TradeBackgroundLogo'
import NiceModal from '@ebay/nice-modal-react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	LayoutContainer,
	MobileSteps,
	Page,
	Steps,
	TxBroadcastingModal,
} from 'components'

import {
	BodyContainer,
	Container,
	HeaderContainer,
	HeaderSubtitleContainer,
	HeaderTitle,
	HeaderTitleContainer,
	MobileStepsWrapper,
	StepsWrapper,
	SendBackgroundBlobContainer,
	SendBackgroundLogoContainer,
	SelectNFTs,
} from 'components/send'

import { CREATE_SEND_FORM_STEPS } from 'constants/steps'
import { useStep } from 'hooks/react/useStep'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import useHeaderActions from 'hooks/useHeaderActions'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { useWallet } from '@terra-money/use-wallet'

import { Cw721Contract } from 'services/blockchain'
import { ExitSend } from 'components/shared/header-actions'
import { SendFormStepsProps } from 'types/send'
import { SenderService } from 'services/api/senderService'
import {
	SendMultiSendRecipientSchema,
	SendSelectNFTStepSchema,
} from 'constants/validation-schemas/send'
import { useRouter } from 'next/router'
import { SEND_TYPE } from 'constants/send-types'
import { SendDetails } from 'components/send/SendDetails'
import { ConfirmSend } from 'components/send/ConfirmSend'

const getStaticProps = makeStaticProps(['common', 'send'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Send() {
	const wallet = useWallet()
	const { t } = useTranslation(['common', 'send'])
	useHeaderActions(<ExitSend />)

	const router = useRouter()

	const { type: sendType = SEND_TYPE.MULTI_SEND_TYPE } = router.query

	const [
		selectNFTsLabel,
		recipientDetailsLabel,
		confirmSendLabel,
	]: Array<string> = t('send:steps', { returnObjects: true })
	const [step, { setStep, goToNextStep, goToPrevStep, canGoToNextStep }] =
		useStep(3)

	const [steps] = useState([
		{
			id: CREATE_SEND_FORM_STEPS.SELECT_NFTS,
			label: selectNFTsLabel,
		},
		{
			id: CREATE_SEND_FORM_STEPS.RECIPIENT_DETAILS,
			label: recipientDetailsLabel,
		},
		{
			id: CREATE_SEND_FORM_STEPS.CONFIRM_SEND,
			label: confirmSendLabel,
		},
	])

	const getStepSchema = (currentStep: number) => {
		const formSchemas = {
			[CREATE_SEND_FORM_STEPS.SELECT_NFTS]: SendSelectNFTStepSchema,
			[CREATE_SEND_FORM_STEPS.RECIPIENT_DETAILS]: SendMultiSendRecipientSchema,
		}

		return formSchemas[currentStep] ?? SendSelectNFTStepSchema
	}

	const formMethods = useForm<SendFormStepsProps>({
		mode: 'onChange',
		resolver: yupResolver(getStepSchema(step)),
		defaultValues: {
			selectedNFTs: [],
			isSuccessScreen: false,
			memo: '',
		},
	})

	const onSubmit: SubmitHandler<SendFormStepsProps> = async ({
		selectedNFTs,
		recipient,
		memo,
	}) => {
		const data: {
			action: string
			selectedNFTs: string
			memo
		} & TxReceipt = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: Cw721Contract.transferTokens(
				recipient ? selectedNFTs.map(nft => ({ ...nft, recipient })) : selectedNFTs,
				`${sendType}:${memo}`
			),
			closeOnFinish: true,
		})

		if (data) {
			const { txTerraFinderUrl } = data

			formMethods.setValue('terraFinderUrl', txTerraFinderUrl)
			formMethods.setValue('isSuccessScreen', true)

			await SenderService.getTransaction(wallet.network.name)
		}
	}

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<SendBackgroundLogoContainer>
					<SendBackgroundLogo />
				</SendBackgroundLogoContainer>
				<SendBackgroundBlobContainer>
					<SendBackgroundBlob />
				</SendBackgroundBlobContainer>
				<Container>
					<HeaderContainer>
						<HeaderTitleContainer>
							<HeaderTitle>{t(`send:${sendType}-title`)}</HeaderTitle>
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
								{step === CREATE_SEND_FORM_STEPS.SELECT_NFTS && (
									<SelectNFTs goBackStep={goToPrevStep} goNextStep={goToNextStep} />
								)}

								{/* STEP 2 */}
								{step === CREATE_SEND_FORM_STEPS.RECIPIENT_DETAILS && (
									<SendDetails goBackStep={goToPrevStep} goNextStep={goToNextStep} />
								)}

								{/* STEP 3 */}
								{step === CREATE_SEND_FORM_STEPS.CONFIRM_SEND && (
									<ConfirmSend
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
