import * as React from 'react'
import { SVGProps } from 'react'

const SvgPacmanOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M10 3a7 7 0 1 0 4.391 12.452L9.47 10.53a.75.75 0 0 1 0-1.06l4.921-4.922A6.968 6.968 0 0 0 10 3Zm-8.5 7a8.5 8.5 0 0 1 14.51-6.01.75.75 0 0 1 0 1.06L11.06 10l4.95 4.95a.75.75 0 0 1 0 1.06A8.5 8.5 0 0 1 1.5 10Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgPacmanOutline20
