import { useTranslation } from 'next-i18next'
import { DiscordIcon, TwitterIcon } from 'assets/icons/social'
import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import * as ROUTES from 'constants/routes'
import { IconButton } from 'theme-ui'
import { Link } from '../../link'
import { Button } from '../../ui/button'
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
	const { t } = useTranslation('common')

	return (
		<FooterWrapper>
			<LayoutContainer>
				<Content>
					<LeftFooterSection>
						<IlliquidlyFooterLogo />
						<LightText sx={{ margin: '16px 0 40px' }}>{t('description')}</LightText>

						<SocialActionContainer>
							<Button
								onClick={() => window.open(ROUTES.GITBOOK, '_blank')}
								variant='primary'
								size='small'
							>
								<LitepaperText>{t('litepaper')}</LitepaperText>
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
								<LinkText>{t('links.dashboard')}</LinkText>
							</Link>
							<Link href={ROUTES.TRADE_LISTINGS}>
								<LinkText>{t('links.trade')}</LinkText>
							</Link>
							<Link href={ROUTES.SEND}>
								<LinkText>{t('links.send')}</LinkText>
							</Link>
							<Link href={ROUTES.LOANS}>
								<LinkText>{t('links.loans')}</LinkText>
							</Link>
							<Link href={ROUTES.RAFFLES}>
								<LinkText>{t('links.raffles')}</LinkText>
							</Link>
						</LinksContainer>

						<TradeMarkContainer>
							<LightText>{t('trademark')}</LightText>
						</TradeMarkContainer>
					</RightFooterSection>
				</Content>
			</LayoutContainer>
		</FooterWrapper>
	)
}

export default Footer