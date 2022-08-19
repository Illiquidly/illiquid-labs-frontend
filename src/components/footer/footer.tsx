import React from 'react'

import { Box, Flex } from 'theme-ui'
import IlliquidlyFooterLogo from 'assets/images/footer_logo'
import {TwitterIcon, DiscordIcon} from 'assets/icons/social'
import { Container, LightText, LogoContainer, MenuContainer, FooterSubContainer, IlliquidlyText, MenuBox, MenuBoxText, FooterContainer, CenteredFlex, LitePaperButton } from "./footer.styled"


export default function Footer(){
	return (
		<FooterContainer>
			<FooterSubContainer>
				<LogoContainer>
					<IlliquidlyFooterLogo />
					<IlliquidlyText>
						The first NFT P2P trading platform and tooling to enter the Cosmos! Trade, Raffle & Collateralise your NFTs to unlock new potential for your collections. 
					</IlliquidlyText>
				</LogoContainer>
				<Box>
					<MenuContainer>
						<MenuBox>
							<MenuBoxText>
								Dashboard
							</MenuBoxText>
						</MenuBox>
						<MenuBox>
							<MenuBoxText>
								Trade
							</MenuBoxText>
						</MenuBox>
						<MenuBox>
							<MenuBoxText>
								Send
							</MenuBoxText>
						</MenuBox>
						<MenuBox>
							<MenuBoxText>
								Loans
							</MenuBoxText>
						</MenuBox>
						<MenuBox>
							<MenuBoxText>
								Raffles
							</MenuBoxText>
						</MenuBox>
					</MenuContainer>
				</Box>	
			</FooterSubContainer>
			<FooterSubContainer>
				<CenteredFlex>
					<LitePaperButton variant='primary' size='small'>Litepaper</LitePaperButton>
					<TwitterIcon/>
					<DiscordIcon/>
				</CenteredFlex>
				<Box>
					<LightText>
						© 2022 Illiquidly Labs
					</LightText>
				</Box>
			</FooterSubContainer>
		</FooterContainer>
	)

}
