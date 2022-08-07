import React from 'react'
import { useFormikContext } from 'formik'
import { StyledLoadingOverlay } from 'components/ui/LoadingOverlay/LoadingOverlay'
import { Tooltip } from 'components/ui/Tooltip/Tooltip'
import OptionsPicker from 'components/ui/OptionsPicker/OptionsPicker'
import { TooltipIcon } from 'components/ui/Tooltip/Tooltip.styled'
import { Collection } from '../../../../hooks/useMyNFTs'
import {
	ActionsContainer,
	ButtonText,
	Card,
	GridContainer,
	LoadingText,
	SelectButton,
	Title,
} from './YourNFTs.styled'
import NFTPreviewCard, { NFT } from '../NFTPreviewCard/NFTPreviewCard'
import { MigrateForm } from '../WantToMigrate/WantToMigrate'

interface YourNFTsProps {
	nfts: NFT[]
	collections: Collection[]
	isLoading: boolean
	verifiedCollections: Collection[]
	title?: string
	titleTooltipText?: string
	isLoadingInBackground: boolean
	fullyLoadingText?: string
}

function YourNFTs({
	nfts,
	collections,
	isLoading,
	isLoadingInBackground,
	verifiedCollections,
	title,
	titleTooltipText,
	fullyLoadingText,
}: YourNFTsProps) {
	const { values, setFieldValue } = useFormikContext<MigrateForm>()

	const collectionsOptions = React.useMemo(
		() =>
			collections.map(collection => ({
				label: collection?.collectionName,
				value: collection?.collectionAddress,
				enabled: true,
			})),
		[collections]
	)

	const [filterOptionsValue, setFilterOptions] = React.useState([
		{ label: 'Show all', value: 'Show all', enabled: true },
	])

	React.useEffect(() => {
		setFilterOptions(
			[
				{ label: 'Show all', value: 'Show all', enabled: true },
				...collectionsOptions,
			].map(col => ({
				...col,
				enabled:
					filterOptionsValue.find(f => f.value === col.value)?.enabled ??
					col.enabled,
			}))
		)
	}, [collectionsOptions])

	const filteredNFTs = React.useMemo(
		() =>
			nfts.filter(nft =>
				filterOptionsValue
					.filter(x => x.enabled)
					.map(x => x.value)
					.includes(nft.contractAddress)
			),
		[nfts, filterOptionsValue]
	)

	const selectNFT = (nft: NFT) => {
		if (values.NFTs.some(x => JSON.stringify(x) === JSON.stringify(nft))) {
			setFieldValue(
				'NFTs',
				values.NFTs.filter(x => JSON.stringify(x) !== JSON.stringify(nft))
			)

			return
		}

		setFieldValue('NFTs', [...values.NFTs, nft])
	}

	const allSelected =
		values.NFTs.every(nft => filteredNFTs.includes(nft)) && values.NFTs.length > 0

	return (
		<Card>
			<Title>
				{title}

				{titleTooltipText && (
					<Tooltip overlay={titleTooltipText} placement='top'>
						<TooltipIcon style={{ height: '0.7em', marginTop: -2 }} />
					</Tooltip>
				)}
				{!isLoading && isLoadingInBackground && (
					<LoadingText>{fullyLoadingText}</LoadingText>
				)}
			</Title>
			<OptionsPicker options={filterOptionsValue} setOptions={setFilterOptions} />
			<ActionsContainer>
				<SelectButton
					fullWidth
					selected={allSelected}
					onClick={() =>
						allSelected
							? setFieldValue('NFTs', [])
							: setFieldValue('NFTs', filteredNFTs)
					}
				>
					<ButtonText>{allSelected ? 'Unselect all ' : 'Select all'}</ButtonText>
				</SelectButton>
			</ActionsContainer>
			<StyledLoadingOverlay
				classNamePrefix='Secondary_'
				active={isLoading}
				spinner
			>
				<GridContainer>
					{filteredNFTs.map(nft => (
						<div key={`${nft.contractAddress}_${nft.tokenId}_${nft.name}`}>
							<NFTPreviewCard
								onClick={() => selectNFT(nft)}
								disabled={values.NFTs.some(
									x => JSON.stringify(x) === JSON.stringify(nft)
								)}
								verified={verifiedCollections.some(
									collection => collection.collectionAddress === nft.contractAddress
								)}
								nft={nft}
							/>
						</div>
					))}
				</GridContainer>
			</StyledLoadingOverlay>
		</Card>
	)
}

YourNFTs.defaultProps = {
	title: 'Your NFTs:',
	titleTooltipText: '',
	fullyLoadingText: 'Please wait! Your NFT were not fully loaded yet.',
}

export default YourNFTs
