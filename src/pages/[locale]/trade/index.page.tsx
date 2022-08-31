import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import TradeAssetImage from 'assets/images/TradeAsset'
import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'

import Button from 'components/ui/button/Button'
import { Page } from 'components/ui/page'
import { LayoutContainer } from 'components/ui/layout'
import MobileSteps from 'components/ui/mobile-steps/MobileSteps'
import Steps from 'components/ui/steps/Steps'
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
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic'

const getStaticProps = makeStaticProps(['common', 'trade'])
export { getStaticPaths, getStaticProps }

export default function Trade() {
	const [selectedNFTs, setSelectedNFTs] = React.useState<NFT[]>([])
	const { handleModal } = React.useContext(ModalContext)

	const onAddNFTs = (NFTs: NFT[]) => {
		setSelectedNFTs(NFTs)
		handleModal?.(null)
	}

	const { t } = useTranslation(['common', 'trade'])

	const stepLabels: Array<string> = t('trade:steps', { returnObjects: true })
	const [steps] = useState([
		{
			id: 0,
			label: stepLabels[0],
			highlighted: true,
			checked: true,
		},
		{
			id: 1,
			label: stepLabels[1],
			highlighted: false,
			checked: false,
		},
		{
			id: 2,
			label: stepLabels[2],
			highlighted: false,
			checked: false,
		},
		{
			id: 3,
			label: stepLabels[3],
			highlighted: false,
			checked: false,
		},
	])

	return (
		<Page title={t('common:title')}>
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
							<HeaderTitle>{t('trade:title')}</HeaderTitle>
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
								<ContentCardTitle>{t('trade:question')}</ContentCardTitle>
							</Box>
							<Box sx={{ mb: ['16px'] }}>
								<ContentCardSubtitle>{t('trade:add-instruction')}</ContentCardSubtitle>
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
								<Text variant='textSmMedium'>{t('trade:select-nfts')}</Text>
							</Button>
						</ContentCard>
					</BodyContainer>
				</Container>
			</LayoutContainer>
		</Page>
	)
}
