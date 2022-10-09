import { useTheme } from '@emotion/react'
import React from 'react'
import { useWindowSize } from 'react-use'

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
