import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const ModalContainer = styled.div`
	display: flex;
	width: 100%;
	min-height: 100%;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.7);
	padding: 16px;
	align-items: center;
	justify-content: center;
`

export const ModalContent = styled.div`
	flex: 1;
	display: flex;
	padding: 24px 24px 28px;
	flex-direction: column;
	border-radius: 12px;
	border: 1px solid transparent;
	position: relative;
	overflow: hidden;
	margin-top: 80px;
	max-width: 384px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06),
		0px 4px 6px -1px rgba(0, 0, 0, 0.08);
	background: ${props => props.theme.colors.dark100};
`

export const HeaderErrorIconContainer = styled(Flex)`
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	border-radius: 100%;
	background: rgba(255, 255, 255, 0.1);
`

export const HeaderSuccessIconContainer = styled(HeaderErrorIconContainer)`
	background: ${props => props.theme.colors.success400};
`

export const Title = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 34px;

	color: ${props => props.theme.colors.gray1000};
`

export const Subtitle = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: ${props => props.theme.colors.gray700};
	word-break: break-word;
`

export const TxHashText = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 20px;

	text-decoration-line: underline;

	cursor: pointer;

	color: ${props => props.theme.colors.gray1000};
`

export const TxHashContainer = styled(Flex)`
	width: 100%;

	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 12px;

	border-radius: 4px;

	background: ${props => props.theme.colors.dark400};
`

export const DividerLine = styled.div`
	display: flex;
	width: 100%;
	height: 1px;

	background: rgba(255, 255, 255, 0.1);
`

export const CompleteSectionTitle = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;

	color: ${props => props.theme.colors.dark500};
`

export const CompleteSectionSubtitle = styled(CompleteSectionTitle)`
	color: ${props => props.theme.colors.gray1000};
`

export const CompleteSectionTxHash = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	text-decoration-line: underline;

	cursor: pointer;

	color: ${props => props.theme.colors.primary100};
`
