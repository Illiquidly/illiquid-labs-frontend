import * as React from 'react'
import { SVGProps } from 'react'

const SvgWriteOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M13.076 2.649A2.215 2.215 0 0 1 14.645 2c.566 0 1.135.216 1.568.649l1.137 1.136a2.21 2.21 0 0 1 0 3.133l-.941.94-9.17 9.178a3.296 3.296 0 0 1-2.33.964H3a1 1 0 0 1-1-1v-1.893a3.288 3.288 0 0 1 .965-2.34l8.123-8.132 1.988-1.986Zm2.286 4.135.927-.926c.14-.14.21-.322.21-.507a.712.712 0 0 0-.21-.506l-1.137-1.136a.713.713 0 0 0-.507-.21.713.713 0 0 0-.507.21l-.927.926 2.15 2.149ZM12.135 5.71l-8.109 8.118a1.79 1.79 0 0 0-.525 1.266V16.2a.3.3 0 0 0 .3.3H4.91c.475 0 .931-.189 1.267-.525l8.11-8.118-2.152-2.148Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgWriteOutline20
