import React from 'react'
import { StyledLoadingOverlay } from 'components/ui/LoadingOverlay/LoadingOverlay'

import { Collection } from 'hooks/useMyNFTs'
import { Migration } from 'pages/migrate/hooks/useMyMigrations'
import { noop, uniqBy } from 'lodash'
import OptionsPicker from 'components/ui/OptionsPicker/OptionsPicker'
import { amountConverter } from 'utils/blockchain/terraUtils'
import NFTs from 'theme/icons/NFTs.svg'

import { TooltipIcon } from 'components/ui/Tooltip/Tooltip.styled'

import If from 'components/core/IfStatement'
import { ButtonContainer } from 'pages/migrate/index.styled'
import { Box, Flex } from 'rebass'
import { Button } from 'components/ui/Button/Button'
import { Tooltip } from 'components/ui/Tooltip/Tooltip'
import {
	FeeCard,
	Card,
	ClaimSection,
	FeeText,
	GridContainer,
	SectionTitle,
	CardTitle,
	LoadingText,
} from './MigrationSection.styled'
import NFTPreviewCard, { NFT } from '../NFTPreviewCard/NFTPreviewCard'

export interface MigratorClaimForm {
	NFTs: NFT[]
}

export type MigrationSectionProps = {
	migrations: Migration[]
	verifiedCollections: Collection[]
	loading: boolean
	lazyLoading?: boolean
	card1Title: string
	card2Title: string
	isClaimable?: boolean
	onSubmit?: (...x: any) => void
	hasCount?: boolean
}

export default function MigrationSection({
	isClaimable,
	migrations,
	verifiedCollections,
	loading,
	card1Title,
	card2Title,
	onSubmit,
	hasCount,
	lazyLoading,
}: MigrationSectionProps) {
	const pendingMigrations = React.useMemo(
		() => migrations.filter(x => !x.migrated),
		[migrations]
	)
	const completedMigrations = React.useMemo(
		() => migrations.filter(x => x.migrated),
		[migrations]
	)

	const collections = React.useMemo(
		() => uniqBy(migrations, ({ contractAddress }) => contractAddress),
		[migrations]
	)

	const [filterOptionsValue, setFilterOptions] = React.useState([
		{ label: 'Show all', value: 'Show all', enabled: true },
	])

	const allMigrationCollections = React.useMemo(
		() =>
			collections.map(collection => ({
				label: collection?.collectionName,
				value: collection?.contractAddress,
				enabled: true,
			})),
		[collections]
	)

	React.useEffect(() => {
		setFilterOptions(
			[
				{ label: 'Show all', value: 'Show all', enabled: true },
				...allMigrationCollections,
			].map(col => ({
				...col,
				enabled:
					filterOptionsValue.find(f => f.value === col.value)?.enabled ??
					col.enabled,
			}))
		)
	}, [allMigrationCollections])

	const filteredCompletedMigrations = React.useMemo(
		() =>
			completedMigrations.filter(nft =>
				filterOptionsValue
					.filter(x => x.enabled)
					.map(x => x.value)
					.includes(nft.contractAddress)
			),
		[completedMigrations, filterOptionsValue]
	)

	const filteredPendingMigrations = React.useMemo(
		() =>
			isClaimable
				? pendingMigrations
				: pendingMigrations.filter(nft =>
						filterOptionsValue
							.filter(x => x.enabled)
							.map(x => x.value)
							.includes(nft.contractAddress)
				  ),
		[pendingMigrations, filterOptionsValue, isClaimable]
	)

	const totalProjectFee = filteredPendingMigrations
		.map(x =>
			amountConverter.luna.blockchainValueToUserFacing(
				Number(x.feeInfo.projectPrice)
			)
		)
		.reduce((prev, next) => prev + next, 0)

	const totalIlliquidlyFee = filteredPendingMigrations
		.map(x =>
			amountConverter.luna.blockchainValueToUserFacing(Number(x.feeInfo.feePrice))
		)
		.reduce((prev, next) => prev + next, 0)

	const totalFee = totalProjectFee + totalIlliquidlyFee

	return (
		<>
			<Box marginBottom={4}>
				<Card isGradient>
					<SectionTitle>
						<CardTitle color='#09B787'>{card1Title}</CardTitle>
						<If condition={hasCount}>
							<If.Then>
								<div style={{ marginTop: 4, marginLeft: 12, marginRight: 12 }}>
									<NFTs fill='#09B787' />
								</div>

								<CardTitle color='#09B787'>{`${filteredPendingMigrations.length} ${
									filteredPendingMigrations.length !== 1 ? 'NFTs' : 'NFT'
								}`}</CardTitle>
							</If.Then>
						</If>
					</SectionTitle>

					<Box marginTop={2} />

					<StyledLoadingOverlay
						classNamePrefix='Secondary_'
						active={loading}
						spinner
					>
						<Flex height={[400, 360]}>
							<GridContainer>
								{filteredPendingMigrations.map(nft => (
									<div key={`${nft.contractAddress}_${nft.tokenId}_${nft.name}`}>
										<NFTPreviewCard
											verified={verifiedCollections.some(
												collection => collection.collectionAddress === nft.contractAddress
											)}
											nft={nft}
										>
											{isClaimable && (
												<Flex padding={[12]}>
													<Button fullWidth onClick={() => onSubmit?.([nft])}>
														Claim NFT
													</Button>
												</Flex>
											)}
										</NFTPreviewCard>
									</div>
								))}
							</GridContainer>
						</Flex>
					</StyledLoadingOverlay>
				</Card>
			</Box>
			{isClaimable && (
				<ClaimSection>
					<FeeCard>
						<FeeText>
							NFT project fee: {Number(totalProjectFee.toFixed(5))} luna
							<Tooltip
								overlay={<>This fee will go to NFT projects being migrated</>}
								placement='top'
							>
								<TooltipIcon style={{ height: '0.7em', marginTop: -2 }} />
							</Tooltip>
						</FeeText>
					</FeeCard>
					<FeeCard>
						<FeeText>
							Illiquid labs fee: {Number(totalIlliquidlyFee.toFixed(5))} luna
							<Tooltip
								overlay={
									<>
										Our migration fee is 1 $ per NFT (equivalent in $LUNA) or 0$ if the
										collection chose to cover migration costs
									</>
								}
								placement='top'
							>
								<TooltipIcon style={{ height: '0.7em', marginTop: -2 }} />
							</Tooltip>
						</FeeText>
					</FeeCard>
					<FeeCard>
						<FeeText>Total estimated fee: {Number(totalFee.toFixed(5))} luna</FeeText>
					</FeeCard>
					<div style={{ flex: 1 }} />

					<ButtonContainer style={{ gap: '12px' }}>
						<Button
							fullWidth
							onClick={() => onSubmit?.(pendingMigrations)}
							disabled={!pendingMigrations.length}
						>
							Claim all NFTs
						</Button>
					</ButtonContainer>
				</ClaimSection>
			)}
			<Box marginBottom={5}>
				<Card>
					<SectionTitle>
						<CardTitle>{card2Title}</CardTitle>

						<If condition={hasCount}>
							<If.Then>
								<Box marginRight='12px' />

								<div style={{ marginTop: 4 }}>
									<NFTs fill='#89A8CF' />
								</div>

								<Box marginRight='12px' />

								<CardTitle>{`${filteredCompletedMigrations.length} ${
									filteredCompletedMigrations.length !== 1 ? 'NFTs' : 'NFT'
								}`}</CardTitle>

								<Box marginRight='12px' />

								<LoadingText>
									{lazyLoading ? 'Loading more in background.' : ''}
								</LoadingText>
							</If.Then>
						</If>
					</SectionTitle>
					<OptionsPicker
						options={filterOptionsValue}
						setOptions={setFilterOptions}
					/>

					<Box marginTop={3} />

					<StyledLoadingOverlay
						classNamePrefix='Secondary_'
						active={loading}
						spinner
					>
						<Flex height={[600, 500]}>
							<GridContainer>
								{filteredCompletedMigrations.map(nft => (
									<div key={`${nft.contractAddress}_${nft.tokenId}_${nft.name}`}>
										<NFTPreviewCard
											verified={verifiedCollections.some(
												collection => collection.collectionAddress === nft.contractAddress
											)}
											nft={nft}
										/>
									</div>
								))}
							</GridContainer>
						</Flex>
					</StyledLoadingOverlay>
				</Card>
			</Box>
		</>
	)
}

MigrationSection.defaultProps = {
	isClaimable: false,
	onSubmit: noop,
	hasCount: false,
	lazyLoading: false,
}
