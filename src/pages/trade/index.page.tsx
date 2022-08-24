import TradeAssetImage from 'assets/images/TradeAsset'
import Button from 'components/ui/button/Button'
import MobileSteps from 'components/ui/mobile-steps/MobileSteps'
import { MyNFTsModal } from 'components/ui/my-nfts-modal'
import Steps from 'components/ui/steps-1/Steps'
import { noop } from 'lodash'
import React, { useState } from 'react'
import { Text, Box } from 'theme-ui'
import {
	ContentCardSubtitle,
	ContentCardTitle,
	Container,
	ContentCard,
	HeaderContainer,
	MobileStepsWrapper,
	StepsWrapper,
	HeaderTitle,
	HeaderTitleContainer,
	HeaderSubtitleContainer,
	TradeAssetImageContainer,
	BodyContainer,
} from './trade.styled'

export default function Trade() {
	const [isModalOpen, setIsModalOpen] = React.useState(false)

	const [steps] = useState([
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
		<>
			<MyNFTsModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				onRemove={noop}
				NFTs={[]}
				selectedNFTs={[]}
			/>
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
							sx={{ p: ['12px 0', '10px 0'], width: ['140px'] }}
							onClick={() => setIsModalOpen(true)}
							fullWidth
							variant='gradient'
						>
							<Text variant='textSmMedium'>Select NFTs</Text>
						</Button>
					</ContentCard>
				</BodyContainer>
			</Container>
		</>
	)
}
