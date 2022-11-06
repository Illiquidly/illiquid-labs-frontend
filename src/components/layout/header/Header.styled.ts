import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'components/theme/theme'
import { HEADER_HEIGHT } from 'constants/components'

import { Flex } from 'theme-ui'

export const HeaderWrapper = styled(Flex)`
	background-color: ${props => props.theme.colors.dark400};
	position: fixed;
	top: 0;

	& + * {
		padding-top: ${HEADER_HEIGHT}; /* ensure that element below header has padding of a header height */
	}
`

HeaderWrapper.defaultProps = {
	sx: {
		width: '100%',
		py: ['18px'],
		minHeight: HEADER_HEIGHT,
		zIndex: theme.zIndices.header,
	},
}

export const LinksContainer = styled(Flex)`
	gap: 8px;
	margin-left: 24px;
	align-items: center;
	justify-content: flex-start;
`

LinksContainer.defaultProps = {
	sx: {
		display: ['none', 'none', 'flex'],
	},
}

export const LinkText = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 24px;
`

export const LinkContent = styled.div<{ active?: boolean }>`
	display: flex;
	align-items: center;
	gap: 11.5px;
	color: ${props => props.theme.colors.gray600};

	border-radius: 8px;
	padding: 4px 12px;

	&:hover {
		color: ${props =>
			props.active ? props.theme.colors.gray1000 : props.theme.colors.gray700};
		cursor: pointer;
	}

	${props =>
		props.active &&
		css`
			color: ${props.theme.colors.gray1000};
			background: ${props.theme.colors.dark300};
		`}
`

export const HeaderDropdownContainer = styled(Flex)`
	position: fixed;
	top: ${HEADER_HEIGHT};
	left: 0;
	right: 0;
	bottom: 0;
`

export const HeaderDropdownBackdrop = styled(Flex)`
	width: 43px;
	background-color: rgba(0, 0, 0, 0.7);
`

export const HeaderDropdown = styled(Flex)`
	flex: 1;
	flex-direction: column;
	padding: 12px 16px;
	background: ${props => props.theme.colors.dark400};
`

export const HeaderDropdownItem = styled(Flex)`
	align-items: center;
	height: 55px;
	border-radius: 8px;

	background: ${props => props.theme.colors.dark400};
	&:hover {
		background: ${props => props.theme.colors.dark200};
	}
`
