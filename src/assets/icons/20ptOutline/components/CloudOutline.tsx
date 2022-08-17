import * as React from 'react'
import { SVGProps } from 'react'

const SvgCloudOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M9 4a3.75 3.75 0 0 0-3.693 4.404.75.75 0 0 1-.452.822A3.001 3.001 0 0 0 6 15h7.25a3.75 3.75 0 0 0 .116-7.498.75.75 0 0 1-.708-.584A3.752 3.752 0 0 0 9 4ZM3.75 7.75a5.25 5.25 0 0 1 10.218-1.701A5.251 5.251 0 0 1 13.25 16.5H6a4.5 4.5 0 0 1-2.239-8.404 5.318 5.318 0 0 1-.011-.346Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgCloudOutline20
