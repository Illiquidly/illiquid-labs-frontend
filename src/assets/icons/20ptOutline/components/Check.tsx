import * as React from 'react'
import { SVGProps } from 'react'

const SvgCheck20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M17.03 4.97a.75.75 0 0 1 0 1.06l-9 9a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.97 2.97 8.47-8.47a.75.75 0 0 1 1.06 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgCheck20
