import * as React from 'react'
import { SVGProps } from 'react'

const SvgRemoveCircleOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<circle cx={10} cy={10} r={7.75} stroke='#99A2AD' strokeWidth={1.5} />
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M6 10a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 10Z'
			fill='#99A2AD'
		/>
		<path
			d='M6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z'
			fill='#99A2AD'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M10 18.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm7-8.5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgRemoveCircleOutline20
