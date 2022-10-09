import { useTheme } from '@emotion/react'
import React from 'react'
import { useWindowSize } from 'react-use'

export default function useIsMobile() {
	const theme = useTheme()
	const size = useWindowSize()
	return React.useMemo(() => {
		const [mobileBreakpoint] = theme.breakpoints.map(br => +br.replace('px', ''))

		return size.width <= mobileBreakpoint
	}, [size, theme.breakpoints])
}
