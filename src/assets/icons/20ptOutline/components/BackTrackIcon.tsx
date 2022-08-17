import * as React from 'react'
import { SVGProps } from 'react'

const SvgBackTrackIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={12}
		height={11}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='m7.985 3.373 2.629.258c.915.09 1.195 1.004.489 1.604l-2.058 1.75.764 2.851c.25.936-.528 1.503-1.307.94l-2.5-1.807L3.5 10.776c-.777.56-1.558-.003-1.308-.94l.764-2.85L.9 5.235C.19 4.631.47 3.72 1.388 3.63l2.628-.258L5.174.64c.363-.855 1.292-.855 1.654 0l1.157 2.732Z'
			fill='#fff'
		/>
	</svg>
)

export default SvgBackTrackIcon
