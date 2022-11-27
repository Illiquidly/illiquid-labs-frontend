import * as React from 'react'
import { SVGProps } from 'react'

const SvgChevronUpSmall24 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={24}
		height={24}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M17.736 14.736a.9.9 0 0 1-1.272 0L12 10.273l-4.464 4.463a.9.9 0 1 1-1.272-1.272l5.1-5.1a.9.9 0 0 1 1.272 0l5.1 5.1a.9.9 0 0 1 0 1.272Z'
			fill='currentColor'
		/>
	</svg>
)

export default SvgChevronUpSmall24
