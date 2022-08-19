import * as React from 'react'

function CloseIcon(props) {
	return (
		<svg
			width={12}
			height={12}
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M1 11L11 1M11 11L1 1'
				stroke='#fff'
				strokeWidth={2}
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default CloseIcon
