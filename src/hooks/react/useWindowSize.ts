import React from 'react'

export interface Size {
	width: number
	height: number
}

export default function useWindowSize() {
	const [windowSize, setWindowSize] = React.useState<Size>({
		width: 0,
		height: 0,
	})

	React.useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowSize
}
