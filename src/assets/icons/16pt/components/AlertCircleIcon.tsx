import * as React from 'react'

function AlertCircleIcon(props) {
	return (
		<svg
			width={16}
			height={16}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M7.999 5.333V8m0 2.666h.006M14.665 8A6.667 6.667 0 111.332 8a6.667 6.667 0 0113.333 0z'
				stroke='#EA3943'
				strokeWidth={1.33333}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default AlertCircleIcon
