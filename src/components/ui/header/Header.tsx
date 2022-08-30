import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { Flex } from 'theme-ui'
import { ConnectButton } from '../connect-button'
// import { Button } from '../button'
import { LayoutContainer } from '../layout'
import { HeaderWrapper } from './Header.styled'

function Header() {
	return (
		<HeaderWrapper as='header'>
			<LayoutContainer>
				<Flex sx={{ justifyContent: 'space-between' }}>
					<IlliquidlyFooterLogo />
					{/* <Button variant='secondary' size='medium' href='/home'>
						Exit Create Listing
					</Button> */}
					<ConnectButton />
				</Flex>
			</LayoutContainer>
		</HeaderWrapper>
	)
}

export default Header
