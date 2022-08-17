import * as React from 'react'
import { SVGProps } from 'react'

const SvgClockOutline24 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={24}
		height={24}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M12.4 8a.9.9 0 0 0-1.8 0v4.5a.9.9 0 0 0 .584.843l4 1.5a.9.9 0 0 0 .632-1.686l-3.416-1.28V8Z'
			fill='#2688EB'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12 2.1c-5.468 0-9.9 4.432-9.9 9.9s4.432 9.9 9.9 9.9 9.9-4.432 9.9-9.9-4.432-9.9-9.9-9.9ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z'
			fill='#2688EB'
		/>
	</svg>
)

export default SvgClockOutline24
