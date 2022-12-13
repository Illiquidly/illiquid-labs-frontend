import { useTheme } from '@emotion/react'
import React from 'react'
import { useWindowSize } from 'react-use'

// TODO: useIsMobile, useIsTablet have to be abstracted into generic function that returns {isTablet: boolean, isMobile: boolean}
export default function useIsTablet() {
	const theme = useTheme()
	const size = useWindowSize()
	return React.useMemo(() => {
		const [, tabletBreakpoint] = theme.breakpoints.map(
			br => +br.replace('px', '')
		)

		return size.width <= tabletBreakpoint
	}, [size, theme.breakpoints])
}
