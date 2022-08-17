import * as React from 'react'
import { SVGProps } from 'react'

const SvgAttach20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M14.95 3.801a2.722 2.722 0 0 0-3.857 0L5.56 9.35a4.49 4.49 0 0 0 0 6.338 4.458 4.458 0 0 0 6.317 0l.002-.002 2.88-2.86a.75.75 0 0 1 1.057 1.064l-2.877 2.857-.002.002a5.958 5.958 0 0 1-8.439-.002 5.99 5.99 0 0 1 0-8.457l5.534-5.548a4.222 4.222 0 0 1 5.981 0 4.244 4.244 0 0 1 0 5.991l-5.534 5.548a2.486 2.486 0 0 1-3.521 0 2.497 2.497 0 0 1 0-3.525l.002-.002 3.102-3.083a.75.75 0 0 1 1.058 1.064l-3.1 3.08-.001.002a.997.997 0 0 0 0 1.405.986.986 0 0 0 1.398 0l5.534-5.548a2.744 2.744 0 0 0 0-3.873Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgAttach20
