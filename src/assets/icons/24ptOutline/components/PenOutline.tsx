import * as React from 'react'
import { SVGProps } from 'react'

const SvgPenOutline24 = (props: SVGProps<SVGSVGElement>) => (
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
			d='m14.26 7.478-9.038 9.037a1.1 1.1 0 0 0-.322.778V19a.1.1 0 0 0 .1.1h1.707a1.1 1.1 0 0 0 .778-.322l9.037-9.037-2.263-2.263Zm1.272-1.273 2.263 2.263 1.131-1.131a.6.6 0 0 0 0-.849l-1.414-1.414a.6.6 0 0 0-.849 0l-1.131 1.131ZM3.949 15.242 15.391 3.801a2.4 2.4 0 0 1 3.394 0l1.414 1.414a2.4 2.4 0 0 1 0 3.394L8.758 20.051a2.9 2.9 0 0 1-2.05.849H5A1.9 1.9 0 0 1 3.1 19v-1.707a2.9 2.9 0 0 1 .85-2.05Z'
			fill='#2688EB'
		/>
	</svg>
)

export default SvgPenOutline24
