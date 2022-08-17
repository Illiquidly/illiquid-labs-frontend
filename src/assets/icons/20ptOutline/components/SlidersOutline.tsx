import * as React from 'react'
import { SVGProps } from 'react'

const SvgSlidersOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M7.5 7.75a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM5.114 6a2.501 2.501 0 0 1 4.772 0h6.364a.75.75 0 0 1 0 1.5H9.886a2.501 2.501 0 0 1-4.772 0H3.75a.75.75 0 0 1 0-1.5h1.364Zm7.386 8.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm2.386-1.75a2.501 2.501 0 0 0-4.771 0H3.75a.75.75 0 0 0 0 1.5h6.364a2.501 2.501 0 0 0 4.771 0h1.365a.75.75 0 0 0 0-1.5h-1.364Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgSlidersOutline20
