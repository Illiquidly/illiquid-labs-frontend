import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { Box, Flex } from 'theme-ui'
import { Link } from 'components/link'
import * as ROUTES from 'constants/routes'
import useHeaderActions from 'hooks/useHeaderActions'
import { ConnectButton } from 'components/shared'
import { useTranslation } from 'next-i18next'
import {
	ArrowShapeRightOutlineIcon,
	LogoVkMusicOutlineIcon,
	TicketOutlineIcon,
} from 'assets/icons/20ptOutline'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import { WalletOutlineIcon } from 'assets/icons/24ptOutline'
import { LayoutContainer } from '../layout'
import {
	HeaderWrapper,
	LinkContent,
	LinksContainer,
	LinkText,
} from './Header.styled'

function Header() {
	const headerActions = useHeaderActions()
	const { t } = useTranslation(['common'])

	return (
		<HeaderWrapper as='header'>
			<LayoutContainer>
				<Flex>
					<Box sx={{ cursor: 'pointer' }}>
						<Link href={ROUTES.TRADE_LISTINGS}>
							<IlliquidlyFooterLogo />
						</Link>
					</Box>
					<LinksContainer>
						<Link href={ROUTES.DASHBOARD}>
							<LinkContent>
								<LinkText>{t('links.dashboard')}</LinkText>
								<LogoVkMusicOutlineIcon />
							</LinkContent>
						</Link>
						<Link href={ROUTES.TRADE_LISTINGS}>
							<LinkContent>
								<LinkText>{t('links.trade')}</LinkText>
								<TradeIcon />
							</LinkContent>
						</Link>
						<Link href={ROUTES.SEND}>
							<LinkContent>
								<LinkText>{t('links.send')}</LinkText>
								<ArrowShapeRightOutlineIcon />
							</LinkContent>
						</Link>
						<Link href={ROUTES.LOANS}>
							<LinkContent>
								<LinkText>{t('links.loans')}</LinkText>
								<WalletOutlineIcon />
							</LinkContent>
						</Link>
						<Link href={ROUTES.RAFFLES}>
							<LinkContent>
								<LinkText>{t('links.raffles')}</LinkText>
								<TicketOutlineIcon />
							</LinkContent>
						</Link>
					</LinksContainer>
					<Flex
						sx={{
							marginLeft: 'auto',
						}}
					>
						{headerActions || <ConnectButton />}
					</Flex>
				</Flex>
			</LayoutContainer>
		</HeaderWrapper>
	)
}

export default Header
