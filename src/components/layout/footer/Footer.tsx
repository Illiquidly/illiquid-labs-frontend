import { useTranslation } from 'next-i18next'
import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import * as ROUTES from 'constants/routes'
import { Box, Flex, IconButton } from 'theme-ui'
import { DiscordIcon, TwitterIcon } from 'assets/icons/mixed'
import moment from 'moment'
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
						<Box
							sx={{
								cursor: 'pointer',
								maxWidth: ['127px', '161px'],
								maxHeight: ['38.63px', '42px'],
							}}
						>
							<Link href={ROUTES.TRADE_LISTINGS}>
								<IlliquidlyFooterLogo width='100%' height='100%' />
							</Link>
						</Box>
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
							<Link href={ROUTES.SEND_TRANSACTIONS}>
								<LinkText>{t('links.send')}</LinkText>
							</Link>
							<Link href={ROUTES.LOAN_LISTINGS}>
								<LinkText>{t('links.loans')}</LinkText>
							</Link>
							<Link href={ROUTES.RAFFLE_LISTINGS}>
								<LinkText>{t('links.raffles')}</LinkText>
							</Link>
							<Link href={ROUTES.MIGRATION}>
								<LinkText>{t('links.migrate')}</LinkText>
							</Link>
						</LinksContainer>

						<Flex
							sx={{
								flexDirection: 'column',
								textAlign: 'end',
								justifyContent: 'flex-end',
							}}
						>
							<LightText>{t('audit')}</LightText>
							<LightText>
								{`${t('click')} `}
								<Box
									onClick={() => window.open(ROUTES.AUDIT, '_blank')}
									as='span'
									sx={{ color: 'primary200', cursor: 'pointer' }}
								>
									{t('here')}
								</Box>
								{` ${t('to-see-reports')}`}
							</LightText>
						</Flex>

						<TradeMarkContainer>
							<LightText>
								{t('trademark', { year: moment().year().toString() })}
							</LightText>
						</TradeMarkContainer>
					</RightFooterSection>
				</Content>
			</LayoutContainer>
		</FooterWrapper>
	)
}

export default Footer
