import * as React from 'react'

function SvgComponent(props) {
	return (
		<svg
			width={14}
			height={11}
			viewBox='0 0 14 11'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M5.793 9.667L1.5 5.5m0 0l4.293-4.166M1.5 5.5h11'
				stroke='currentColor'
				strokeWidth={2}
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default SvgComponent
