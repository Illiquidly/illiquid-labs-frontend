import * as React from 'react'
import { SVGProps } from 'react'

const SvgHelpOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M10 6.25a1.25 1.25 0 0 0-1.21.937.75.75 0 0 1-1.453-.374 2.75 2.75 0 0 1 5.413.687c0 1.211-.654 1.84-1.145 2.298l-.008.008c-.478.446-.772.72-.854 1.3a.75.75 0 0 1-1.485-.212c.158-1.11.803-1.709 1.256-2.13l.068-.062c.447-.417.668-.663.668-1.202 0-.69-.56-1.25-1.25-1.25ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
			fill='#99A2AD'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgHelpOutline20
