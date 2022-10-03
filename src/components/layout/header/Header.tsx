import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { Flex } from 'theme-ui'
import { Link } from 'components/link'
import * as ROUTES from 'constants/routes'
import useHeaderActions from 'hooks/useHeaderActions'
import { ConnectButton } from 'components/shared'
import { LayoutContainer } from '../layout'
import { HeaderWrapper } from './Header.styled'

function Header() {
	const headerActions = useHeaderActions()

	return (
		<HeaderWrapper as='header'>
			<LayoutContainer>
				<Flex sx={{ justifyContent: 'space-between' }}>
					<Link href={ROUTES.TRADE_LISTINGS}>
						<IlliquidlyFooterLogo />
					</Link>
					{headerActions || <ConnectButton />}
				</Flex>
			</LayoutContainer>
		</HeaderWrapper>
	)
}

export default Header
