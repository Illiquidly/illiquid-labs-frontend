import * as React from 'react'
import { SVGProps } from 'react'

const SvgSortOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M13.75 4a.75.75 0 0 1 .53.22l2.5 2.5a.75.75 0 0 1-1.06 1.06L14.5 6.56v8.69a.75.75 0 0 1-1.5 0V6.56l-1.22 1.22a.75.75 0 1 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 .53-.22Zm-7.5 0a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 0 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V4.75A.75.75 0 0 1 6.25 4Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgSortOutline20
