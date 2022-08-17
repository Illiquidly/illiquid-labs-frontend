import * as React from 'react'
import { SVGProps } from 'react'

const SvgLinkCircleOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M7 7.75c0 .414.336.75.75.75h2.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06l3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75Z'
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

export default SvgLinkCircleOutline20
