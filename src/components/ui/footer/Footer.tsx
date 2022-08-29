import { DiscordIcon, TwitterIcon } from 'assets/icons/social'
import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import * as ROUTES from 'constants/routes'
import Link from 'next/link'
import { IconButton } from 'theme-ui'
import { Button } from '../button'
import { LayoutContainer } from '../layout'
import {
	Content,
	FooterWrapper,
	LeftFooterSection,
	LightText,
	LinksContainer,
	LinkText,
	LitepaperText,
	RightFooterSection,
	SocialActionContainer,
	TradeMarkContainer,
} from './Footer.styled'

function Footer() {
	return (
		<FooterWrapper>
			<LayoutContainer>
				<Content>
					<LeftFooterSection>
						<IlliquidlyFooterLogo />
						<LightText sx={{ margin: '16px 0 40px' }}>
							The first NFT P2P trading platform and tooling to enter the Cosmos!
							Trade, Raffle & Collateralise your NFTs to unlock new potential for your
							collections.
						</LightText>

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
			</LayoutContainer>
		</FooterWrapper>
	)
}

export default Footer
