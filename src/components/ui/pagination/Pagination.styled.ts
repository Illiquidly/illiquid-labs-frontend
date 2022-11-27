import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'

export const Container = styled(Box)`
	flex: 1;
	display: grid;
	grid-template-columns: 1fr auto;
	height: 36px;
`

export const PageContainer = styled(Flex)`
	align-items: center;
	gap: 8px;
`

export const ChevronContainer = styled(Flex)`
	align-items: center;
	justify-content: center;

	width: 36px;
	height: 36px;

	border-radius: 8px;

	background: ${props => props.theme.colors.dark500};

	border: 1px solid ${props => props.theme.colors.dark500};
	border-radius: 8px;
	opacity: 1;

	&:hover {
		cursor: pointer;
		opacity: 0.9;
	}
`

export const PageLabelContainer = styled.div<{
	disablePointer?: boolean
	isActive?: boolean
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	opacity: 1;

	border-radius: 100%;
	color: ${props =>
		props.isActive ? props.theme.colors.gray1000 : props.theme.colors.dark500};

	background: ${props =>
		props.isActive ? props.theme.colors.dark500 : 'transparent'};

	&:hover {
		cursor: pointer;
		opacity: 0.9;
	}

	${props =>
		props.disablePointer &&
		css`
			pointer-events: none;
			opacity: 1;
		`}
`

export const PageLabel = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
`
