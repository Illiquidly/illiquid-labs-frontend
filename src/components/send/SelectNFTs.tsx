import NiceModal from '@ebay/nice-modal-react'
import SendAssetImage from 'assets/images/TradeAsset'
import { Button, NFTCard } from 'components'
import { MyNFTsModal } from 'components/shared/modals/my-nfts-modal'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex, Text } from 'theme-ui'
import { asyncAction } from 'utils/js/asyncAction'
import { MyNFTsModalProps } from 'components/shared/modals/my-nfts-modal/MyNFTsModal'
import { TradeFormStepsProps } from 'types'
import { NavigationFooter } from 'components/shared/navigation-footer'
import { SendFormStepsProps } from 'types/send'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardTitleChip,
	ListOfSelectedNFTsCard,
	ListOfSelectedNFTsHeader,
	NFTCardsContainer,
	SendAssetImageContainer,
} from './SelectNFTs.styled'

interface ListOfSelectedNFTsProps {
	goNextStep: () => void
	goBackStep: () => void
}

const ListOfSelectedNFTs = ({
	goBackStep,
	goNextStep,
}: ListOfSelectedNFTsProps) => {
	const { setValue, getValues } = useFormContext<SendFormStepsProps>()
	const { t } = useTranslation(['common', 'send'])

	return (
		<Flex sx={{ flexDirection: 'column', flex: 1 }}>
			<ListOfSelectedNFTsCard>
				<ListOfSelectedNFTsHeader>
					<div>
						<ContentCardTitle sx={{ textAlign: 'left' }}>
							{t('send:select-NFTs.selected-nfts')}
							<ContentCardTitleChip>
								{t('common:nft', { count: getValues('selectedNFTs').length })}
							</ContentCardTitleChip>
						</ContentCardTitle>
						<ContentCardSubtitle sx={{ textAlign: 'left' }}>
							{t('send:select-NFTs.selected-nfts-description')}
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
									addNFTsButtonLabel: t('send:select-NFTs.add-nfts-to-send'),
								} as MyNFTsModalProps)
							)

							if (NFTs) {
								setValue(
									'selectedNFTs',
									NFTs.map(nft => ({ ...nft, recipient: '' }))
								)
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
	const { t } = useTranslation(['common', 'send'])
	const { setValue, getValues } = useFormContext<TradeFormStepsProps>()

	return (
		<ContentCard>
			<SendAssetImageContainer>
				<SendAssetImage />
			</SendAssetImageContainer>

			<Box sx={{ mb: ['2px'] }}>
				<ContentCardTitle>{t('send:select-NFTs:question')}</ContentCardTitle>
			</Box>
			<Box sx={{ mb: ['16px'] }}>
				<ContentCardSubtitle>
					{t('send:select-NFTs:add-instruction')}
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
							addNFTsButtonLabel: t('send:select-NFTs.add-nfts-to-send'),
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
				<Text variant='textSmMedium'>{t('send:select-NFTs.select-nfts')}</Text>
			</Button>
		</ContentCard>
	)
}

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const SelectNFTs = ({ goNextStep, goBackStep }: Props) => {
	const { watch } = useFormContext<SendFormStepsProps>()
	const watchSelectedNFTs = watch('selectedNFTs')

	return !watchSelectedNFTs.length ? (
		<SelectNFTsEmpty />
	) : (
		<ListOfSelectedNFTs goBackStep={goBackStep} goNextStep={goNextStep} />
	)
}
