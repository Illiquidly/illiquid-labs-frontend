import * as React from 'react'
import { SVGProps } from 'react'

const SvgColorPickerOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M13.003 2.86a2.926 2.926 0 0 1 4.138 4.137l-3.542 3.541 1.181 1.182a.75.75 0 0 1-1.06 1.06l-1.182-1.18-4.15 4.15c-1.178 1.177-2.738 2-4.393 2.23a1.75 1.75 0 0 1-1.976-1.975c.232-1.654 1.052-3.214 2.229-4.39L8.4 7.46 7.22 6.282A.75.75 0 0 1 8.28 5.22L9.462 6.4l3.541-3.54ZM9.462 8.521l-4.15 4.15a6.345 6.345 0 0 0-1.781 3.384c-.058.328.114.466.413.413a6.344 6.344 0 0 0 3.383-1.78l4.15-4.15-2.015-2.017Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgColorPickerOutline20
