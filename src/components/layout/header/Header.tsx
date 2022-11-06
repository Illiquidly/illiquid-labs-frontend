import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { Box, Flex, IconButton } from 'theme-ui'
import { Link } from 'components/link'
import * as ROUTES from 'constants/routes'
import useHeaderActions from 'hooks/useHeaderActions'
import { ConnectButton } from 'components/shared'
import { useTranslation } from 'next-i18next'
import {
	ArrowShapeRightOutlineIcon,
	DoorArrowRightOutlineIcon,
	LogoVkMusicOutlineIcon,
	TicketOutlineIcon,
} from 'assets/icons/20ptOutline'
import TradeIcon from 'assets/icons/mixed/components/TradeIcon'
import { WalletOutlineIcon } from 'assets/icons/24ptOutline'
import { BurgerMenuIcon, CloseIcon } from 'assets/icons/mixed'
import useIsTablet from 'hooks/react/useIsTablet'
import React from 'react'
import { useRouter } from 'next/router'
import { LayoutContainer } from '../layout'
import {
	HeaderDropdown,
	HeaderDropdownBackdrop,
	HeaderDropdownContainer,
	HeaderDropdownItem,
	HeaderWrapper,
	LinkContent,
	LinksContainer,
	LinkText,
} from './Header.styled'

function Header() {
	const headerActions = useHeaderActions()
	const { t } = useTranslation(['common'])
	const isTablet = useIsTablet()
	const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false)
	const router = useRouter()
	React.useEffect(() => {
		// Close on resize
		if (!isTablet) {
			setMenuOpen(false)
		}
	}, [isTablet])

	const navigationRoutes = [
		{
			route: ROUTES.DASHBOARD,
			name: 'dashboard',
			icon: <LogoVkMusicOutlineIcon />,
		},
		{
			route: ROUTES.TRADE_LISTINGS,
			name: 'trade',
			icon: <TradeIcon />,
		},
		{
			route: ROUTES.SEND_TRANSACTIONS,
			name: 'send',
			icon: <ArrowShapeRightOutlineIcon />,
		},
		{
			route: ROUTES.LOAN_LISTINGS,
			name: 'loans',
			icon: <WalletOutlineIcon />,
		},
		{
			route: ROUTES.RAFFLE_LISTINGS,
			name: 'raffles',
			icon: <TicketOutlineIcon />,
		},
		{
			route: ROUTES.MIGRATION,
			name: 'migrate',
			icon: <DoorArrowRightOutlineIcon />,
		},
	]

	return (
		<HeaderWrapper as='header'>
			<LayoutContainer>
				<Flex>
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
					<LinksContainer>
						{navigationRoutes.map(({ name, route, icon }) => (
							<Link href={route} key={name}>
								<LinkContent
									active={(router.route ?? '')
										.replace('/[locale]/', '')
										.startsWith(name)}
								>
									<LinkText>{t(`links.${name}`)}</LinkText>
									{icon}
								</LinkContent>
							</Link>
						))}
					</LinksContainer>
					<Flex
						sx={{
							marginLeft: 'auto',
							alignItems: 'center',
						}}
					>
						<Flex>{headerActions || <ConnectButton />}</Flex>
						<Flex sx={{ marginLeft: '14px', display: ['flex', 'flex', 'none'] }}>
							<IconButton
								sx={{ padding: 0 }}
								onClick={() => setMenuOpen(isOpen => !isOpen)}
							>
								{isMenuOpen ? (
									<CloseIcon width='16px' height='16px' />
								) : (
									<BurgerMenuIcon />
								)}
							</IconButton>
						</Flex>
					</Flex>
				</Flex>
			</LayoutContainer>
			{isMenuOpen && (
				<HeaderDropdownContainer>
					<HeaderDropdownBackdrop onClick={() => setMenuOpen(false)} />
					<HeaderDropdown>
						<Flex onClick={() => setMenuOpen(false)} sx={{ flexDirection: 'column' }}>
							{navigationRoutes.map(({ name, route, icon }) => (
								<HeaderDropdownItem key={name}>
									<Link href={route}>
										<LinkContent
											style={{ width: '100%', height: '100%', padding: '0 25px' }}
										>
											{icon}
											<LinkText>{t(`links.${name}`)}</LinkText>
										</LinkContent>
									</Link>
								</HeaderDropdownItem>
							))}
						</Flex>
					</HeaderDropdown>
				</HeaderDropdownContainer>
			)}
		</HeaderWrapper>
	)
}

export default Header
