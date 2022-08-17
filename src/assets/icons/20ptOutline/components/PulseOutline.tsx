import * as React from 'react'
import { SVGProps } from 'react'

const SvgPulseOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm1.5 0a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Zm-6 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm1.5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgPulseOutline20
