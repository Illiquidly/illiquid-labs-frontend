import React from 'react'
import { useFormikContext } from 'formik'

import { Collection } from 'hooks/useMyNFTs'
import {
	ErrorSection,
	GridContainer,
	ErrorMessage,
	Card,
} from './WantToMigrate.styled'
import NFTPreviewCard, { NFT } from '../NFTPreviewCard/NFTPreviewCard'

interface WantToMigrateProps {
	verifiedCollections: Collection[]
}

export interface MigrateForm {
	NFTs: NFT[]
}

function WantToMigrate({ verifiedCollections }: WantToMigrateProps) {
	const { values, errors, setFieldValue } = useFormikContext<MigrateForm>()

	const removeNFTFromTrade = (nftToRemove: NFT) => {
		setFieldValue(
			'NFTs',
			values.NFTs.filter(
				(n: NFT) =>
					!(
						n.contractAddress === nftToRemove.contractAddress &&
						n.tokenId === nftToRemove.tokenId
					)
			)
		)
	}

	return (
		<Card>
			<ErrorSection>
				<ErrorMessage color='#09B787'>
					{errors?.NFTs ||
						`${values.NFTs.length} NFT${values.NFTs.length > 1 ? 's' : ''} selected`}
				</ErrorMessage>
			</ErrorSection>
			<GridContainer>
				{values.NFTs.map((nft: NFT) => (
					<div key={`${nft.contractAddress}_${nft.tokenId}_${nft.name}`}>
						<NFTPreviewCard
							onRemove={removeNFTFromTrade}
							closable
							verified={verifiedCollections.some(
								collection => collection.collectionAddress === nft.contractAddress
							)}
							nft={nft}
						/>
					</div>
				))}
			</GridContainer>
		</Card>
	)
}

export default WantToMigrate
