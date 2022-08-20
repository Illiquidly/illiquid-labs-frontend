import { CheckLineIcon } from 'assets/icons/24pt'
import TradeAssetImage from 'assets/images/TradeAsset'
import Button from 'components/ui/Button/Button'
import Card from 'components/ui/Card/Card'
import MobileSteps from 'components/ui/MobileSteps/MobileSteps'
import Steps from 'components/ui/Steps/Steps'
import React, { useState } from 'react'
import { Flex, Text, Box } from 'theme-ui'
import {
	CardSubtitle,
	CardTitle,
	Circle,
	Container,
	Title,
} from './trade.styled'

export default function Trade() {
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
		<Container>
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
				<MobileSteps steps={steps} />
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
				{/* Only on Laptop and Desktop */}
				<Flex
					sx={{
						display: ['none', 'none', 'flex'],
						mr: '32px',
						maxWidth: '244px',
						alignItems: 'flex-start',
						flex: 1,
					}}
				>
					<Steps steps={steps} />
				</Flex>

				<Card
					sx={{
						p: ['32px 28px', '52px 58px', '32px 28px', '52px 84px'],
						alignItems: 'center',
						borderRadius: '12px !important',
					}}
				>
					<Box sx={{ mb: '7px' }}>
						<TradeAssetImage />
					</Box>

					<Box sx={{ mb: ['2px'] }}>
						<CardTitle>Which NFTs are you looking to trade</CardTitle>
					</Box>
					<Box sx={{ mb: ['16px'] }}>
						<CardSubtitle>Add them here by clicking below</CardSubtitle>
					</Box>

					<Flex sx={{ width: ['140px'] }}>
						<Button sx={{ p: ['12px 0', '10px 0'] }} fullWidth variant='gradient'>
							<Text variant='textSmMedium'>Select NFTs</Text>
						</Button>
					</Flex>
				</Card>
			</Flex>
		</Container>
	)
}
