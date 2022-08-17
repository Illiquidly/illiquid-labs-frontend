import * as React from 'react'
import { SVGProps } from 'react'

const SvgCircleSmallFilled20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgCircleSmallFilled20
