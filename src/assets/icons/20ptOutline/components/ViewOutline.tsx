import * as React from 'react'
import { SVGProps } from 'react'

const SvgViewOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-1.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
			fill='#99A2AD'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M19 10c0 3.5-5 6-9 6s-9-2.5-9-6 5-6 9-6 9 2.5 9 6Zm-1.5 0c0 .983-.72 2.084-2.278 3.03-1.517.92-3.497 1.47-5.222 1.47-1.725 0-3.705-.55-5.222-1.47C3.22 12.084 2.5 10.983 2.5 10c0-.983.72-2.084 2.278-3.03C6.295 6.05 8.275 5.5 10 5.5c1.725 0 3.705.55 5.222 1.47C16.78 7.916 17.5 9.017 17.5 10Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgViewOutline20
