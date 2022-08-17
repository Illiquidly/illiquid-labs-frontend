import * as React from 'react'
import { SVGProps } from 'react'

const SvgFullscreenOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M11.75 3.75A.75.75 0 0 1 12.5 3h3.75a.75.75 0 0 1 .75.75V7.5a.75.75 0 0 1-1.5 0V5.56l-3.223 3.224a.75.75 0 1 1-1.061-1.061L14.439 4.5H12.5a.75.75 0 0 1-.75-.75Zm-2.967 7.466a.75.75 0 0 1 0 1.06L5.561 15.5H7.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75V12.5a.75.75 0 0 1 1.5 0v1.94l3.223-3.224a.75.75 0 0 1 1.06 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgFullscreenOutline20
