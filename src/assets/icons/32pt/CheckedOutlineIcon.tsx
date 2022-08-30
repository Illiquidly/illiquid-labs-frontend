import * as React from 'react'

function CheckedOutlineIcon(props) {
	return (
		<svg
			width={33}
			height={32}
			viewBox='0 0 33 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<rect x={0.5} width={32} height={32} rx={16} fill='#16A34A' />
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M24.675 10.265a1.219 1.219 0 010 1.724l-9.75 9.749a1.219 1.219 0 01-1.723 0l-4.874-4.875a1.219 1.219 0 111.723-1.723l4.013 4.013 8.887-8.888a1.219 1.219 0 011.724 0z'
				fill='#fff'
			/>
		</svg>
	)
}

export default CheckedOutlineIcon
