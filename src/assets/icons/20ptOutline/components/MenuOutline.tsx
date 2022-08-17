import * as React from 'react'
import { SVGProps } from 'react'

const SvgMenuOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M1.5 4.75A.75.75 0 0 1 2.25 4h15.5a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15.5a.75.75 0 0 1 0 1.5H2.25A.75.75 0 0 1 1.5 10Zm0 5.25a.75.75 0 0 1 .75-.75h15.5a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1-.75-.75Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgMenuOutline20
