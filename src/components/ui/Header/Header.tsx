import { ConnectType, useWallet, WalletStatus } from '@illiquid-labs/use-wallet'
import React from 'react'
import * as ROUTES from 'constants/routes'
import IlliqudityLogo from 'theme/assets/logo_new.svg'
import WalletIcon from 'theme/icons/wallet.svg'
import Twitter from 'theme/icons/twitter.svg'
import Discord from 'theme/icons/discord.svg'
import Github from 'theme/icons/github.svg'
import Gitbook from 'theme/icons/gitbook.svg'
import Close from 'theme/icons/close.svg'
import Hamburger from 'theme/icons/hamburger.svg'

import { useMediaQuery } from 'react-responsive'
import { Flex } from 'rebass'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	ConnectionButton,
	ConnectionButtonText,
	ContentSection,
	HeaderContainer,
	IconLink,
	LinkText,
	LogoContainer,
	QuickLinksSection,
} from './Header.styled'

function Header() {
	const { status, connect, disconnect } = useWallet()

	const router = useRouter()
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

	const handleConnect = () => {
		if (isMobile) {
			connect(ConnectType.WALLETCONNECT)
			return
		}

		connect()
	}

	const [isMenuOpen, setIsMenuOpen] = React.useState(false)

	const closeMenu = () => {
		setIsMenuOpen(false)
	}
	const openMenu = () => {
		setIsMenuOpen(true)
	}

	React.useEffect(() => {
		const resize = () => {
			if (window.innerWidth > 1010) closeMenu()
		}

		window.addEventListener('resize', resize)

		return () => window.removeEventListener('resize', resize)
	}, [])

	React.useEffect(() => {
		closeMenu()
	}, [router.asPath])

	return (
		<>
			<HeaderContainer>
				<Link href='/'>
					<LogoContainer>
						<IlliqudityLogo />
					</LogoContainer>
				</Link>

				{!isMobile && (
					<>
						<QuickLinksSection>
							<IconLink href={ROUTES.TWITTER} target='_blank' rel='noreferrer'>
								<Twitter />
							</IconLink>
							<IconLink href={ROUTES.DISCORD} target='_blank' rel='noreferrer'>
								<Discord />
							</IconLink>
							<IconLink href={ROUTES.GITHUB} target='_blank' rel='noreferrer'>
								<Github />
							</IconLink>
							<IconLink href={ROUTES.GITBOOK} target='_blank' rel='noreferrer'>
								<Gitbook />
							</IconLink>
						</QuickLinksSection>

						<ContentSection>
							<Link href='/migrate'>
								<LinkText checked={router.pathname === '/migrate'}>
									migrate NFTs
								</LinkText>
							</Link>

							<Link href='/migrate/claim'>
								<LinkText checked={router.pathname === '/migrate/claim'}>
									my migrations
								</LinkText>
							</Link>

							<Link href='/migrate/all-migrations'>
								<LinkText checked={router.pathname === '/migrate/all-migrations'}>
									see all migrations
								</LinkText>
							</Link>
						</ContentSection>
					</>
				)}

				<Flex marginLeft='auto'>
					<Flex marginLeft={[12, 0]}>
						<ConnectionButton
							disabled={status === WalletStatus.INITIALIZING}
							onClick={() =>
								status === WalletStatus.WALLET_NOT_CONNECTED
									? handleConnect()
									: disconnect()
							}
						>
							<Flex alignItems='center'>
								<WalletIcon />
								<ConnectionButtonText>
									{status === WalletStatus.WALLET_NOT_CONNECTED && 'connect'}
									{status === WalletStatus.INITIALIZING && 'initializing...'}
									{status === WalletStatus.WALLET_CONNECTED && 'disconnect'}
								</ConnectionButtonText>
							</Flex>
						</ConnectionButton>
						{isMobile && (
							<Flex
								marginLeft='12px'
								marginRight='4px'
								alignItems='center'
								justifyContent='center'
								type='button'
								onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
							>
								{isMenuOpen ? <Close color='#e5ecf5' /> : <Hamburger color='#e5ecf5' />}
							</Flex>
						)}
					</Flex>
				</Flex>
			</HeaderContainer>
			{isMobile && isMenuOpen && (
				<Flex
					width='100%'
					height='100%'
					style={{ position: 'fixed', bottom: 0, left: 0, right: 0, top: '64px' }}
				>
					<Flex
						padding={24}
						backgroundColor='#18283d'
						flex={2}
						flexDirection='column'
						style={{ boxShadow: '0px 4px 20px 3px rgb(137 168 207 / 35%)' }}
					>
						<Link href='/migrate'>
							<LinkText checked={router.pathname === '/migrate'}>
								migrate NFTs
							</LinkText>
						</Link>

						<Link href='/migrate/claim'>
							<LinkText checked={router.pathname === '/migrate/claim'}>
								my migrations
							</LinkText>
						</Link>

						<Link href='/migrate/all-migrations'>
							<LinkText checked={router.pathname === '/migrate/all-migrations'}>
								see all migrations
							</LinkText>
						</Link>

						<QuickLinksSection>
							<IconLink href={ROUTES.TWITTER} target='_blank' rel='noreferrer'>
								<Twitter />
							</IconLink>
							<IconLink href={ROUTES.DISCORD} target='_blank' rel='noreferrer'>
								<Discord />
							</IconLink>
							<IconLink href={ROUTES.GITHUB} target='_blank' rel='noreferrer'>
								<Github />
							</IconLink>
							<IconLink href={ROUTES.GITBOOK} target='_blank' rel='noreferrer'>
								<Gitbook />
							</IconLink>
						</QuickLinksSection>
					</Flex>
					<Flex flex={1} onClick={closeMenu} />
				</Flex>
			)}
		</>
	)
}

export default Header
