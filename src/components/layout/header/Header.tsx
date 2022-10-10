import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { Box, Flex, IconButton } from 'theme-ui'
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
import { BurgerMenuIcon, CloseIcon } from 'assets/icons/mixed'
import useIsTablet from 'hooks/react/useIsTablet'
import React from 'react'
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

	React.useEffect(() => {
		// Close on resize
		if (!isTablet) {
			setMenuOpen(false)
		}
	}, [isTablet])

	return (
		<HeaderWrapper as='header'>
			<LayoutContainer>
				<Flex>
					<Box
						sx={{
							cursor: 'pointer',
							maxWidth: ['127px', '141px'],
							maxHeight: ['38.63px', '42.89px'],
						}}
					>
						<Link href={ROUTES.TRADE_LISTINGS}>
							<IlliquidlyFooterLogo width='100%' height='100%' />
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
							<HeaderDropdownItem>
								<Link href={ROUTES.DASHBOARD}>
									<LinkContent>
										<LogoVkMusicOutlineIcon />
										<LinkText>{t('links.dashboard')}</LinkText>
									</LinkContent>
								</Link>
							</HeaderDropdownItem>
							<HeaderDropdownItem>
								<Link href={ROUTES.TRADE_LISTINGS}>
									<LinkContent>
										<TradeIcon />
										<LinkText>{t('links.trade')}</LinkText>
									</LinkContent>
								</Link>
							</HeaderDropdownItem>
							<HeaderDropdownItem>
								<Link href={ROUTES.SEND}>
									<LinkContent>
										<ArrowShapeRightOutlineIcon />
										<LinkText>{t('links.send')}</LinkText>
									</LinkContent>
								</Link>
							</HeaderDropdownItem>
							<HeaderDropdownItem>
								<Link href={ROUTES.LOANS}>
									<LinkContent>
										<WalletOutlineIcon />
										<LinkText>{t('links.loans')}</LinkText>
									</LinkContent>
								</Link>
							</HeaderDropdownItem>
							<HeaderDropdownItem>
								<Link href={ROUTES.RAFFLES}>
									<LinkContent>
										<TicketOutlineIcon />
										<LinkText>{t('links.raffles')}</LinkText>
									</LinkContent>
								</Link>
							</HeaderDropdownItem>
						</Flex>
					</HeaderDropdown>
				</HeaderDropdownContainer>
			)}
		</HeaderWrapper>
	)
}

export default Header
