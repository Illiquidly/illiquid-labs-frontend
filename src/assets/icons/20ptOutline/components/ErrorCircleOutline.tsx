import * as React from 'react'
import { SVGProps } from 'react'

const SvgErrorCircleOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M9.25 6.25a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-1.5 0v-4.5ZM10 13a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z'
			fill='#99A2AD'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgErrorCircleOutline20
