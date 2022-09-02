import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Text } from 'theme-ui'

import TradeAssetImage from 'assets/images/TradeAsset'
import TradeBackgroundBlob from 'assets/images/TradeBackgroundBlob'
import TradeBackgroundLogo from 'assets/images/TradeBackgroundLogo'

import {
	Page,
	Button,
	LayoutContainer,
	MobileSteps,
	MyNFTsModal,
	Steps,
} from 'components'
import { ModalContext } from 'context'
import { NFT } from 'services/api/walletNFTsService'
import { getStaticPaths, makeStaticProps } from 'lib'
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
