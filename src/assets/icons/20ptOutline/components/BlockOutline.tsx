import * as React from 'react'
import { SVGProps } from 'react'

const SvgBlockOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M10 18.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm4.391-3.048a7 7 0 0 1-9.843-9.843l9.843 9.843Zm1.06-1.06L5.61 4.547a7 7 0 0 1 9.843 9.843Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgBlockOutline20
