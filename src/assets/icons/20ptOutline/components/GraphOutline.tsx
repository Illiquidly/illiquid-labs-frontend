import * as React from 'react'
import { SVGProps } from 'react'

const SvgGraphOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M2.75 18a.75.75 0 0 0 .75-.75v-12a.75.75 0 0 0-1.5 0v12c0 .414.336.75.75.75ZM6.25 18a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-1.5 0v9c0 .414.336.75.75.75ZM10 18a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-1.5 0v3c0 .414.336.75.75.75ZM13.75 18a.75.75 0 0 1-.75-.75V3.748a.75.75 0 0 1 1.5 0V17.25a.75.75 0 0 1-.75.75ZM17.25 18a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-.75.75Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgGraphOutline20
