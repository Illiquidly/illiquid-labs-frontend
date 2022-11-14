import * as React from 'react'

function CheckCircleIcon(props) {
	return (
		<svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M12 23.2c6.186 0 11.2-5.014 11.2-11.2C23.2 5.814 18.186.8 12 .8 5.814.8.8 5.814.8 12c0 6.186 5.014 11.2 11.2 11.2zm5.19-13.01a1.4 1.4 0 00-1.98-1.98l-4.61 4.61-1.81-1.81a1.4 1.4 0 00-1.98 1.98l2.8 2.8a1.4 1.4 0 001.98 0l5.6-5.6z'
				fill='#22C55E'
			/>
		</svg>
	)
}

export default CheckCircleIcon
