import { DevTool } from '@hookform/devtools'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { Text } from 'theme-ui'

import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'
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
	ConfirmListing,
	Container,
	HeaderContainer,
	HeaderSubtitleContainer,
	HeaderTitle,
	HeaderTitleContainer,
	MobileStepsWrapper,
	RaffleDetails,
	SelectNFTs,
	StepsWrapper,
	TradeBackgroundBlobContainer,
	TradeBackgroundLogoContainer,
} from 'components/raffle'

import { CREATE_RAFFLE_LISTING_FORM_STEPS } from 'constants/steps'
import { useStep } from 'hooks/react/useStep'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import * as ROUTES from 'constants/routes'
import useHeaderActions from 'hooks/useHeaderActions'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
// import { useWallet } from '@terra-money/use-wallet'
import ExitCreateRaffleListing from 'components/shared/header-actions/exit-create-raffle-listing/ExitCreateRaffleListing'
import {
	RaffleDetailsStepSchema,
	RafflesSelectNFTStepSchema,
} from 'constants/validation-schemas/raffle'
import { RaffleFormStepsProps } from 'types/raffle/types'
import { createRaffleListing } from 'services/blockchain'
import moment from 'moment'

const getStaticProps = makeStaticProps(['common', 'raffle'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Raffle() {
	// const wallet = useWallet()
	const { t } = useTranslation(['common', 'raffle'])
	useHeaderActions(<ExitCreateRaffleListing />)
	const stepLabels: Array<string> = t('raffle:steps', { returnObjects: true })
	const [step, { setStep, goToNextStep, goToPrevStep, canGoToNextStep }] =
		useStep(3)
	const [steps] = useState([
		{
			id: CREATE_RAFFLE_LISTING_FORM_STEPS.SELECT_NFTS,
			label: stepLabels[0],
		},
		{
			id: CREATE_RAFFLE_LISTING_FORM_STEPS.RAFFLE_DETAILS,
			label: stepLabels[1],
		},
		{
			id: CREATE_RAFFLE_LISTING_FORM_STEPS.CONFIRM_RAFFLE,
			label: stepLabels[2],
		},
	])

	const getStepSchema = (currentStep: number) => {
		const formSchemas = {
			[CREATE_RAFFLE_LISTING_FORM_STEPS.SELECT_NFTS]: RafflesSelectNFTStepSchema,
			[CREATE_RAFFLE_LISTING_FORM_STEPS.RAFFLE_DETAILS]: RaffleDetailsStepSchema,
		}

		return formSchemas[currentStep] ?? RafflesSelectNFTStepSchema
	}

	const formMethods = useForm<RaffleFormStepsProps>({
		mode: 'onChange',
		resolver: yupResolver(getStepSchema(step)),
		defaultValues: {
			selectedNFTs: [],
			isSuccessScreen: false,
			ticketPriceCurrency: 'Luna',
		},
	})

	const onSubmit: SubmitHandler<RaffleFormStepsProps> = async ({
		selectedNFTs,
		ticketPrice,
		coverNFT,
		ticketSupply,
		endDate,
		endTime,
	}) => {
		const now = moment()

		const end = moment(
			`${moment(endDate).format('YYYY-MM-DD')} ${moment(endTime).format('HH:mm')}`
		)

		const duration = moment.duration(end.diff(now))

		const data: {
			action: string
			raffleId: string
		} & TxReceipt = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: createRaffleListing(selectedNFTs, ticketPrice, {
				rafflePreview: selectedNFTs.findIndex(
					nft =>
						`${coverNFT.collectionAddress}_${coverNFT.tokenId}` ===
						`${nft.collectionAddress}_${nft.tokenId}`
				),
				maxParticipantNumber: +ticketSupply,
				raffleDuration: Math.floor(duration.asSeconds()),
			}),
			closeOnFinish: true,
		})

		if (data) {
			const { raffleId, txTerraFinderUrl } = data

			const origin =
				typeof window !== 'undefined' && window.location.origin
					? window.location.origin
					: ''
			formMethods.setValue(
				'raffleDetailsUrl',
				`${origin}${ROUTES.TRADE_LISTING_DETAILS}?raffleId=${raffleId}`
			)
			formMethods.setValue('terraFinderUrl', txTerraFinderUrl)
			formMethods.setValue('isSuccessScreen', true)

			// NOTE: backend is doing refetch on it's own,over sockets, but trigger for safety
			// await RafflesService.getRaffle(wallet.network.name, raffleId)
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
							<HeaderTitle>{t('raffle:title')}</HeaderTitle>
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
								{step === CREATE_RAFFLE_LISTING_FORM_STEPS.SELECT_NFTS && (
									<SelectNFTs goBackStep={goToPrevStep} goNextStep={goToNextStep} />
								)}
								{/* STEP 2 */}
								{step === CREATE_RAFFLE_LISTING_FORM_STEPS.RAFFLE_DETAILS && (
									<RaffleDetails goNextStep={goToNextStep} goBackStep={goToPrevStep} />
								)}
								{/* STEP 3 */}
								{step === CREATE_RAFFLE_LISTING_FORM_STEPS.CONFIRM_RAFFLE && (
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
