import NiceModal from '@ebay/nice-modal-react'
import LoanAssetImage from 'assets/images/TradeAsset'
import { Button, NFTCard } from 'components'
import { MyNFTsModal } from 'components/shared/modals/my-nfts-modal'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex, Text } from 'theme-ui'
import { asyncAction } from 'utils/js/asyncAction'
import { MyNFTsModalProps } from 'components/shared/modals/my-nfts-modal/MyNFTsModal'
import { LoanFormStepsProps } from 'types'
import { NavigationFooter } from 'components/shared/navigation-footer'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardTitleChip,
	ListOfSelectedNFTsCard,
	ListOfSelectedNFTsHeader,
	NFTCardsContainer,
	LoanAssetImageContainer,
} from './SelectNFTs.styled'

interface SelectNFTProps {
	goNextStep: () => void
	goBackStep: () => void
}

const ListOfSelectedNFTs = ({ goBackStep, goNextStep }: SelectNFTProps) => {
	const { setValue, getValues, watch } = useFormContext<LoanFormStepsProps>()
	const { t } = useTranslation(['common', 'loan'])
	const selectedCoverNFT = watch('coverNFT') || getValues('selectedNFTs')[0]

	return (
		<Flex sx={{ flexDirection: 'column', flex: 1 }}>
			<ListOfSelectedNFTsCard>
				<ListOfSelectedNFTsHeader>
					<div>
						<ContentCardTitle sx={{ textAlign: 'left' }}>
							{t('loan:select-NFTs.selected-nfts')}
							<ContentCardTitleChip>
								{t('common:nft', { count: getValues('selectedNFTs').length })}
							</ContentCardTitleChip>
						</ContentCardTitle>
						<ContentCardSubtitle sx={{ textAlign: 'left' }}>
							{t('loan:select-NFTs.selected-nfts-description')}
						</ContentCardSubtitle>
					</div>
					<Button
						sx={{
							marginLeft: [null, 'auto'],
							marginTop: ['8px', '0px'],
						}}
						variant='dark'
						onClick={async e => {
							e.preventDefault()

							const [, NFTs] = await asyncAction<NFT[]>(
								NiceModal.show(MyNFTsModal, {
									selectedNFTs: getValues('selectedNFTs'),
									title: t('common:my-nfts'),
									addNFTsButtonLabel: t('common:add-nfs-to-loan'),
								} as MyNFTsModalProps)
							)

							if (NFTs) {
								const [defaultCoverNFT] = NFTs
								setValue('selectedNFTs', NFTs)
								setValue('coverNFT', defaultCoverNFT)
							}
						}}
					>
						{t('common:buttons.select-more')}
					</Button>
				</ListOfSelectedNFTsHeader>
				<NFTCardsContainer>
					{getValues('selectedNFTs').map(selectedNFT => {
						return (
							<NFTCard
								key={`${selectedNFT.collectionAddress}_${selectedNFT.tokenId}`}
								{...selectedNFT}
								size='small'
								isCover={
									`${selectedNFT.collectionAddress}_${selectedNFT.tokenId}` ===
									`${selectedCoverNFT.collectionAddress}_${selectedCoverNFT.tokenId}`
								}
								hasCoverSelector
								onCardClick={() => setValue('coverNFT', selectedNFT)}
							/>
						)
					})}
				</NFTCardsContainer>
			</ListOfSelectedNFTsCard>
			{/* Footer Navigation Section */}
			<NavigationFooter
				goBackStep={goBackStep}
				goNextStep={goNextStep}
				isBackButtonDisabled
			/>
		</Flex>
	)
}

const SelectNFTsEmpty = () => {
	const { t } = useTranslation(['common', 'loan'])
	const { setValue, getValues } = useFormContext<LoanFormStepsProps>()

	return (
		<ContentCard>
			<LoanAssetImageContainer>
				<LoanAssetImage />
			</LoanAssetImageContainer>

			<Box sx={{ mb: ['2px'] }}>
				<ContentCardTitle>{t('loan:select-NFTs:question')}</ContentCardTitle>
			</Box>
			<Box sx={{ mb: ['16px'] }}>
				<ContentCardSubtitle>
					{t('loan:select-NFTs:add-instruction')}
				</ContentCardSubtitle>
			</Box>

			<Button
				sx={{ minWidth: ['140px'] }}
				onClick={async e => {
					e.preventDefault()
					const [, NFTs] = await asyncAction<NFT[]>(
						NiceModal.show(MyNFTsModal, {
							selectedNFTs: getValues('selectedNFTs'),
							title: t('common:my-nfts'),
							addNFTsButtonLabel: t('common:add-nfs-to-loan'),
						} as MyNFTsModalProps)
					)

					if (NFTs) {
						const [defaultCoverNFT] = NFTs
						setValue('selectedNFTs', NFTs)
						setValue('coverNFT', defaultCoverNFT)
					}
				}}
				fullWidth
				variant='gradient'
			>
				<Text variant='textSmMedium'>{t('loan:select-NFTs:select-nfts')}</Text>
			</Button>
		</ContentCard>
	)
}

export const SelectNFTs = ({ goNextStep, goBackStep }: SelectNFTProps) => {
	const { watch } = useFormContext<LoanFormStepsProps>()
	const watchSelectedNFTs = watch('selectedNFTs')

	return !watchSelectedNFTs.length ? (
		<SelectNFTsEmpty />
	) : (
		<ListOfSelectedNFTs goBackStep={goBackStep} goNextStep={goNextStep} />
	)
}
