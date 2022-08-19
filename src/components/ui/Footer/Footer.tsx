import React from 'react'

import { Flex, IconButton, Text } from 'theme-ui'
import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { TwitterIcon, DiscordIcon } from 'assets/icons/social'
import Link from 'next/link'
import * as ROUTES from 'constants/routes'
import { LightText, MenuLinkText, Container } from './Footer.styled'
import Button from '../Button/Button'

function Footer() {
	return (
		<Container>
			<Flex
				sx={{ flexDirection: 'column', flex: '1', maxWidth: '399px', mt: '12px' }}
			>
				<IlliquidlyFooterLogo width='141px' height='42.89px' />
				<LightText sx={{ marginTop: '16px' }}>
					The first NFT P2P trading platform and tooling to enter the Cosmos! Trade,
					Raffle & Collateralise your NFTs to unlock new potential for your
					collections.
				</LightText>

				<Flex sx={{ alignItems: 'center', marginTop: '40px', gap: 20 }}>
					<Button
						onClick={() => window.open(ROUTES.GITBOOK, '_blank')}
						variant='primary'
						size='small'
					>
						<Text sx={{ fontSize: '14px' }}>Litepaper</Text>
					</Button>
					<IconButton
						onClick={() => window.open(ROUTES.TWITTER, '_blank')}
						size='24px'
						p={0}
					>
						<TwitterIcon />
					</IconButton>
					<IconButton
						onClick={() => window.open(ROUTES.DISCORD, '_blank')}
						size='28px'
						p={0}
					>
						<DiscordIcon />
					</IconButton>
				</Flex>
			</Flex>

			<Flex
				sx={{
					flex: 1,
					flexDirection: 'column',
					alignItems: 'flex-end',
					mt: '14px',
				}}
			>
				<Flex sx={{ gap: '32px', mr: '17px' }}>
					<Link href={ROUTES.DASHBOARD}>
						<MenuLinkText>Dashboard</MenuLinkText>
					</Link>
					<Link href={ROUTES.TRADE}>
						<MenuLinkText>Trade</MenuLinkText>
					</Link>
					<Link href={ROUTES.SEND}>
						<MenuLinkText>Send</MenuLinkText>
					</Link>
					<Link href={ROUTES.LOANS}>
						<MenuLinkText>Loans</MenuLinkText>
					</Link>
					<Link href={ROUTES.RAFFLES}>
						<MenuLinkText>Raffles</MenuLinkText>
					</Link>
				</Flex>

				<Flex sx={{ marginTop: 'auto', marginBottom: '8px' }}>
					<LightText>© 2022 Illiquidly Labs</LightText>
				</Flex>
			</Flex>
		</Container>
	)
}

export default Footer
