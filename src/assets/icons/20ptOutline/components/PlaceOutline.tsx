import * as React from 'react'
import { SVGProps } from 'react'

const SvgPlaceOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M10 1c4.148 0 7.5 3.433 7.5 7.5 0 2.85-1.843 6.171-5.435 10.095a2.8 2.8 0 0 1-4.13 0C4.343 14.672 2.5 11.35 2.5 8.5 2.5 4.433 5.852 1 10 1Zm0 1.5c-3.382 0-6 2.825-6 6 0 2.383 1.68 5.41 5.041 9.082a1.3 1.3 0 0 0 1.918 0C14.319 13.911 16 10.883 16 8.5c0-3.175-2.618-6-6-6ZM10 5a3.5 3.5 0 1 1-.001 7.001A3.5 3.5 0 0 1 10 5Zm0 1.5a2 2 0 1 0 .001 4.001A2 2 0 0 0 10 6.5Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgPlaceOutline20
