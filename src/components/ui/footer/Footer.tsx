import React from 'react'

import { IconButton } from 'theme-ui'
import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { TwitterIcon, DiscordIcon } from 'assets/icons/social'
import Link from 'next/link'
import * as ROUTES from 'constants/routes'
import {
	LightText,
	LinkText,
	Content,
	FooterWrapper,
	LitepaperText,
	RightFooterSection,
	LeftFooterSection,
	LinksContainer,
	SocialActionContainer,
	TradeMarkContainer,
	ProductDescriptionContainer,
} from './Footer.styled'
import { Button } from '../button'

function Footer() {
	return (
		<FooterWrapper>
			<Content>
				<LeftFooterSection>
					<IlliquidlyFooterLogo width='141px' height='42.89px' />
					<ProductDescriptionContainer>
						<LightText>
							The first NFT P2P trading platform and tooling to enter the Cosmos!
							Trade, Raffle & Collateralise your NFTs to unlock new potential for your
							collections.
						</LightText>
					</ProductDescriptionContainer>

					<SocialActionContainer>
						<Button
							onClick={() => window.open(ROUTES.GITBOOK, '_blank')}
							variant='primary'
							size='small'
						>
							<LitepaperText>Litepaper</LitepaperText>
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
					</SocialActionContainer>
				</LeftFooterSection>

				<RightFooterSection>
					<LinksContainer>
						<Link href={ROUTES.DASHBOARD}>
							<LinkText>Dashboard</LinkText>
						</Link>
						<Link href={ROUTES.TRADE}>
							<LinkText>Trade</LinkText>
						</Link>
						<Link href={ROUTES.SEND}>
							<LinkText>Send</LinkText>
						</Link>
						<Link href={ROUTES.LOANS}>
							<LinkText>Loans</LinkText>
						</Link>
						<Link href={ROUTES.RAFFLES}>
							<LinkText>Raffles</LinkText>
						</Link>
					</LinksContainer>

					<TradeMarkContainer>
						<LightText>© 2022 Illiquidly Labs</LightText>
					</TradeMarkContainer>
				</RightFooterSection>
			</Content>
		</FooterWrapper>
	)
}

export default Footer
