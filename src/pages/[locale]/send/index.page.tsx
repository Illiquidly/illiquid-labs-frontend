import React, { useState } from 'react'
import { useStep } from 'hooks/react/useStep'
import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Text } from 'theme-ui'
import * as yup from 'yup'

import SendBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import SendBackgroundLogo from 'assets/images/TradeBackgroundLogo'

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

import {
	CREATE_AIRDROP_FROM_STEPS,
	CREATE_SEND_FORM_STEPS,
} from 'constants/steps'
import { makeStaticPaths, makeStaticProps } from 'lib'

import useHeaderActions from 'hooks/useHeaderActions'
import { TxReceipt } from 'services/blockchain/blockchain.interface'

import { Cw721Contract } from 'services/blockchain'
import { SendFormStepsProps } from 'types/send'
import { SenderService } from 'services/api/senderService'
import {
	SendAirdropDetailsSchema,
	SendMultiSendRecipientSchema,
	SendSelectNFTStepSchema,
} from 'constants/validation-schemas/send'
import { SEND_TYPE } from 'constants/sendTypes'
import { SendDetails } from 'components/send/SendDetails'
import { ConfirmSend } from 'components/send/ConfirmSend'
import { AirdropDetails } from 'components/send/AirdropDetails'
import { TxBroadcastingModal } from 'components/shared'
import { LayoutContainer, Page } from 'components/layout'
import { MobileSteps, Steps } from 'components/ui'
import { ExitSend } from 'components/shared/header-actions/exit-send'
import { getNetworkName } from 'utils/blockchain/terraUtils'

const getStaticProps = makeStaticProps(['common', 'send'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Send() {
	useHeaderActions(<ExitSend />)

	const networkName = getNetworkName()

	const { t } = useTranslation(['common', 'send'])

	const router = useRouter()

	const { type: sendType = SEND_TYPE.MULTI_SEND_TYPE } = router.query

	const [
		selectNFTsLabel,
		recipientDetailsLabel,
		confirmSendLabel,
		airdropDetails,
	]: Array<string> = t('send:steps', { returnObjects: true })
	const [step, { setStep, goToNextStep, goToPrevStep, canGoToNextStep }] =
		useStep(3)

	const [steps, setSteps] = useState([])

	const getStepSchemaByType = (
		type = SEND_TYPE.MULTI_SEND_TYPE,
		currentStep: number
	) => {
		const multisendSchemas = {
			[CREATE_SEND_FORM_STEPS.SELECT_NFTS]: SendSelectNFTStepSchema,
			[CREATE_SEND_FORM_STEPS.RECIPIENT_DETAILS]: SendMultiSendRecipientSchema,
		}

		const airdropSchemas = {
			[CREATE_AIRDROP_FROM_STEPS.AIRDROP_DETAILS]: SendSelectNFTStepSchema,
			[CREATE_AIRDROP_FROM_STEPS.RECIPIENT_DETAILS]: SendAirdropDetailsSchema,
		}

		const schemasByTypes = {
			[SEND_TYPE.MULTI_SEND_TYPE]:
				multisendSchemas[currentStep] ?? SendSelectNFTStepSchema,
			[SEND_TYPE.AIRDROP_TYPE]: airdropSchemas[currentStep],
		}

		return schemasByTypes[type] ?? yup.object({})
	}

	const renderComponentsByStep = (
		type = SEND_TYPE.MULTI_SEND_TYPE,
		currentStep: number
	) => {
		const multisendComponents = {
			[CREATE_SEND_FORM_STEPS.SELECT_NFTS]: (
				<SelectNFTs goBackStep={goToPrevStep} goNextStep={goToNextStep} />
			),
			[CREATE_SEND_FORM_STEPS.RECIPIENT_DETAILS]: (
				<SendDetails goBackStep={goToPrevStep} goNextStep={goToNextStep} />
			),
			[CREATE_SEND_FORM_STEPS.CONFIRM_SEND]: (
				<ConfirmSend
					canGoToNextStep={canGoToNextStep}
					goBackStep={goToPrevStep}
					setStep={setStep}
				/>
			),
		}

		const airdropComponents = {
			[CREATE_AIRDROP_FROM_STEPS.AIRDROP_DETAILS]: (
				<AirdropDetails goBackStep={goToPrevStep} goNextStep={goToNextStep} />
			),
		}

		const componentsByTypes = {
			[SEND_TYPE.MULTI_SEND_TYPE]: multisendComponents[currentStep],
			[SEND_TYPE.AIRDROP_TYPE]: airdropComponents[currentStep],
		}

		return componentsByTypes[type] ?? componentsByTypes[SEND_TYPE.MULTI_SEND_TYPE]
	}

	const formMethods = useForm<SendFormStepsProps>({
		mode: 'onChange',
		resolver: yupResolver(getStepSchemaByType(sendType as SEND_TYPE, step)),
		defaultValues: {
			selectedNFTs: [],
			isSuccessScreen: false,
			memo: '',
		},
	})

	const getStepsBySendType = (type = SEND_TYPE.MULTI_SEND_TYPE) => {
		const stepsByType = {
			[SEND_TYPE.MULTI_SEND_TYPE]: [
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
			],
			[SEND_TYPE.AIRDROP_TYPE]: [
				{
					id: CREATE_AIRDROP_FROM_STEPS.AIRDROP_DETAILS,
					label: airdropDetails,
				},
				{
					id: CREATE_AIRDROP_FROM_STEPS.RECIPIENT_DETAILS,
					label: recipientDetailsLabel,
				},
				{
					id: CREATE_AIRDROP_FROM_STEPS.CONFIRM_SEND,
					label: confirmSendLabel,
				},
			],
		}

		return stepsByType[type] ?? stepsByType[SEND_TYPE.MULTI_SEND_TYPE]
	}

	React.useEffect(() => {
		setSteps(getStepsBySendType(sendType as SEND_TYPE))
	}, [sendType])

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
				sendType === SEND_TYPE.MULTI_SEND_TYPE
					? selectedNFTs.map(nft => ({ ...nft, recipient: recipient ?? '' }))
					: selectedNFTs,
				`${sendType}:${memo}`
			),
			closeOnFinish: true,
		})

		if (data) {
			const { txTerraFinderUrl } = data

			formMethods.setValue('terraFinderUrl', txTerraFinderUrl)
			formMethods.setValue('isSuccessScreen', true)

			await SenderService.getTransaction(networkName)
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

								{renderComponentsByStep(sendType as SEND_TYPE, step)}
							</BodyContainer>
						</form>
					</FormProvider>
				</Container>
				<DevTool control={formMethods.control} />
			</LayoutContainer>
		</Page>
	)
}
