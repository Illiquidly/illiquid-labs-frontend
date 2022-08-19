import { CheckLineIcon } from 'assets/icons/24pt'
import TradeAssetImage from 'assets/images/TradeAsset'
import Button from 'components/ui/Button/Button'
import Card from 'components/ui/Card/Card'
import ProgressTabs from 'components/ui/ProgressTabs/ProgressTabs'
import Steps from 'components/ui/Steps/Steps'
import React from 'react'
import { Flex, Text, Box } from 'theme-ui'
import { Circle, Container, Title } from './trade.styled'

export default function Trade() {
	return (
		<Container>
			<Box>
				<Flex
					mb={['16px', '16px', '24px']}
					sx={{
						height: ['48px'],
						padding: ['0 0.5px', '0'],
					}}
				>
					<Flex sx={{ alignItems: ['initial', 'initial', 'center'] }}>
						<Title>Trade NFTs</Title>
					</Flex>
					{/* Only Mobile And Tablet */}
					<Box
						ml='auto'
						sx={{ display: ['block', 'block', 'none'], alignSelf: 'center' }}
					>
						<Text color='gray1000' variant='textMdBold'>
							1/4
						</Text>
					</Box>
				</Flex>
				{/* Only Mobile And Tablet */}

				<Box
					sx={{ display: ['block', 'block', 'none'], padding: ['0 0.5px', '0'] }}
					mb={['13px']}
				>
					<ProgressTabs steps={4} currentStep={1} />
				</Box>

				<Flex sx={{ flexDirection: ['column', 'column', 'row'], px: '0.5px' }}>
					{/*  Mobile and Tablet */}
					<Card
						mb={['12px', '32px']}
						sx={{ p: ['16px 12px'], display: ['flex', 'flex', 'none'] }}
					>
						<Flex sx={{ alignItems: 'center' }}>
							<Flex sx={{ alignItems: 'center', mr: ['12px'] }}>
								<Circle>
									<CheckLineIcon fill='#fff' />
								</Circle>
							</Flex>
							<Text color='gray1000' variant='textMdSemibold'>
								Select NFTs
							</Text>
						</Flex>
					</Card>
					{/* Only on Desktop */}
					<Flex
						sx={{
							display: ['none', 'none', 'flex'],
							mr: '32px',
							maxWidth: '244px',
							alignItems: 'flex-start',
							flex: 1,
						}}
					>
						<Steps
							steps={[
								{
									id: 0,
									label: 'Select NFTs',
									highlighted: true,
									checked: false,
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
							]}
						/>
					</Flex>

					<Card
						sx={{
							p: ['32px 28px', '52px 58px', '32px 28px', '52px 84px'],
							alignItems: 'center',
							flexDirection: 'column',
						}}
						css={{
							borderRadius: '12px !important',
						}}
					>
						<Box sx={{ marginBottom: '7px' }}>
							<TradeAssetImage />
						</Box>
						<Text
							as='div'
							variant='textXlSemibold'
							sx={{ lineHeight: '32px', mb: ['2px'], textAlign: 'center' }}
							color='neutral50'
						>
							Which NFTs are you looking to trade
						</Text>

						<Text
							as='div'
							variant='textSmRegular'
							color='gray700'
							sx={{ lineHeight: '20px', mb: ['16px'], textAlign: 'center' }}
						>
							Add them here by clicking below
						</Text>

						<Flex sx={{ width: ['140px'] }}>
							<Button
								sx={{ padding: ['12px 0', '10px 0'] }}
								fullWidth
								variant='gradient'
							>
								<Text variant='textSmMedium'>Select NFTs</Text>
							</Button>
						</Flex>
					</Card>
				</Flex>
			</Box>
		</Container>
	)
}
