import * as React from 'react'

function ModalSuccessCircleIcon(props) {
	return (
		<svg
			width={32}
			height={32}
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z'
				fill='#22C55E'
			/>
			<path
				d='M8.666 16.666l4.667 4.667 10-10'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default ModalSuccessCircleIcon
