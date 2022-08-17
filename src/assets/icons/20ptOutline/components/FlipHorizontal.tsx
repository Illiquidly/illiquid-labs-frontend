import * as React from 'react'
import { SVGProps } from 'react'

const SvgFlipHorizontal20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M8.465 7.531A.75.75 0 0 1 9 8.25v8a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.627-1.162l5.25-8a.75.75 0 0 1 .842-.307ZM4.389 15.5H7.5v-4.74L4.39 15.5ZM6.53 1.47a.75.75 0 0 1 0 1.06l-.72.72h8.38l-.72-.72a.75.75 0 0 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 1 1-1.06-1.06l.72-.72H5.81l.72.72a.75.75 0 0 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 0ZM11.535 7.531a.75.75 0 0 1 .842.308l5.25 8A.75.75 0 0 1 17 17h-5.25a.75.75 0 0 1-.75-.75v-8a.75.75 0 0 1 .535-.719Zm.965 3.229v4.74h3.11l-3.11-4.74Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgFlipHorizontal20
