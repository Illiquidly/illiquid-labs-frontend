import * as React from 'react'
import { SVGProps } from 'react'

const SvgCheckCircleOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M13.28 8.78a.75.75 0 0 0-1.06-1.06L9 10.94 7.78 9.72a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.75-3.75Z'
			fill='#99A2AD'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M18.5 10a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgCheckCircleOutline20
