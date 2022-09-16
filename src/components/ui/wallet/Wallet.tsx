import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const StyledWallet = styled(Flex)`
	border-radius: 8px;
	flex-direction: column;
	gap: 2px;
	width: 100%;
	position: relative;
	overflow: hidden;
`

export const StyledWalletItem = styled(Flex)`
	gap: 4px;
	background-color: ${props => props.theme.colors.dark300};
	width: 100%;
	height: 40px;
	align-items: center;
	padding: 8px;
	font-size: 14px;
	line-height: 16px;
	color: ${props => props.theme.colors.gray600};
`

export function Wallet({ children, ...props }) {
	return <StyledWallet {...props}>{children}</StyledWallet>
}

export function WalletItem({ children, ...props }) {
	return <StyledWalletItem {...props}>{children}</StyledWalletItem>
}
