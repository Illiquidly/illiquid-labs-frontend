import * as React from 'react'
import { SVGProps } from 'react'

const SvgCircleSmallOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M10 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 1.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgCircleSmallOutline20
