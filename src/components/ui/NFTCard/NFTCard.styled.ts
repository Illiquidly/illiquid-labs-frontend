import styled from '@emotion/styled'

import { Text, Flex } from 'theme-ui'

export const Title = styled(Text)``

Title.defaultProps = {
	sx: {
		fontWeight: 700,
		fontSize: '20px',
		lineHeight: '28px',
		letterSpacing: '-0.02em',
	},
}

export const Subtitle = styled(Text)``

Subtitle.defaultProps = {
	sx: {
		fontWeight: 300,
		fontSize: '14px',
		lineHeight: '28px',
		color: 'natural300',
	},
}

export const ImageSection = styled(Flex)`
	align-items: center;
	justify-content: center;
`

ImageSection.defaultProps = {
	sx: {
		minWidth: '332px',
		height: '280px',
		bg: 'neutral900',
		borderRadius: '8px 8px 0px 0px',
	},
}

export const DescriptionSection = styled(Flex)``

DescriptionSection.defaultProps = {
	sx: {
		height: '80px',
		bg: 'secondary500',
		borderRadius: '0px 0px 8px 8px',
		p: '12px',
		flexDirection: 'column',
	},
}
