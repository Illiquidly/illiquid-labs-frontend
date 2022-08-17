import * as React from 'react'
import { SVGProps } from 'react'

const SvgWarningTriangleOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path d='M11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' fill='#99A2AD' />
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12.376 3.363c-.158-.27-.886-1.362-2.377-1.362-1.49 0-2.209 1.077-2.375 1.362l-6.1 10.49a2.759 2.759 0 0 0-.21 2.326 2.764 2.764 0 0 0 2.6 1.822h12.173a2.764 2.764 0 0 0 2.39-4.149L12.376 3.363Zm3.71 13.14a1.264 1.264 0 0 0 1.094-1.898L11.079 4.116s-.33-.621-1.08-.621-1.078.621-1.078.621L2.82 14.605a1.262 1.262 0 0 0 1.093 1.898h12.174Z'
			fill='#99A2AD'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M10 6a.75.75 0 0 1 .75.75v4.5a.75.75 0 1 1-1.5 0v-4.5A.75.75 0 0 1 10 6Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgWarningTriangleOutline20
