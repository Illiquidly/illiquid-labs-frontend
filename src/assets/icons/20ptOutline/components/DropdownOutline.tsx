import * as React from 'react'
import { SVGProps } from 'react'

const SvgDropdownOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M4.167 7.278a.75.75 0 0 1 1.055-.11L10 11.034l4.778-3.868a.75.75 0 1 1 .944 1.166l-5.25 4.25a.75.75 0 0 1-.944 0l-5.25-4.25a.75.75 0 0 1-.11-1.055Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgDropdownOutline20
