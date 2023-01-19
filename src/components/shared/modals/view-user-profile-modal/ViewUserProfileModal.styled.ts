import styled from '@emotion/styled'
import { Img } from 'react-image'
import { Box, Flex } from 'theme-ui'

export const ModalContainer = styled.div`
	display: flex;
	width: 100%;
	min-height: 100%;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.7);
`

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 12px;
	border: 1px solid transparent;
	position: relative;
	overflow: hidden;
	margin-top: 80px;
	background: ${props => props.theme.colors.dark300};
`

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	line-height: 20px;
	height: 59px;
	border-bottom: 1px solid ${props => props.theme.colors.dark500};
	padding: 0 12px;
	background: ${props => props.theme.colors.dark200};
	font-weight: 600;
`

export const ModalBody = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 24px 12px;
	overflow: auto;
	gap: 24px;
`

export const Title = styled.p`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	margin: 0;
	margin-bottom: 4px;

	color: ${props => props.theme.colors.gray1000};
`

export const Subtitle = styled.p`
	font-family: 'Heebo';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	margin: 0;
	color: ${props => props.theme.colors.gray700};
`

export const SectionCard = styled(Flex)`
	padding: 16px;

	background: ${props => props.theme.colors.dark400};
	border-radius: 8px;
`

export const SectionTitle = styled(Box)`
	font-family: 'Heebo';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;

	font-feature-settings: 'salt' on;

	color: ${props => props.theme.colors.gray1000};
`

export const SectionText = styled(Box)`
	font-family: 'Heebo';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;

	font-feature-settings: 'salt' on;

	color: ${props => props.theme.colors.gray600};
`

export const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
	width: 117px;
	height: 117px;
	overflow: hidden;
	background: ${props => props.theme.colors.dark200};
`

export const Image = styled(Img)`
	min-width: 100%;
	min-height: 100%;
`

export const UserTitle = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	font-size: 21px;
	line-height: 30px;

	letter-spacing: -0.02em;
	font-feature-settings: 'salt' on;

	color: ${props => props.theme.colors.natural50};
`

export const WalletAddress = styled.div`
	font-family: 'Heebo';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;

	color: ${props => props.theme.colors.gray1000};
`
