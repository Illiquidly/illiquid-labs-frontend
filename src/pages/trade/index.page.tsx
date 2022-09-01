import TradeAssetImage from 'assets/images/TradeAsset'
import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'
import Button from 'components/ui/button/Button'
import { LayoutContainer } from 'components/ui/layout'
import MobileSteps from 'components/ui/mobile-steps/MobileSteps'
import Steps from 'components/ui/steps/Steps'
import React from 'react'
import { ModalContext } from 'context/modalContext'
import { Box, Text } from 'theme-ui'
import { MyNFTsModal } from 'components/ui/my-nfts-modal'
import { NFT } from 'services/api/walletNFTsService'
import {
	BodyContainer,
	Container,
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	HeaderContainer,
	HeaderSubtitleContainer,
	HeaderTitle,
	HeaderTitleContainer,
	MobileStepsWrapper,
	StepsWrapper,
	TradeAssetImageContainer,
	TradeBackgroundBlobContainer,
	TradeBackgroundLogoContainer,
} from './trade.styled'

export default function Trade() {
	const [selectedNFTs, setSelectedNFTs] = React.useState<NFT[]>([])
	const { handleModal } = React.useContext(ModalContext)

	const onAddNFTs = (NFTs: NFT[]) => {
		setSelectedNFTs(NFTs)
		handleModal?.(null)
	}

	const [steps] = React.useState([
		{
			id: 0,
			label: 'Select NFTs',
			highlighted: true,
			checked: true,
		},
		{
			id: 1,
			label: 'Trade details',
			highlighted: false,
			checked: false,
		},
		{
			id: 2,
			label: 'Choose visibility',
			highlighted: false,
			checked: false,
		},
		{
			id: 3,
			label: 'Confirm listing',
			highlighted: false,
			checked: false,
		},
	])

	return (
		<LayoutContainer>
			<TradeBackgroundLogoContainer>
				<TradeBackgroundLogo />
			</TradeBackgroundLogoContainer>
			<TradeBackgroundBlobContainer>
				<TradeBackgroundBlob />
			</TradeBackgroundBlobContainer>
			<Container>
				<HeaderContainer>
					<HeaderTitleContainer>
						<HeaderTitle>Trade NFTs</HeaderTitle>
					</HeaderTitleContainer>
					{/* Only Mobile And Tablet */}
					<HeaderSubtitleContainer>
						<Text color='gray1000' variant='textMdBold'>
							1/4
						</Text>
					</HeaderSubtitleContainer>
				</HeaderContainer>

				<BodyContainer>
					<MobileStepsWrapper>
						<MobileSteps steps={steps} />
					</MobileStepsWrapper>

					{/* Only on Laptop and Desktop */}
					<StepsWrapper>
						<Steps steps={steps} />
					</StepsWrapper>

					<ContentCard>
						<TradeAssetImageContainer>
							<TradeAssetImage />
						</TradeAssetImageContainer>

						<Box sx={{ mb: ['2px'] }}>
							<ContentCardTitle>Which NFTs are you looking to trade</ContentCardTitle>
						</Box>
						<Box sx={{ mb: ['16px'] }}>
							<ContentCardSubtitle>
								Add them here by clicking below
							</ContentCardSubtitle>
						</Box>

						<Button
							sx={{ minWidth: ['140px'] }}
							onClick={() =>
								handleModal?.(
									<MyNFTsModal selectedNFTs={selectedNFTs} onAddNFTs={onAddNFTs} />
								)
							}
							fullWidth
							variant='gradient'
						>
							<Text variant='textSmMedium'>Select NFTs</Text>
						</Button>
					</ContentCard>
				</BodyContainer>
			</Container>
		</LayoutContainer>
	)
}
