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
	gap: 25px;
	margin-left: 54px;
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

export const LinkContent = styled.div`
	display: flex;
	align-items: center;
	gap: 11.5px;
	color: ${props => props.theme.colors.gray600};

	&:hover {
		color: ${props => props.theme.colors.gray700};
		cursor: pointer;
	}
`
