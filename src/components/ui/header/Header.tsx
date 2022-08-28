import IlliquidlyFooterLogo from 'assets/images/IlliquidLabsLogo'
import { Button } from '../button'
import { LayoutContainer } from '../layout'
import { HeaderWrapper } from './Header.styled'

function Header() {
	return (
		<HeaderWrapper>
			<LayoutContainer>
				<IlliquidlyFooterLogo />
				<Button variant='secondary' size='small'>
					Exit Create Listing
				</Button>
			</LayoutContainer>
		</HeaderWrapper>
	)
}

export default Header
