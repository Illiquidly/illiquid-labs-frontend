import styled from '@emotion/styled'
import { Box } from 'theme-ui'

export const OnlyOnMobile = styled(Box)``

OnlyOnMobile.defaultProps = {
	sx: {
		display: ['block', 'none'],
	},
}

export const OnlyOnTablet = styled(Box)``

OnlyOnTablet.defaultProps = {
	sx: {
		display: ['none', 'block', 'none'],
	},
}

export const OnlyMobileAndTablet = styled(Box)``

OnlyMobileAndTablet.defaultProps = {
	sx: {
		display: ['block', 'block', 'none'],
	},
}

export const OnlyOnDesktop = styled(Box)``

OnlyOnDesktop.defaultProps = {
	sx: {
		display: ['none', 'none', 'block'],
	},
}
