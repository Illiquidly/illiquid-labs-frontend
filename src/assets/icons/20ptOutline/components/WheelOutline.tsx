import * as React from 'react'
import { SVGProps } from 'react'

const SvgWheelOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M17.704 6.408a8.5 8.5 0 1 1-15.408 7.184 8.5 8.5 0 0 1 15.408-7.184Zm-5.442 10.217-2.625-5.628L4.01 13.62a7.003 7.003 0 0 0 8.253 3.004Zm-8.887-4.363 5.628-2.625L6.38 4.01a7.003 7.003 0 0 0-3.004 8.253Zm13.25-4.524a7.003 7.003 0 0 1-3.004 8.253l-2.624-5.628 5.628-2.625Zm-.634-1.36-5.628 2.625-2.625-5.628a7.003 7.003 0 0 1 8.253 3.004Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgWheelOutline20
