import * as React from 'react'

function CheckboxDisabledIcon(props) {
	return (
		<svg
			width={12}
			height={2}
			viewBox='0 0 12 2'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M1.914 1h8.167'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default CheckboxDisabledIcon
