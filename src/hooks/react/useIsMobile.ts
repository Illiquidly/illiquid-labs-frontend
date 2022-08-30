import { useTheme } from '@emotion/react'
import React from 'react'
import useWindowSize from './useWindowSize'

export default function useIsMobile() {
	const theme = useTheme()
	const size = useWindowSize()
	return React.useMemo(() => {
		const [, tabletBreakpoint] = theme.breakpoints.map(
			br => +br.replace('px', '')
		)

		return size.width <= tabletBreakpoint
	}, [size])
}
