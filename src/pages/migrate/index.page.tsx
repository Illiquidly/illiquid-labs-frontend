import { useWallet, WalletStatus } from '@illiquid-labs/wallet-provider'
import If from 'components/core/IfStatement'
import { Formik, FormikProps } from 'formik'
import { useRecoilState } from 'recoil'
import { MainContainer } from 'components/ui/Container/Container'
import Modal from 'components/ui/Modal/Modal'
import { MIGRATOR_SOURCE_CHAIN_ID } from 'constants/migratorConfig'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Warning from 'theme/icons/warning.svg'
import React from 'react'
import ArrowRight from 'theme/icons/arrow-right.svg'
import Illiquid from 'theme/icons/illiquid.svg'
import { Box, Flex } from 'rebass'
import migrationProgressAnimation from 'theme/assets/migration-progress.gif'
import migratorAnimation from 'theme/assets/migrator.gif'
import { Checkbox } from 'pretty-checkbox-react'
import { noop } from 'lodash'
import {
	amountConverter,
	chainIdToNetworkName,
	getNetworkName,
} from 'utils/blockchain/terraUtils'
import * as yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import {
	SupportedCollectionGetResponse,
	SupportedCollectionsService,
} from 'services/api/supportedCollectionsService'
import useTransactionError from 'hooks/useTransactionError'
import useMyNFTs from 'hooks/useMyNFTs'
import { MigratableCollectionsService } from 'services/api/migratableCollectionsService'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { useRouter } from 'next/router'
import useBroadcastingTx from 'hooks/useBroadcastingTx'
import { asyncAction } from 'utils/js/asyncAction'
import cw721Migrator from 'services/blockchain/contracts/cw721Migrator'
import { appLoadingState } from 'state'
import { Button } from 'components/ui/Button/Button'
import { Tooltip } from 'components/ui/Tooltip/Tooltip'
import { TooltipIcon } from 'components/ui/Tooltip/Tooltip.styled'
import { SectionTitle } from './components/MigrationSection/MigrationSection.styled'
import {
	BroadcastingTrxContent,
	MigratorImageContainer,
	Title,
	TitleContainer,
	Card,
	ToastLink,
	MigrationPreviewText,
	ModalActionsContainer,
	ModalCancelButton,
	ModalConfirmButton,
	MigratorContainer,
	FeeCard,
	FeeText,
	ButtonContainer,
} from './index.styled'
import { NFT } from './components/NFTPreviewCard/NFTPreviewCard'
import WantToMigrate from './components/WantToMigrate/WantToMigrate'
import YourNFTs from './components/YourNFTs/YourNFTs'

export interface MigrateForm {
	NFTs: NFT[]
}

const createMigrationValidationSchema = yup.object().shape({
	NFTs: yup
		.array()
		.min(1, 'Please select at least 1 NFT for migration')
		.required('Please select at least 1 NFT for migration'),
})

const renderToastContent = ({ url }: { url?: string }) => (
	<div>
		<Box marginRight={4}>Your NFTs were successfully locked.</Box>
		<ToastLink href={url} target='_blank' rel='noreferrer'>
			Open in Terra Finder
		</ToastLink>
	</div>
)

export async function getStaticProps() {
	const verifiedCollections =
		await SupportedCollectionsService.getSupportedCollections(
			chainIdToNetworkName('columbus-5')
		)

	return { props: { verifiedCollections } }
}

export default function Migrate({
	verifiedCollections,
}: {
	verifiedCollections: SupportedCollectionGetResponse[]
}) {
	const router = useRouter()
	const [modalOpen, setModalOpen] = React.useState(false)
	const [modalBetaCheck, setModalBetaCheck] = React.useState(false)
	const [modalLockCheck, setModalLockCheck] = React.useState(false)
	const [modalTermsCheck, setModalTermsCheck] = React.useState(false)

	const wallet = useWallet()

	const [showTransactionError] = useTransactionError()
	const {
		nfts,
		collections,
		nftsPartiallyLoading,
		nftsFullyLoading,
		fetchMyAssets,
	} = useMyNFTs()

	const { data: migratableCollections } = useQuery(
		['migratableCollections'],
		async () => MigratableCollectionsService.getMigratableCollections()
	)

	const [appLoading, setAppLoading] = useRecoilState(appLoadingState)

	const formRef = React.useRef<FormikProps<MigrateForm>>(null)

	const [txReceipt, setTxReceipt] = React.useState<TxReceipt | null>(null)

	const onSuccessBroadcast = async () => {
		toast.success(renderToastContent({ url: txReceipt?.txTerraFinderUrl }), {
			position: 'top-right',
			autoClose: false,
			onClick: noop,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			pauseOnFocusLoss: false,
		})

		formRef?.current?.resetForm()

		await fetchMyAssets()

		router.push('/migrate/claim')
		setAppLoading(false)
	}

	const { setLoading, loading } = useBroadcastingTx(
		txReceipt?.txId,
		onSuccessBroadcast
	)

	const onSubmit = async ({ NFTs }: { NFTs: NFT[] }) => {
		setAppLoading(true)
		setLoading({ ...loading, send: true })
		const [error, txResponse] = await asyncAction(
			cw721Migrator.lockManyToContracts(
				NFTs.map(nft => ({
					...nft,
					destinationAddress: (migratableCollections ?? {})[nft?.contractAddress]
						?.escrowContract,
				}))
			)
		)

		if (txResponse) {
			setModalOpen(false)
			setTxReceipt(txResponse)
		}
		if (error) {
			showTransactionError(error)
			setAppLoading(false)
		}
		setLoading({ ...loading, send: false })
	}

	return (
		<>
			<Modal title='TRANSACTION IN PROGRESS' open={appLoading}>
				<Flex alignItems='center' justifyContent='center' padding={3}>
					<BroadcastingTrxContent>
						<Image
							unoptimized
							objectFit='contain'
							src={migrationProgressAnimation}
							alt=''
						/>
					</BroadcastingTrxContent>
				</Flex>
			</Modal>
			<MainContainer>
				<Flex width='100%' flexDirection='column'>
					<Flex alignItems='center' justifyContent='center' marginLeft={[-2, 0]}>
						<MigratorImageContainer>
							<Image unoptimized objectFit='contain' src={migratorAnimation} alt='' />
						</MigratorImageContainer>
					</Flex>
					<TitleContainer>
						<Flex flex={1} maxWidth={[380, 380, 670]}>
							<Flex
								justifyContent={['center']}
								alignItems='center'
								width={[1 / 2]}
								p={0}
							>
								<Title>Terra Classic</Title>
							</Flex>
							<Flex
								justifyContent={['flex-start', 'center']}
								alignItems='center'
								width={[1 / 4]}
								p={0}
								paddingLeft={[3, 0]}
							>
								<Flex flex={1} maxWidth={[35, 40, 50]} height={[35, 40, 50]}>
									<ArrowRight fill='#FFF' />
								</Flex>
							</Flex>
							<Flex justifyContent='center' alignItems='center' width={[1 / 2]} p={0}>
								<Title>Terra Migration</Title>
							</Flex>
						</Flex>
					</TitleContainer>
				</Flex>

				<Box width='100%' marginBottom={4} marginTop={[3, 4]}>
					{wallet.network.chainID !== MIGRATOR_SOURCE_CHAIN_ID && (
						<Card>
							<SectionTitle>
								<Flex flex={1} fontSize={[14, 16]} justifyContent='center'>
									<If condition={wallet.status === WalletStatus.WALLET_NOT_CONNECTED}>
										<If.Then>
											<b>Please connect your wallet.</b>
										</If.Then>
										<If.Else>
											<b>{`Switch your wallet network from ${getNetworkName()} to ${chainIdToNetworkName(
												MIGRATOR_SOURCE_CHAIN_ID
											)} and reload page`}</b>
										</If.Else>
									</If>
								</Flex>
							</SectionTitle>
						</Card>
					)}

					{wallet.network.chainID === MIGRATOR_SOURCE_CHAIN_ID && (
						<Formik
							validateOnMount // Validation is not triggered on mount, we use this prop.
							onSubmit={onSubmit}
							validationSchema={createMigrationValidationSchema}
							initialValues={{
								NFTs: [],
								recipient: '',
							}}
							innerRef={formRef}
						>
							{({ submitForm, isSubmitting, isValid, values }) => {
								const totalProjectFee = values.NFTs.map(nft =>
									amountConverter.luna.blockchainValueToUserFacing(
										Number(
											(migratableCollections ?? {})[nft.contractAddress]?.feeInfo
												?.projectPrice
										)
									)
								).reduce((prev, next) => prev + next, 0)

								const totalIlliquidlyFee = values.NFTs.map(nft =>
									amountConverter.luna.blockchainValueToUserFacing(
										Number(
											(migratableCollections ?? {})[nft.contractAddress]?.feeInfo?.feePrice
										)
									)
								).reduce((prev, next) => prev + next, 0)
								const totalFee = totalProjectFee + totalIlliquidlyFee

								return (
									<div>
										<Modal
											open={modalOpen}
											title='MIGRATION WARNING'
											onClose={() => {
												setModalOpen(false)
											}}
										>
											<Flex
												padding={[0, 2]}
												marginTop={[3, 3]}
												flexDirection='column'
												overflow={['auto']}
												height={[350, 600]}
											>
												<Box paddingBottom={[2, 3]}>
													<MigrationPreviewText>
														NFTs selected will be deposited into the migration contract,
														PERMANENTLY LOCKED on Terra Classic and reminted on Terra 2.0. To
														claim your NFTs on Terra 2.0, you will be required to pay a fee
														(estimated fees are displayed below your chosen NFTs). To pay the
														fee and claim your NFTs, you will need $LUNA in your wallet on
														Terra 2.0 Mainnet.
													</MigrationPreviewText>
												</Box>
												<MigrationPreviewText color='#fff'>
													What are the fees?
												</MigrationPreviewText>
												<MigrationPreviewText>
													Project Fee: Varies between projects
												</MigrationPreviewText>
												<MigrationPreviewText>
													Illiquid Labs Fee: A flat fee of $1 ($LUNA value)
												</MigrationPreviewText>
												<MigrationPreviewText>
													Transaction Fee: Typical TX fee
												</MigrationPreviewText>

												<Box paddingTop={[2, 3]}>
													<MigrationPreviewText>
														The illiquid labs team is working closely with the NFT collections
														migrating, and their teams can choose to charge individual fees.
														The illiquid labs team is not responsible for the ways the teams
														use the funds from migration.
													</MigrationPreviewText>
												</Box>
												<Flex paddingTop={[2, 3]}>
													<Box minWidth='unset' marginRight={[0, '12px']}>
														<div>
															<Checkbox
																checked={modalBetaCheck}
																onChange={e => setModalBetaCheck(e.target.checked)}
																color='primary'
															/>
														</div>
													</Box>

													<MigrationPreviewText color='#2F80E8'>
														I Understand that the Illiquid Labs migration contract is in Beta
														and I am using the feature at my own risk.
													</MigrationPreviewText>
												</Flex>
												<Flex marginTop={[2, 2]}>
													<Box minWidth='unset' marginRight={[0, '12px']}>
														<div>
															<Checkbox
																checked={modalLockCheck}
																onChange={e => setModalLockCheck(e.target.checked)}
																color='primary'
															/>
														</div>
													</Box>

													<MigrationPreviewText color='#2F80E8'>
														I Understand that the NFTs I have selected for migration will be
														permanently locked on Terra Classic and{' '}
														<MigrationPreviewText as='span' color='#e82f35'>
															only redeemable on Terra Mainnet once the fee has been paid.
														</MigrationPreviewText>
													</MigrationPreviewText>
												</Flex>
												<Flex marginTop={[2, 2]}>
													<Box minWidth='unset' marginRight={[0, '12px']}>
														<div>
															<Checkbox
																checked={modalTermsCheck}
																onChange={e => setModalTermsCheck(e.target.checked)}
																color='primary'
															/>
														</div>
													</Box>

													<MigrationPreviewText color='#2F80E8'>
														I understand that after migrating,{' '}
														<MigrationPreviewText as='span' color='#e82f35'>
															I must claim my NFTs within 6 months at the latest.{' '}
														</MigrationPreviewText>{' '}
														NFTs unclaimed after 6 months will be used by Illiquid labs to
														organize raffles for the community.
													</MigrationPreviewText>
												</Flex>
											</Flex>
											<Flex flex={1} paddingTop={[3, 3]} paddingBottom={[2, 3]}>
												<ModalActionsContainer>
													<ModalCancelButton fullWidth onClick={() => setModalOpen(false)}>
														Cancel
													</ModalCancelButton>
													<Box marginRight={12} />
													<ModalConfirmButton
														fullWidth
														disabled={!modalBetaCheck || !modalLockCheck || !modalTermsCheck}
														onClick={submitForm}
													>
														Start Migration
													</ModalConfirmButton>
												</ModalActionsContainer>
											</Flex>
										</Modal>
										{wallet.network.chainID === MIGRATOR_SOURCE_CHAIN_ID && (
											<Flex height={[480, 480, 420, 400]}>
												<WantToMigrate verifiedCollections={verifiedCollections ?? []} />
											</Flex>
										)}
										<MigratorContainer>
											<FeeCard>
												<FeeText>
													NFT project fee: {Number(totalProjectFee.toFixed(5))} luna
													<span>
														<Tooltip
															overlay={
																<div>This fee will go to NFT projects being migrated</div>
															}
															placement='top'
														>
															<TooltipIcon style={{ height: '0.7em', marginTop: -2 }} />
														</Tooltip>
													</span>
												</FeeText>
											</FeeCard>
											<FeeCard>
												<FeeText>
													Illiquid labs: {Number(totalIlliquidlyFee.toFixed(5))} luna
													<span>
														<Tooltip
															overlay={
																<div>
																	Our migration fee is 1 $ per NFT (equivalent in $LUNA) or 0$ if
																	the collection chose to cover migration costs
																</div>
															}
															placement='top'
														>
															<TooltipIcon style={{ height: '0.7em', marginTop: -2 }} />
														</Tooltip>
													</span>
												</FeeText>
											</FeeCard>
											<FeeCard>
												<FeeText>
													Total estimated fee: {Number(totalFee.toFixed(5))} luna
												</FeeText>
											</FeeCard>
											<div style={{ flex: 1 }} />
											<ButtonContainer>
												<Button
													fullWidth
													onClick={() => setModalOpen(true)}
													disabled={isSubmitting || !isValid}
												>
													Migrate selected NFTs
													<div style={{ display: 'flex', marginBottom: -2, height: 30 }}>
														<Illiquid />
													</div>
												</Button>
											</ButtonContainer>
										</MigratorContainer>
										<Flex marginTop={3}>
											<Warning />
											<Box marginRight={12} />
											<FeeText>Preview; fees are charged on Terra 2.0</FeeText>
										</Flex>

										<Box marginTop={[4, 4]} marginBottom={5}>
											<YourNFTs
												title='Your available NFTs for migration:'
												titleTooltipText='Not all your NFTs will be visible here. We can only migrate collections with support from their team'
												verifiedCollections={verifiedCollections ?? []}
												isLoading={nftsPartiallyLoading}
												isLoadingInBackground={nftsFullyLoading}
												nfts={nfts.filter(nft =>
													Object.keys(migratableCollections ?? {}).includes(
														nft.contractAddress
													)
												)}
												collections={collections.filter(collection =>
													Object.keys(migratableCollections ?? {}).includes(
														collection.collectionAddress
													)
												)}
											/>
										</Box>
									</div>
								)
							}}
						</Formik>
					)}
				</Box>
			</MainContainer>
		</>
	)
}
