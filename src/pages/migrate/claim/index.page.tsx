import { useWallet, WalletStatus } from '@illiquid-labs/use-wallet'
import If from 'components/core/IfStatement'
import { MainContainer } from 'components/ui/Container/Container'
import Modal from 'components/ui/Modal/Modal'
import { MIGRATOR_TARGET_CHAIN_ID } from 'constants/migratorConfig'
import Image from 'next/image'
import React from 'react'
import { Box, Flex } from 'rebass'
import { useRecoilState } from 'recoil'
import {
	SupportedCollectionGetResponse,
	SupportedCollectionsService,
} from 'services/api/supportedCollectionsService'
import { appLoadingState } from 'state'
import {
	chainIdToNetworkName,
	getNetworkName,
} from 'utils/blockchain/terraUtils'
import migrationProgressAnimation from 'theme/assets/migration-progress.gif'
import migratorAnimation from 'theme/assets/migrator.gif'
import MigrationSection from '../components/MigrationSection/MigrationSection'
import { BroadcastingTrxContent, Card } from '../index.styled'
import {
	Container,
	MigratorImageContainer,
	SectionTitle,
	Title,
	TitleContainer,
} from './index.styled'
import { withMyMigrations } from '../hoc/withMyMigrations'

const MyMigrationsSection = withMyMigrations(MigrationSection)

export async function getStaticProps() {
	const verifiedCollections =
		await SupportedCollectionsService.getSupportedCollections(
			chainIdToNetworkName('columbus-5')
		)

	return {
		props: {
			verifiedCollections,
		},
	}
}

export default function MyMigrations({
	verifiedCollections,
}: {
	verifiedCollections: SupportedCollectionGetResponse[]
}) {
	const wallet = useWallet()

	const [appLoading] = useRecoilState(appLoadingState)

	return (
		<>
			<Modal title='TRANSACTION IN PROGRESS' open={appLoading}>
				<Flex alignItems='center' justifyContent='center' padding={3}>
					<BroadcastingTrxContent>
						<Image
							unoptimized
							priority
							objectFit='contain'
							src={migrationProgressAnimation}
							alt=''
						/>
					</BroadcastingTrxContent>
				</Flex>
			</Modal>
			<MainContainer>
				<Container>
					<Flex width='100%' flexDirection='column'>
						<Flex alignItems='center' justifyContent='center'>
							<MigratorImageContainer>
								<Image
									priority
									unoptimized
									objectFit='contain'
									src={migratorAnimation}
									alt=''
								/>
							</MigratorImageContainer>
						</Flex>
						<TitleContainer>
							<div style={{ flex: 1 }} />
							<TitleContainer>
								<Flex marginLeft={[0, 20]}>
									<Title>My NFTs migrated to Terra 2.0</Title>
								</Flex>
							</TitleContainer>

							<div style={{ flex: 1 }} />
						</TitleContainer>
					</Flex>

					<Box marginBottom={4} marginTop={[3, 4]}>
						{(wallet.network.chainID !== MIGRATOR_TARGET_CHAIN_ID ||
							wallet.status === WalletStatus.WALLET_NOT_CONNECTED) && (
							<Card>
								<SectionTitle>
									<Flex fontSize={[14, 16]} justifyContent='center'>
										<div>
											<If condition={wallet.status === WalletStatus.WALLET_NOT_CONNECTED}>
												<If.Then>
													<b>Please connect your wallet.</b>
												</If.Then>
												<If.Else>
													<b>{`Switch your wallet network from ${getNetworkName()} to ${chainIdToNetworkName(
														MIGRATOR_TARGET_CHAIN_ID
													)} and reload page`}</b>
												</If.Else>
											</If>
										</div>
									</Flex>
								</SectionTitle>
							</Card>
						)}

						{wallet.network.chainID === MIGRATOR_TARGET_CHAIN_ID &&
							wallet.status === WalletStatus.WALLET_CONNECTED && (
								<div>
									<MyMigrationsSection
										card1Title='waiting to be claimed:'
										card2Title='My previous migrations (claimed)'
										verifiedCollections={verifiedCollections || []}
									/>
								</div>
							)}
					</Box>
				</Container>
			</MainContainer>
		</>
	)
}
