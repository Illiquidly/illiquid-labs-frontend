import { useContext } from 'react'

import TradeAssetImage from 'assets/images/TradeAsset'
import { Button, MyNFTsModal } from 'components'
import { ModalContext } from 'context'

import { NFTCard } from 'components/ui/nft-card'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex, Text } from 'theme-ui'
import { TradeFormStepsProps } from './formProps'
import { NavigationFooter } from './NavigationFooter'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ListOfSelectedNFTsCard,
	NFTCardsContainer,
	TradeAssetImageContainer,
} from './SelectNFTs.styled'

const SelectNFTsEmpty = () => {
	const { t } = useTranslation(['common', 'trade'])
	const { handleModal } = useContext(ModalContext)

	const { setValue, getValues } = useFormContext<TradeFormStepsProps>()

	const onAddNFTs = (NFTs: NFT[]) => {
		setValue('selectedNFTs', NFTs)
		setValue('coverNFT', NFTs[0])
		handleModal?.(null)
	}

	return (
		<ContentCard>
			<TradeAssetImageContainer>
				<TradeAssetImage />
			</TradeAssetImageContainer>

			<Box sx={{ mb: ['2px'] }}>
				<ContentCardTitle>{t('trade:select-NFTs:question')}</ContentCardTitle>
			</Box>
			<Box sx={{ mb: ['16px'] }}>
				<ContentCardSubtitle>
					{t('trade:select-NFTs:add-instruction')}
				</ContentCardSubtitle>
			</Box>

			<Button
				sx={{ minWidth: ['140px'] }}
				onClick={e => {
					e.preventDefault()
					handleModal?.(
						<MyNFTsModal
							selectedNFTs={getValues('selectedNFTs')}
							onAddNFTs={onAddNFTs}
						/>,
						true
					)
				}}
				fullWidth
				variant='gradient'
			>
				<Text variant='textSmMedium'>{t('trade:select-NFTs:select-nfts')}</Text>
			</Button>
		</ContentCard>
	)
}

interface ListOfSelectedNFTsProps {
	goNextStep: () => void
	goBackStep: () => void
}

const ListOfSelectedNFTs = ({
	goBackStep,
	goNextStep,
}: ListOfSelectedNFTsProps) => {
	const { setValue, getValues, watch } = useFormContext<TradeFormStepsProps>()
	const { t } = useTranslation(['common', 'trade'])
	const { handleModal } = useContext(ModalContext)
	const selectedCoverNFT = watch('coverNFT') || getValues('selectedNFTs')[0]

	// TODO: needs to go out
	const onAddNFTs = (NFTs: NFT[]) => {
		setValue('selectedNFTs', NFTs)
		setValue('coverNFT', NFTs[0])
		handleModal?.(null)
	}

	return (
		<Flex sx={{ flexDirection: 'column', flex: 1 }}>
			<ListOfSelectedNFTsCard>
				<Flex>
					<div>
						<ContentCardTitle sx={{ textAlign: 'left' }}>
							{t('trade:select-NFTs.selected-nfts')}
							<span>
								{t('common:nft', { count: getValues('selectedNFTs').length })}
							</span>
						</ContentCardTitle>
						<ContentCardSubtitle sx={{ textAlign: 'left' }}>
							{t('trade:select-NFTs.selected-nfts-description')}
						</ContentCardSubtitle>
					</div>
					<Button
						sx={{ marginLeft: 'auto' }}
						variant='dark'
						onClick={e => {
							e.preventDefault()
							handleModal?.(
								<MyNFTsModal
									selectedNFTs={getValues('selectedNFTs')}
									onAddNFTs={onAddNFTs}
								/>,
								true
							)
						}}
					>
						{t('common:buttons.select-more')}
					</Button>
				</Flex>
				<NFTCardsContainer>
					{getValues('selectedNFTs').map(selectedNFT => {
						console.log('selecteCoverNFT', selectedCoverNFT)
						return (
							<NFTCard
								key={selectedNFT.tokenId}
								{...selectedNFT}
								size='small'
								isCover={selectedNFT.tokenId === selectedCoverNFT.tokenId}
								onCoverClick={() => setValue('coverNFT', selectedNFT)}
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

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const SelectNFTs = ({ goNextStep, goBackStep }: Props) => {
	const { watch } = useFormContext<TradeFormStepsProps>()
	const watchSelectedNFTs = watch('selectedNFTs')

	return watchSelectedNFTs.length === 0 ? (
		<SelectNFTsEmpty />
	) : (
		<ListOfSelectedNFTs goBackStep={goBackStep} goNextStep={goNextStep} />
	)
}
