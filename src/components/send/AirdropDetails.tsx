import React from 'react'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { Box, Flex } from 'theme-ui'
import pMap from 'p-map'
import {
	FileDropZone,
	RadioCard as RadioCardSelector,
	RadioInputGroupProvider,
	UploadProgressBar,
} from 'components/ui'
import If from 'components/core/if-statement'

import RadioCard, { RadioCardText } from 'components/ui/radio/RadioCardInput'
import useIsMobile from 'hooks/react/useIsMobile'

import { NavigationFooter } from 'components/shared/navigation-footer'
import { AIRDROP_TYPE } from 'constants/sendTypes'
import { SendFormStepsProps } from 'types/send'
import { UploadIcon } from 'assets/icons/mixed'
import { readCSVFile } from 'utils/js/readCSVFile'
import { NFT } from 'services/api/walletNFTsService'
import { isValidTerraAddress } from 'utils/blockchain/isValidAddress'
import * as ROUTES from 'constants/routes'
import AirdropFolderImg from 'assets/images/AirdropFolderImg'
import AirdropRecipientsImage from 'assets/images/AirdropRecipientsImage'
import { LinkButton } from 'components/link'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
	FormWrapper,
	RadioWrapper,
	UploadCircle,
	UploadContentArea,
	UploadLabel,
	UploadMaxSize,
} from './AirdropDetails.styled'
import { SelectedNFTs, SelectNFTsEmpty } from './SelectNFTs'

const AirdropDetailsSelector = () => {
	const { t } = useTranslation(['common', 'send'])
	const { register, setValue, getValues } = useFormContext<SendFormStepsProps>()
	const isMobile = useIsMobile()

	return (
		<Flex sx={{ gap: '8px' }}>
			<If condition={isMobile}>
				<If.Then>
					<RadioInputGroupProvider
						value={getValues('airdropType')}
						name={register('airdropType').name}
						onChange={e => setValue('airdropType', e.target.value as AIRDROP_TYPE)}
					>
						<RadioWrapper>
							<RadioCard value={AIRDROP_TYPE.CSV}>
								<RadioCardText>{t('send:airdrop-details.option-1')}</RadioCardText>
							</RadioCard>

							<RadioCard value={AIRDROP_TYPE.PARTICIPANTS}>
								<RadioCardText>{t('send:airdrop-details.option-2')}</RadioCardText>
							</RadioCard>
						</RadioWrapper>
					</RadioInputGroupProvider>
				</If.Then>

				<If.Else>
					<RadioCardSelector
						value={AIRDROP_TYPE.CSV}
						title={t('send:airdrop-details.option-1')}
						Image={<AirdropFolderImg />}
						{...register('airdropType')}
					/>
					<RadioCardSelector
						value={AIRDROP_TYPE.PARTICIPANTS}
						title={t('send:airdrop-details.option-2')}
						Image={<AirdropRecipientsImage />}
						{...register('airdropType')}
					/>
				</If.Else>
			</If>
		</Flex>
	)
}

const AirdropDetailsForm = () => {
	const { t } = useTranslation(['common', 'send'])

	const {
		watch,
		setValue,
		setError,
		formState: { errors },
	} = useFormContext<SendFormStepsProps>()
	const airdropType = watch('airdropType', undefined)
	const selectedNFTs = watch('selectedNFTs')
	const onDropAccepted = React.useCallback(
		(files: (File & { parsedNFTs: (NFT & { recipient: string })[] })[]) => {
			const [file] = files

			setValue('fileName', file.name)
			setValue('selectedNFTs', file.parsedNFTs, { shouldValidate: true })
		},
		[]
	)

	const onDropRejected = React.useCallback(errs => {
		const [{ message }] = (errs ?? [])
			.flatMap(err => err.errors)
			.flatMap(err => err.errors)

		setError('selectedNFTs', { message })
	}, [])

	const getFilesFromEvent = async (input: any[] | any) => {
		const fileList = input?.target?.files
			? input.target.files
			: input.map(fi => fi.getFile())

		return pMap(
			fileList,
			async (file: File & { parsedNFTs: (NFT & { recipient?: string })[] }) => {
				const result = await readCSVFile(file)

				const { data } = result as unknown as {
					data: (NFT & { recipient?: string })[]
				}

				// eslint-disable-next-line no-param-reassign
				file.parsedNFTs = data ?? []

				return file
			},
			{ concurrency: 1 }
		)
	}

	const validator = (
		csvFile: File & { parsedNFTs: (NFT & { recipient?: string })[] }
	) => {
		if (!csvFile) {
			return null
		}

		if (!(csvFile.parsedNFTs ?? []).length) {
			return [
				{
					file: csvFile,
					errors: [{ message: t('common:csv-is-empty'), code: 400 }],
				},
			]
		}

		if (
			!(csvFile.parsedNFTs ?? []).every(
				nft => nft.collectionAddress && nft.recipient && nft.tokenId
			)
		) {
			return [
				{
					file: csvFile,
					errors: [{ message: t('common:csv-contains-invalid-fields'), code: 400 }],
				},
			]
		}

		if (
			!(csvFile.parsedNFTs ?? []).every(
				nft =>
					isValidTerraAddress(nft.recipient ?? '') &&
					isValidTerraAddress(nft.collectionAddress)
			)
		) {
			return [
				{
					file: csvFile,
					errors: [
						{ message: t('common:csv-contains-invalid-addresses'), code: 400 },
					],
				},
			]
		}

		return null
	}

	return (
		<FormWrapper>
			<ContentCardTitle>{t('send:airdrop-details.question-2')}</ContentCardTitle>
			<ContentCardSubtitle>
				{t(`send:airdrop-details.answer-${airdropType}`)}
			</ContentCardSubtitle>
			{airdropType === AIRDROP_TYPE.CSV && (
				<Box>
					<Flex sx={{ mt: 20 }}>
						<LinkButton href={ROUTES.SENDER_CSV_TEMPLATE} variant='secondary'>
							{t('common:download-csv-template-file')}
						</LinkButton>
					</Flex>

					<Box sx={{ mt: 28 }}>
						<ContentCardTitle>{t('common:upload-csv-file')}</ContentCardTitle>
					</Box>

					{watch('selectedNFTs').length ? (
						<Flex sx={{ mt: '8px', mb: '24px', height: ['76px'] }}>
							<UploadProgressBar
								onDismiss={() => setValue('selectedNFTs', [], { shouldValidate: true })}
								title={watch('fileName')}
								progress={100}
							/>
						</Flex>
					) : (
						<Flex sx={{ mt: '8px', mb: '24px', height: ['207px'] }}>
							<FileDropZone
								maxFiles={1}
								maxSize={5 * 10 ** 6}
								accept={{ 'text/csv': ['.csv'] }}
								validator={validator as any}
								getFilesFromEvent={getFilesFromEvent as any}
								onDropRejected={onDropRejected}
								onDropAccepted={onDropAccepted as any}
							>
								<UploadContentArea>
									<UploadCircle>
										<UploadIcon />
									</UploadCircle>
									<Flex
										sx={{ flexDirection: 'column', alignItems: 'center', gap: '8px' }}
									>
										<UploadLabel>{t('common:upload-label')}</UploadLabel>
										<UploadMaxSize>{t('common:max-csv-file-size-label')}</UploadMaxSize>
										{errors.selectedNFTs?.message && (
											<Box sx={{ fontSize: '14px', color: 'error100' }}>
												{t(`common:errors.${errors.selectedNFTs?.message}`)}
											</Box>
										)}
									</Flex>
								</UploadContentArea>
							</FileDropZone>
						</Flex>
					)}
				</Box>
			)}
			{airdropType === AIRDROP_TYPE.PARTICIPANTS &&
				(selectedNFTs.length ? (
					<SelectedNFTs />
				) : (
					<Flex sx={{ flexDirection: 'column', alignItems: 'center', mb: '24px' }}>
						<SelectNFTsEmpty />
					</Flex>
				))}
		</FormWrapper>
	)
}

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const AirdropDetails = ({ goNextStep, goBackStep }: Props) => {
	const {
		getValues,
		watch,
		formState: { isValid },
	} = useFormContext<SendFormStepsProps>()
	const { t } = useTranslation(['send'])
	const airdropType = watch('airdropType', undefined)

	return (
		<ContentCardWrapper>
			<ContentCard>
				{!airdropType ? (
					<>
						<ContentCardTitle>{t('send:airdrop-details.question')}</ContentCardTitle>
						<ContentCardSubtitle>
							{t('send:airdrop-details.instructions')}
						</ContentCardSubtitle>
						<AirdropDetailsSelector />
					</>
				) : (
					<AirdropDetailsForm />
				)}
			</ContentCard>
			{/* Footer Navigation Section */}
			<NavigationFooter
				goBackStep={goBackStep}
				goNextStep={goNextStep}
				isBackButtonDisabled
				isNextButtonDisabled={!getValues('airdropType') || !isValid}
			/>
		</ContentCardWrapper>
	)
}
