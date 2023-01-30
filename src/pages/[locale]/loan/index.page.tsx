import React, { useState } from 'react'
import { Text } from 'theme-ui'
import { useTranslation } from 'next-i18next'
import NiceModal from '@ebay/nice-modal-react'
import { yupResolver } from '@hookform/resolvers/yup'

import LoanBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import LoanBackgroundLogo from 'assets/images/TradeBackgroundLogo'

import {
	SelectNFTs,
	BodyContainer,
	Container,
	HeaderContainer,
	HeaderSubtitleContainer,
	HeaderTitle,
	HeaderTitleContainer,
	MobileStepsWrapper,
	StepsWrapper,
	LoanBackgroundBlobContainer,
	LoanBackgroundLogoContainer,
	ConfirmListing,
} from 'components/loan'

import { CREATE_LOAN_LISTING_FORM_STEPS } from 'constants/steps'
import { useStep } from 'hooks/react/useStep'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import * as ROUTES from 'constants/routes'
import useHeaderActions from 'hooks/useHeaderActions'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { useWallet } from '@terra-money/use-wallet'

import { LoanFormStepsProps } from 'types'
import {
	LoanDetailsStepSchema,
	SelectNFTStepSchema,
} from 'constants/validation-schemas/loan'
import { LoanDetails } from 'components/loan/LoanDetails'
import { LoansContract } from 'services/blockchain'
import { LoansService } from 'services/api/loansService'
import { TxBroadcastingModal } from 'components/shared'
import { LayoutContainer, Page } from 'components/layout'
import { MobileSteps, Steps } from 'components/ui'
import { ExitCreateLoanListing } from 'components/shared/header-actions/exit-create-loan-listing'

const getStaticProps = makeStaticProps(['common', 'loan'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function Loan() {
	const wallet = useWallet()
	const { t } = useTranslation(['common', 'loan'])
	useHeaderActions(<ExitCreateLoanListing />)
	const [selectNFTsLabel, loanDetailsLabel, confirmListingLabel]: Array<string> =
		t('loan:steps', {
			returnObjects: true,
		})
	const [step, { goToNextStep, goToPrevStep, canGoToNextStep, setStep }] =
		useStep(3)
	const [steps] = useState([
		{
			id: CREATE_LOAN_LISTING_FORM_STEPS.SELECT_NFTS,
			label: selectNFTsLabel,
		},
		{
			id: CREATE_LOAN_LISTING_FORM_STEPS.LOAN_DETAILS,
			label: loanDetailsLabel,
		},
		{
			id: CREATE_LOAN_LISTING_FORM_STEPS.CONFIRM_LISTING,
			label: confirmListingLabel,
		},
	])

	const getStepSchema = (currentStep: number) => {
		const formSchemas = {
			[CREATE_LOAN_LISTING_FORM_STEPS.SELECT_NFTS]: SelectNFTStepSchema,
			[CREATE_LOAN_LISTING_FORM_STEPS.LOAN_DETAILS]: LoanDetailsStepSchema,
		}

		return formSchemas[currentStep] ?? SelectNFTStepSchema
	}

	const formMethods = useForm<LoanFormStepsProps>({
		mode: 'onChange',
		resolver: yupResolver(getStepSchema(step)),
		defaultValues: {
			selectedNFTs: [],
			isSuccessScreen: false,
			tokenName: 'Luna',
		},
	})

	const onSubmit: SubmitHandler<LoanFormStepsProps> = async ({
		coverNFT,
		selectedNFTs,
		loanPeriod,
		interestRate,
		tokenAmount,
		comment,
	}) => {
		const data: {
			action: string
			loanId: string
			borrower: string
		} & TxReceipt = await NiceModal.show(TxBroadcastingModal, {
			transactionAction: LoansContract.createLoanListing(
				selectedNFTs,
				loanPeriod,
				interestRate,
				tokenAmount,
				coverNFT,
				comment
			),
			closeOnFinish: true,
		})

		if (data) {
			const { loanId, txTerraFinderUrl, borrower } = data

			const origin =
				typeof window !== 'undefined' && window.location.origin
					? window.location.origin
					: ''
			formMethods.setValue(
				'loanDetailsUrl',
				`${origin}${ROUTES.LOAN_LISTING_DETAILS}?loanId=${loanId}&borrower=${borrower}`
			)
			formMethods.setValue('terraFinderUrl', txTerraFinderUrl)
			formMethods.setValue('isSuccessScreen', true)

			// NOTE: backend is doing refetch on it's own,over sockets, but trigger for safety
			await LoansService.getLoan(wallet.network.name, loanId, borrower)
		}
	}

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<LoanBackgroundLogoContainer>
					<LoanBackgroundLogo />
				</LoanBackgroundLogoContainer>
				<LoanBackgroundBlobContainer>
					<LoanBackgroundBlob />
				</LoanBackgroundBlobContainer>
				<Container>
					<HeaderContainer>
						<HeaderTitleContainer>
							<HeaderTitle>{t('loan:title')}</HeaderTitle>
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
								{step === CREATE_LOAN_LISTING_FORM_STEPS.SELECT_NFTS && (
									<SelectNFTs goBackStep={goToPrevStep} goNextStep={goToNextStep} />
								)}

								{/* STEP 2 */}
								{step === CREATE_LOAN_LISTING_FORM_STEPS.LOAN_DETAILS && (
									<LoanDetails goBackStep={goToPrevStep} goNextStep={goToNextStep} />
								)}

								{/* STEP 3 */}
								{step === CREATE_LOAN_LISTING_FORM_STEPS.CONFIRM_LISTING && (
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
			</LayoutContainer>
		</Page>
	)
}
