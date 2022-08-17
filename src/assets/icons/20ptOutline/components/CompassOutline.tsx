import * as React from 'react'
import { SVGProps } from 'react'

const SvgCompassOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M13.68 7.332a.8.8 0 0 0-1.012-1.012L8.287 7.78a.8.8 0 0 0-.506.507l-1.46 4.38a.8.8 0 0 0 1.011 1.013l4.381-1.46a.8.8 0 0 0 .506-.507l1.46-4.381Zm-4.587 1.76 2.721-.906-.907 2.721-2.721.907.907-2.721Z'
			fill='#99A2AD'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3 10a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgCompassOutline20
